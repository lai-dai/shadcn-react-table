"use client"

import * as React from "react"

import {
  flexRender,
  getCoreRowModel,
  type Cell,
  type Column,
  type ColumnDef,
  type Header,
  type HeaderGroup,
  type Row,
  type RowData,
  type Table as ITable,
  type TableOptions,
  useReactTable,
} from "@tanstack/react-table"

import { cn } from "~/lib/utils"

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue>
    extends Record<string, unknown> {
    columnName: string
  }
}

const ReactTableContext = React.createContext<ITable<RowData> | undefined>(
  undefined,
)

function useReactTableContext<T extends RowData>() {
  const context = React.useContext(ReactTableContext)
  if (!context) {
    throw new Error("useReactTableContext must be used within a ReactTable")
  }
  return context as ITable<T>
}

export interface ReactTableProps<T extends RowData> {
  data: T[]
  columns: ColumnDef<T, unknown>[]
  options?: Omit<TableOptions<T>, "data" | "columns" | "getCoreRowModel">
  children?: React.ReactNode | ((table: ITable<T>) => React.ReactNode)
}

function ReactTable<T>({
  options,
  data,
  columns,
  children,
}: ReactTableProps<T>) {
  const table = useReactTable({
    ...options,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <ReactTableContext.Provider value={table as ITable<RowData>}>
      {children instanceof Function ? children(table) : children}
    </ReactTableContext.Provider>
  )
}

interface TableProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableElement>, "children"> {
  children?: React.ReactNode | ((table: ITable<T>) => React.ReactNode)
}

const Table = React.forwardRef<HTMLTableElement, TableProps<RowData>>(
  ({ className, style, children, ...props }, ref) => {
    const table = useReactTableContext()
    return (
      <table
        ref={ref}
        style={{
          minWidth: table.getTotalSize(),
          ...style,
        }}
        className={cn("w-full border-collapse", className)}
        {...props}>
        {children instanceof Function ? children(table) : children}
      </table>
    )
  },
)

Table.displayName = "Table"

interface TableHeaderProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableSectionElement>, "children"> {
  children?:
    | React.ReactElement
    | ((headerGroup: HeaderGroup<T>) => React.ReactElement)
}

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps<RowData>
>(({ children, ...props }, ref) => {
  const table = useReactTableContext()
  return (
    <thead ref={ref} {...props}>
      {children instanceof Function
        ? table
            .getHeaderGroups()
            .map(headerGroup => (
              <React.Fragment key={headerGroup.id}>
                {children(headerGroup)}
              </React.Fragment>
            ))
        : children}
    </thead>
  )
})

TableHeader.displayName = "TableHeader"

interface TableHeaderRowsTrackProps<T extends RowData> {
  children?: (headerGroup: HeaderGroup<T>) => React.ReactElement
}

function TableHeaderRowsTrack({
  children,
}: TableHeaderRowsTrackProps<RowData>) {
  const table = useReactTableContext()
  if (children instanceof Function) {
    return table
      .getHeaderGroups()
      .map(headerGroup => (
        <React.Fragment key={headerGroup.id}>
          {children(headerGroup)}
        </React.Fragment>
      ))
  }
  return null
}

interface TableHeaderRow<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  headerGroup?: HeaderGroup<T>
  children?:
    | React.ReactElement
    | ((header: Header<T, unknown>) => React.ReactElement)
}

const TableHeaderRow = React.forwardRef<
  HTMLTableRowElement,
  TableHeaderRow<RowData>
>(({ headerGroup, children, ...props }, ref) => (
  <tr ref={ref} {...props}>
    {children instanceof Function
      ? headerGroup?.headers.map(header => (
          <React.Fragment key={header.id}>{children(header)}</React.Fragment>
        ))
      : children}
  </tr>
))

TableHeaderRow.displayName = "TableHeaderRow"

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
      ref={ref}
      colSpan={header.column.getIsPinned() ? 0 : header.colSpan}
      data-pinned={header.column.getIsPinned()}
      style={getCellDefaultStyles(header.column, style)}
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
  children?: React.ReactNode | ((row: Row<T>) => React.ReactElement)
}

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps<RowData>
>(({ children, ...props }, ref) => {
  const table = useReactTableContext()
  return (
    <tbody ref={ref} {...props}>
      {children instanceof Function
        ? table
            .getRowModel()
            .rows.map(row => (
              <React.Fragment key={row.id}>{children(row)}</React.Fragment>
            ))
        : children}
    </tbody>
  )
})

TableBody.displayName = "TableBody"

interface TableRowsTrackProps<T extends RowData> {
  children?: (row: Row<T>) => React.ReactElement
}

function TableRowsTrack({ children }: TableRowsTrackProps<RowData>) {
  const table = useReactTableContext()
  if (children instanceof Function) {
    return table
      .getRowModel()
      .rows.map(row => (
        <React.Fragment key={row.id}>{children(row)}</React.Fragment>
      ))
  }
  return null
}

interface TableRowProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  row?: Row<T>
  children?:
    | React.ReactElement
    | ((cell: Cell<T, unknown>) => React.ReactElement)
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps<RowData>>(
  ({ row, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        data-selected={row?.getIsSelected()}
        data-even={
          typeof row?.index === "number" ? row?.index % 2 !== 0 : false
        }
        {...props}>
        {children instanceof Function
          ? row
              ?.getVisibleCells()
              .map(cell => (
                <React.Fragment key={cell.id}>{children(cell)}</React.Fragment>
              ))
          : children}
      </tr>
    )
  },
)

TableRow.displayName = "TableRow"

interface TableExpandedRowProps<T extends RowData>
  extends Omit<React.HTMLAttributes<HTMLTableRowElement>, "children"> {
  row?: Row<T>
  children?: React.ReactElement | ((row: Row<T>) => React.ReactElement)
}

const TableExpandedRow = React.forwardRef<
  HTMLTableRowElement,
  TableExpandedRowProps<RowData>
>(({ row, children, ...props }, ref) => {
  if (row?.getIsExpanded()) {
    return (
      <tr ref={ref} {...props}>
        <td colSpan={row?.getVisibleCells().length}>
          {children instanceof Function ? row && children(row) : children}
        </td>
      </tr>
    )
  }
  return null
})

TableExpandedRow.displayName = "TableExpandedRow"

interface TableCellsTrackProps<T extends RowData> {
  row?: Row<T>
  children?: (row: Cell<T, unknown>) => React.ReactElement
}

function TableCellsTrack({ children, row }: TableCellsTrackProps<RowData>) {
  if (children instanceof Function) {
    return row?.getVisibleCells().map(cell => {
      return <React.Fragment key={cell.id}>{children(cell)}</React.Fragment>
    })
  }
  return null
}

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
      ref={ref}
      style={getCellDefaultStyles(cell.column, style)}
      data-pinned={cell.column.getIsPinned()}
      {...props}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
})

TableCell.displayName = "TableCell"

interface TableCellFullProps<T extends RowData>
  extends Omit<React.TdHTMLAttributes<HTMLTableCellElement>, "children"> {
  children?: React.ReactNode | ((table: ITable<T>) => React.ReactNode)
}

const TableCellFullColSpan = React.forwardRef<
  HTMLTableCellElement,
  TableCellFullProps<RowData>
>(({ children, ...props }, ref) => {
  const table = useReactTableContext()
  return (
    <td ref={ref} colSpan={table.getAllLeafColumns().length} {...props}>
      {children instanceof Function ? children(table) : children}
    </td>
  )
})

TableCellFullColSpan.displayName = "TableCellFull"

function TableRowsEmpty({
  children,
  ...props
}: React.ComponentProps<typeof TableCellFullColSpan>) {
  const table = useReactTableContext()
  return (
    table.getRowModel().rows.length === 0 && (
      <TableRow>
        <TableCellFullColSpan {...props}>
          {children instanceof Function ? children(table) : children}
        </TableCellFullColSpan>
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
    className={cn("mt-3 text-sm text-muted-foreground", className)}
    {...props}
  />
))

TableCaption.displayName = "TableCaption"

function getCellDefaultStyles<T extends RowData>(
  column: Column<T>,
  style?: React.CSSProperties,
) {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left")
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right")
  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-3px 0 3px -3px hsl(var(--border)) inset"
      : isFirstRightPinnedColumn
        ? "3px 0 3px -3px hsl(var(--border)) inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : undefined,
    zIndex: isPinned ? 1 : undefined,
    width: column.getSize() || undefined,
    minWidth: column.columnDef.minSize ?? undefined,
    maxWidth: column.columnDef.maxSize ?? undefined,
    ...style,
  } as React.CSSProperties
}

export {
  ReactTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableCellFullColSpan,
  TableCellsTrack,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableHeaderRowsTrack,
  TableRow,
  TableRowsEmpty,
  TableRowsTrack,
  useReactTableContext,
}
