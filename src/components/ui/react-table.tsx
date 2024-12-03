"use client"

import {
  flexRender,
  getCoreRowModel,
  type Cell,
  type Column,
  type Header,
  type HeaderGroup,
  type Row,
  type RowData,
  type Table as ITable,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { cn } from "~/lib/utils"

// Config
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue>
    extends Record<string, unknown> {
    columnName?: string
  }
}

// utils
type ChildrenRenderer<C, P> = C | ((props: P) => C)

function rendererChildren<C extends React.ReactNode, P>(
  children: ChildrenRenderer<C, P>,
  props: P,
) {
  if (children instanceof Function) {
    return children(props)
  }
  return children
}

function isReactFragment<E extends React.ReactElement>(element: E) {
  if (element.type) {
    return element.type === React.Fragment
  }
  return element instanceof React.Fragment
}

function clonerElement<E extends React.ReactElement, P>(element: E, props: P) {
  if (React.isValidElement(element) && !isReactFragment(element)) {
    return React.cloneElement(element, props as React.Attributes)
  }
  return element
}

function handleCellStyling<T extends RowData>(
  column: Column<T>,
  style?: React.CSSProperties,
) {
  const isPinned = column.getIsPinned()

  return {
    boxShadow: isPinned
      ? isPinned === "right"
        ? "3px 0 3px -3px hsl(var(--border)) inset"
        : "-3px 0 3px -3px hsl(var(--border)) inset"
      : undefined,
    maxWidth:
      column.columnDef.maxSize === Number.MAX_SAFE_INTEGER
        ? undefined
        : column.columnDef.maxSize,
    minWidth: column.columnDef.minSize ?? undefined,
    position: isPinned ? "sticky" : undefined,
    right: isPinned === "right" ? column.getAfter("right") : undefined,
    left: isPinned === "left" ? column.getStart("left") : undefined,
    zIndex: isPinned ? 1 : undefined,
    ...style,
  } as React.CSSProperties
}

// React Table
type ReactTableContextProps = ITable<RowData>

const ReactTableContext = React.createContext<ReactTableContextProps | null>(
  null,
)

export function useReactTableContext<T extends RowData>() {
  const context = React.useContext(ReactTableContext)
  if (!context) {
    throw new Error("useReactTableContext must be used within a ReactTable")
  }
  return context as ITable<T>
}

export interface ReactTableProps<T extends RowData>
  extends Omit<TableOptions<T>, "getCoreRowModel"> {
  children?: ChildrenRenderer<React.ReactNode, ITable<T>>
}

function ReactTable<T>({ children, ...props }: ReactTableProps<T>) {
  const table = useReactTable({
    ...props,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <ReactTableContext.Provider value={table as ITable<RowData>}>
      {rendererChildren(children, table)}
    </ReactTableContext.Provider>
  )
}

interface TableProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableElement>, "children"> {
  children?: ChildrenRenderer<React.ReactNode, ITable<T>>
}

const Table = React.forwardRef<HTMLTableElement, TableProps<RowData>>(
  ({ className, children, ...props }, ref) => {
    const table = useReactTableContext()
    return (
      <table
        className={cn("w-full border-collapse text-sm", className)}
        ref={ref}
        {...props}>
        {rendererChildren(children, table)}
      </table>
    )
  },
)
Table.displayName = "Table"

interface TableHeaderProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, "children"> {
  children?: ChildrenRenderer<React.ReactElement, HeaderGroup<T>>
}

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps<RowData>
>(({ children, className, ...props }, ref) => {
  const table = useReactTableContext()
  return (
    <thead
      className={cn("text-left", className)}
      ref={ref}
      {...props}>
      {table.getHeaderGroups().map(headerGroup => (
        <React.Fragment key={headerGroup.id}>
          {clonerElement(rendererChildren(children, headerGroup)!, {
            headerGroup,
          })}
        </React.Fragment>
      ))}
    </thead>
  )
})
TableHeader.displayName = "TableHeader"

interface TableHeaderRow<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  headerGroup?: HeaderGroup<T>
  children?: ChildrenRenderer<React.ReactElement, Header<T, unknown>>
}

const TableHeadGroup = React.forwardRef<
  HTMLTableRowElement,
  TableHeaderRow<RowData>
>(({ headerGroup, children, ...props }, ref) => (
  <tr
    ref={ref}
    {...props}>
    {headerGroup?.headers.map(header => (
      <React.Fragment key={header.id}>
        {clonerElement(rendererChildren(children, header)!, {
          header,
        })}
      </React.Fragment>
    ))}
  </tr>
))
TableHeadGroup.displayName = "TableHeadGroup"

interface TableHeadProps<T extends RowData>
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  header?: Header<T, unknown>
}

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  TableHeadProps<RowData>
>(({ header, style, ...props }, ref) => {
  if (!header) {
    return null
  }
  return (
    <th
      colSpan={header.column.getIsPinned() ? 0 : header.colSpan}
      data-pinned={!!header.column.getIsPinned()}
      ref={ref}
      style={handleCellStyling(header.column, style)}
      {...props}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  )
})
TableHead.displayName = "TableHead"

interface TableBodyProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, "children"> {
  children?: ChildrenRenderer<React.ReactElement, Row<T>>
}

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps<RowData>
>(({ children, ...props }, ref) => {
  const table = useReactTableContext()
  const rows = table.getRowModel().rows

  if (!rows.length) {
    return null
  }
  return (
    <tbody
      ref={ref}
      {...props}>
      {rows.map(row => (
        <React.Fragment key={row.id}>
          {clonerElement(rendererChildren(children, row)!, {
            row,
          })}
        </React.Fragment>
      ))}
    </tbody>
  )
})
TableBody.displayName = "TableBody"

function TableBodyEmpty({
  children,
  ...props
}: React.ComponentProps<typeof TableCellColSpanAll>) {
  const table = useReactTableContext()
  const rows = table.getRowModel().rows
  if (!rows.length) {
    return (
      <tbody>
        <tr>
          <TableCellColSpanAll {...props}>
            {rendererChildren(children, table)}
          </TableCellColSpanAll>
        </tr>
      </tbody>
    )
  }
  return null
}

interface TableRowProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  row?: Row<T>
  children?: ChildrenRenderer<React.ReactElement, Cell<T, unknown>>
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps<RowData>>(
  ({ row, children, ...props }, ref) => {
    return (
      <tr
        data-even={
          typeof row?.index === "number" ? row?.index % 2 !== 0 : undefined
        }
        data-selected={row?.getIsSelected()}
        ref={ref}
        {...props}>
        {row?.getVisibleCells().map(cell => (
          <React.Fragment key={cell.id}>
            {clonerElement(rendererChildren(children, cell)!, {
              cell,
            })}
          </React.Fragment>
        ))}
      </tr>
    )
  },
)
TableRow.displayName = "TableRow"

interface TableCellProps<T extends RowData>
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  cell?: Cell<T, unknown>
}

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  TableCellProps<RowData>
>(({ cell, style, ...props }, ref) => {
  if (!cell) {
    return null
  }
  return (
    <td
      data-pinned={!!cell.column.getIsPinned()}
      ref={ref}
      style={handleCellStyling(cell.column, style)}
      {...props}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
})
TableCell.displayName = "TableCell"

interface TableCellFullProps<T extends RowData>
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  children?: ChildrenRenderer<React.ReactNode, ITable<T>>
}

const TableCellColSpanAll = React.forwardRef<
  HTMLTableCellElement,
  TableCellFullProps<RowData>
>(({ children, ...props }, ref) => {
  const table = useReactTableContext()
  return (
    <td
      colSpan={table.getAllLeafColumns().length}
      ref={ref}
      {...props}>
      {rendererChildren(children, table)}
    </td>
  )
})
TableCellColSpanAll.displayName = "TableCellColSpanAll"

interface TableExpandedRowProps<T extends RowData>
  extends Omit<React.ComponentProps<typeof TableCellColSpanAll>, "children"> {
  row?: Row<T>
  children?: ChildrenRenderer<React.ReactElement, Row<T>>
}

function TableRowExpanded({
  row,
  children,
  ...props
}: TableExpandedRowProps<RowData>) {
  if (row?.getIsExpanded()) {
    return (
      <tr>
        <TableCellColSpanAll {...props}>
          {rendererChildren(children, row)}
        </TableCellColSpanAll>
      </tr>
    )
  }
  return null
}

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}/>
))
TableCaption.displayName = "TableCaption"

export {
  ReactTable,
  Table,
  TableBody,
  TableBodyEmpty,
  TableCaption,
  TableCell,
  TableCellColSpanAll,
  TableHead,
  TableHeader,
  TableHeadGroup,
  TableRow,
  TableRowExpanded,
}
