import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CheckCircle, Edit, Plus, Trash2, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { usePermission } from    '@/pages/admin/pagepermision';
interface Plan {
    id: number;
    title: string;
    price: number;
    frequency: string;
    features: string[];
    disabled_features: string[];
    status: boolean;
}
interface User {}

interface Props extends PageProps {
    plans: Plan[];
    flash: {
        success?: string;
        error?: string;
    };
    
}

export default function PlanIndex({ plans, flash}: Props) {
    const { hasPermission } = usePermission();
    const [data, setData] = useState<Plan[]>(plans);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const filteredData = useMemo(() => {
        return data.filter((plan) => plan.title.toLowerCase().includes(globalFilter.toLowerCase()));
    }, [data, globalFilter]);

    const columns: ColumnDef<Plan>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1 + pagination.pageIndex * pagination.pageSize,
        },
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
        },
        {
            accessorKey: 'frequency',
            header: 'Frequency',
            cell: ({ row }) => row.original.frequency.charAt(0).toUpperCase() + row.original.frequency.slice(1),
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
                   {hasPermission('edit course plans') && (
                        <Link href={`/plans/${row.original.id}/edit`}>
                            <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </Link>
                    )}
                     {hasPermission('delete course plans') && (
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        pageCount: Math.ceil(filteredData.length / pagination.pageSize),
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
    });

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('plans.destroy', id), {
                    onSuccess: () => {
                        setData((prev) => prev.filter((plan) => plan.id !== id));
                        toast.success('Plan deleted successfully');
                    },
                    onError: () => {
                        toast.error('Failed to delete plan');
                    },
                });
            }
        });
    };

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            route('plans.toggle-status', id),
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData((prev) => prev.map((item) => (item.id === id ? { ...item, status: !currentStatus } : item)));
                    toast.success('Plan status updated');
                },
                onError: () => {
                    toast.error('Failed to update status.');
                },
            },
        );
    };

    return (
        <AppLayout>
            <Head title="Plans" />
            <div className="container mx-auto p-4 mt-20">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Plans</h1>
                    {hasPermission('create course plans') && (
                        <Link href="/plans/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add New Plan
                            </Button>
                        </Link>
                    )}
                </div>

                {flash?.success && <div className="mb-4 font-medium text-green-600">{flash.success}</div>}
                {flash?.error && <div className="mb-4 font-medium text-red-600">{flash.error}</div>}

                <div className="mb-4 flex items-center justify-between">
                    <select
                        value={pagination.pageSize}
                        onChange={(e) => setPagination((prev) => ({ ...prev, pageSize: Number(e.target.value), pageIndex: 0 }))}
                        className="rounded border px-2 py-1"
                    >
                        {[10, 20, 30, 50].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                    <Input
                        placeholder="Search..."
                        value={globalFilter}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                            setPagination((prev) => ({ ...prev, pageIndex: 0 }));
                        }}
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
