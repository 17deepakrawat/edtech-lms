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
interface Course {
    id: number;
    name: string;
    department: string;
    program: string;
    price: number;
    image: string;
    status: boolean;
}
interface User {}

interface Props extends PageProps {
    courses: Course[];
    users: User[];    
}

export default function CourseIndex({ courses}: Props) {
    const { hasPermission } = usePermission();
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<Course[]>(courses);

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            `/courses/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData((prev) => prev.map((item) => (item.id === id ? { ...item, status: !currentStatus } : item)));
                    toast.success('Course status updated');
                },
                onError: () => {
                    toast.error('Failed to update status.');
                },
            },
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
                router.delete(`/courses/${id}`, {
                    onSuccess: () => {
                        setData((prev) => prev.filter((item) => item.id !== id));
                        toast.success('Course deleted successfully');
                    },
                    onError: () => {
                        toast.error('Failed to delete course.');
                    },
                });
            }
        });
    };

    const columns: ColumnDef<Course>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'department',
            header: 'Department',
        },
        {
            accessorKey: 'program',
            header: 'Program',
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => `$${row.original.price}`,
        },
        {
            header: 'Image',
            cell: ({ row }) => (
                <img src={`/storage/${row.original.image}`} alt="Course" className="rounded" style={{ width: '80px', height: '40px' }} />
            ),
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
                     {hasPermission('edit course') && (
                        <Link href={`/courses/${row.original.id}/edit`}>
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                    {hasPermission('delete course') && (
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                    )}                   
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: data,
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

    return (
        <AppLayout>
            <Head title="Courses" />

            <div className="container mx-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Courses</h1>
                    {hasPermission('create course') && (
                        <Link href="/courses/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Create Course
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
