import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CheckCircle, Edit, Plus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Banner {
  id: number;
  title: string;
  description: string;
  bannerimage: string;
  status: boolean;
}

interface Props extends PageProps {
  banners: Banner[];
}

export default function BannerIndex({ banners }: Props) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<Banner[]>(banners);

  const handleStatusToggle = (id: number, currentStatus: boolean) => {
    router.get(
      `/banner/${id}/toggle-status`,
      {},
      {
        preserveState: true,
        onSuccess: () => {
          setData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: !currentStatus } : item))
          );
          toast.success('Banner status updated');
        },
        onError: () => {
          toast.error('Failed to update status.');
        },
      }
    );
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/banner/${id}`);
        Swal.fire('Deleted!', 'The banner has been deleted.', 'success');
      }
    });
  };

  const columns: ColumnDef<Banner>[] = [
    {
      header: 'S.No',
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div
          className="line-clamp-3 max-w-xs text-sm"
          dangerouslySetInnerHTML={{ __html: row.original.description }}
        />
      ),
    },
    {
      header: 'Image',
      cell: ({ row }) => (
        <img
          src={`/storage/${row.original.bannerimage}`}
          alt="Banner"
          style={{ width: '80px', height: '40px' }}
        />
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Button
          variant="outline"
          className={`${
            row.original.status ? 'bg-green-800 hover:bg-green-800' : 'bg-red-600 hover:bg-red-600'
          } text-white hover:text-white`}
          onClick={() => handleStatusToggle(row.original.id, row.original.status)}
        >
          {row.original.status ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
        </Button>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link href={`/banner/${row.original.id}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const newState = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      table.setPageIndex(newState.pageIndex);
    },
    manualPagination: false,
  });

  return (
    <AppLayout>
      <Head title="Videos" />
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Videos</h1>
          <Link href="/videos/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Video
            </Button>
          </Link>
        </div>

        {/* 🔍 Search + Page Size Controls */}
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex justify-end w-full md:w-auto">
            <input
              type="text"
              placeholder="Search videos..."
              value={table.getState().globalFilter ?? ''}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="border px-3 py-2 rounded-md w-full max-w-sm shadow-sm"
            />
          </div>
          <div className="flex justify-end w-full md:w-auto">
            <select
              value={pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setPageSize(newSize);
                table.setPageSize(newSize);
              }}
              className="border px-3 py-2 rounded-md shadow-sm"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}