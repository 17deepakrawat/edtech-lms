import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CheckCircle, Edit, Plus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { usePermission } from    '@/pages/admin/pagepermision';
interface programs {
    id: number;
    name: string;
    department_name: string;
    status: boolean; // Add status field
}
interface User {}

interface Props extends PageProps {
    programs: programs[];
    users: User[];
    }

export default function departmentIndex({ programs}: Props) {
    const { hasPermission } = usePermission();
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);

    const columns: ColumnDef<programs>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'department_name',
            header: 'Department Name',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    className={`${row.original.status ? 'bg-green-800 hover:bg-green-800' : 'bg-red-600 hover:bg-red-600'} text-white hover:text-white`}
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
                   {hasPermission('edit program') && (
                        <Link href={`/programs/${row.original.id}/edit`}>
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                   {hasPermission('delete program') && (
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
                            <Trash2 className={`h-4 w-4 ${programs.status == 1 ? 'text-green-600' : 'text-red-600'}`} />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: programs,
        columns,
        state: {
            globalFilter,
            pagination: {
                pageSize,
                pageIndex: 0,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: (updater) => {
            const newState = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
            table.setPageIndex(newState.pageIndex);
        },
        manualPagination: false,
    });

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
                // Perform the delete operation
                router.delete(`/programs/${id}`);
                Swal.fire('Deleted!', 'The program has been deleted.', 'success');
            }
        });
    };

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            `/programs/${id}/toggle-status`,
            {},
            {
                onSuccess: (response) => {
                    // Update the status of the program locally for instant UI update
                    programs = programs.map((program) => (program.id === id ? { ...program, status: response.status } : program));
                    // Show success toast notification

                    toast.success('Program Status updated');
                },
                onError: (error) => {
                    // Show error toast notification
                    toast.error('Could not update status. Please try again.');
                },
            },
        );
    };

    return (
        <AppLayout>
            <Head title="Programs" />

            <div className="container mx-auto p-4 mt-20">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Programs</h1>
                    {hasPermission('create program') && (
                        <Link href="/programs/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Create Program
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="ml-2 rounded border px-2 py-1">
                        {[10, 20, 30, 50].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                    <Input
                        placeholder="Search..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                        className="max-w-2xs"
                    />
                </div>

                <table className="w-full table-auto rounded border bg-white shadow dark:bg-neutral-800">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="bg-neutral-100 dark:bg-neutral-700">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-4 py-2 text-left">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id} className="border-t dark:border-neutral-700">
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 flex items-center justify-between">
                    <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <div>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
