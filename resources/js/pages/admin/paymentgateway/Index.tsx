import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { usePermission } from '@/pages/admin/pagepermision';
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

interface PaymentGateway {
  id: number;
  name: string;
  status: boolean;
}

interface Props extends PageProps {
  payment: PaymentGateway[];
}

export default function PaymentGatewayIndex({ payment }: Props) {
  const { hasPermission } = usePermission();
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<PaymentGateway[]>(payment);

  const handleStatusToggle = (id: number, currentStatus: boolean) => {
    router.get(
      `/payment-gateways/${id}/toggle-status`,
      {},
      {
        preserveState: true,
        onSuccess: () => {
          setData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, status: !currentStatus } : item))
          );
          toast.success('Payment Gateway status updated');
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
        router.delete(`/payment-gateways/${id}`, {
          onSuccess: () => {
            setData((prev) => prev.filter((item) => item.id !== id));
            toast.success('Payment Gateway deleted');
          },
          onError: () => {
            toast.error('Failed to delete Payment Gateway.');
          },
        });
      }
    });
  };

  const columns: ColumnDef<PaymentGateway>[] = [
    {
      header: 'S.No',
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: 'name',
      header: 'Name',
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
          {row.original.status ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
        </Button>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Link href={`/payment-gateways/${row.original.id}/edit`}>
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
      <Head title="Payment Gateway" />
      <div className="container mx-auto p-4 mt-20">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Payment Gateway</h1>
          <Link href="/payment-gateways/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Gateway
            </Button>
          </Link>
        </div>

        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search payment gateways..."
            value={table.getState().globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full max-w-sm rounded-md border px-3 py-2 shadow-sm"
          />
          <select
            value={pageSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              setPageSize(newSize);
              table.setPageSize(newSize);
            }}
            className="rounded-md border px-3 py-2 shadow-sm"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg border shadow-sm">
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
