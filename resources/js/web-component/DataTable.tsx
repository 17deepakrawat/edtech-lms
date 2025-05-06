import {
  flexRender,
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'react-feather'; // Optional icons
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="space-y-4">
      <div className="container mx-auto p-4">
        {/* Search Filter */}
        <div className="flex justify-between items-center mb-4">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        <div className="overflow-hidden rounded-lg shadow-lg bg-white">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className="text-sm bg-gray-100 border-b border-gray-200">
                  {headerGroup.headers.map(header => (
                    <TableHead key={header.id} className="px-4 py-2 text-left text-gray-700">
                      <div className="flex items-center cursor-pointer">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <button
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            table.toggleSorting(header.id);
                          }}
                        >
                          <ArrowUpDown size={16} />
                        </button>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} className="hover:bg-gray-50 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant="outline"
              size="sm"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant="outline"
              size="sm"
            >
              <ChevronRight size={16} />
              Next
            </Button>
          </div>

          <div className="text-sm text-gray-600">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className="border rounded p-2"
            >
              {[10, 20, 30, 50].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
