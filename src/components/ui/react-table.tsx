"use client"

import * as React from "react"

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

import { cn } from "~/lib/utils"

// Config
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue>
    extends Record<string, unknown> {
    columnName: string
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
        ? "3px 0 3px -3px hsl(var(--table-border)) inset"
        : "-3px 0 3px -3px hsl(var(--table-border)) inset"
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
        ref={ref}
        className={cn(
          "w-full border-collapse bg-table text-sm text-table-foreground",
          className,
        )}
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
      ref={ref}
      className={cn(
        "sticky top-0 z-10 border-b bg-table shadow-[0px_-3px_3px_-3px_hsl(var(--table-border))_inset]",
        className,
      )}
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
  <tr ref={ref} {...props}>
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
>(({ header, style, className, ...props }, ref) => {
  if (!header) {
    return null
  }
  return (
    <th
      ref={ref}
      colSpan={header.column.getIsPinned() ? 0 : header.colSpan}
      data-pinned={!!header.column.getIsPinned()}
      style={handleCellStyling(header.column, style)}
      className={cn(
        "border-r border-table-border px-2 py-1.5 text-left hover:!bg-table-accent hover:text-table-accent-foreground data-[pinned=true]:bg-table",
        className,
      )}
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
>(({ children, className, ...props }, ref) => {
  const table = useReactTableContext()
  return (
    <tbody
      ref={ref}
      className={cn("border-b border-table-border", className)}
      {...props}>
      {table.getRowModel().rows.map(row => (
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

interface TableRowProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  row?: Row<T>
  children?: ChildrenRenderer<React.ReactElement, Cell<T, unknown>>
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps<RowData>>(
  ({ row, children, className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        data-selected={row?.getIsSelected()}
        data-even={
          typeof row?.index === "number" ? row?.index % 2 !== 0 : undefined
        }
        className={cn(
          "group/tableRow hover:bg-table-accent hover:text-table-accent-foreground data-[even=true]:bg-table-secondary data-[selected=true]:bg-table-primary data-[even=true]:text-table-secondary-foreground data-[selected=true]:text-table-primary-foreground",
          className,
        )}
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
>(({ cell, style, className, ...props }, ref) => {
  if (!cell) {
    return null
  }
  return (
    <td
      ref={ref}
      data-pinned={!!cell.column.getIsPinned()}
      style={handleCellStyling(cell.column, style)}
      className={cn(
        "border-r border-table-border px-2 py-1 group-hover/tableRow:border-table-secondary group-hover/tableRow:!bg-table-accent data-[pinned=true]:bg-table group-data-[even=true]/tableRow:bg-table-secondary group-data-[selected=true]/tableRow:!bg-table-primary group-data-[selected=true]/tableRow:!text-table-primary-foreground",
        className,
      )}
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
    <td ref={ref} colSpan={table.getAllLeafColumns().length} {...props}>
      {rendererChildren(children, table)}
    </td>
  )
})
TableCellColSpanAll.displayName = "TableCellColSpanAll"

interface TableExpandedRowProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  row?: Row<T>
  children?: ChildrenRenderer<React.ReactElement, Row<T>>
}

const TableRowExpanded = React.forwardRef<
  HTMLTableRowElement,
  TableExpandedRowProps<RowData>
>(({ row, children, ...props }, ref) => {
  if (row?.getIsExpanded()) {
    return (
      <tr ref={ref} {...props}>
        <td colSpan={row?.getVisibleCells().length}>
          {rendererChildren(children, row)}
        </td>
      </tr>
    )
  }
  return null
})
TableRowExpanded.displayName = "TableRowExpanded"

function TableRowsEmpty({
  children,
  ...props
}: React.ComponentProps<typeof TableCellColSpanAll>) {
  const table = useReactTableContext()
  return (
    table.getRowModel().rows.length === 0 && (
      <TableRow>
        <TableCellColSpanAll {...props}>
          {rendererChildren(children, table)}
        </TableCellColSpanAll>
      </TableRow>
    )
  )
}

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  ReactTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableCellColSpanAll,
  TableHead,
  TableHeader,
  TableHeadGroup,
  TableRow,
  TableRowExpanded,
  TableRowsEmpty,
}
