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

interface Blog {
    id: number;
    name: string;
    author_name: string;
    author_image: string;
    image: string;
    content: string;
    faq: Array<{ question: string; answer: string }>;
    blog_category_id: number;
    status: boolean;
}

interface Props extends PageProps {
    blogs: Blog[];
}

export default function BlogIndex({ blogs }: Props) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<Blog[]>(blogs);

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            `/adminblogs/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData(prev =>
                        prev.map(item =>
                            item.id === id ? { ...item, status: !currentStatus } : item
                        )
                    );
                    toast.success('Blog status updated');
                },
                onError: () => {
                    toast.error('Failed to update status.');
                }
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
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/adminblogs/${id}`, {
                    onSuccess: () => {
                        setData(prev => prev.filter(item => item.id !== id));
                        toast.success('Blog deleted successfully');
                    },
                    onError: () => {
                        toast.error('Failed to delete blog.');
                    }
                });
            }
        });
    };

    const columns: ColumnDef<Blog>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'name',
            header: 'Title',
        },
        {
            accessorKey: 'author_name',
            header: 'Author',
        },
        {
            header: 'Author Image',
            cell: ({ row }) => <img src={`/storage/${row.original.author_image}`} alt="Author" className="h-20 w-20 rounded" />,
        },
        {
            header: 'Blog Image',
            cell: ({ row }) => <img src={`/storage/${row.original.image}`} alt="Blog" className="h-20 w-20 rounded" />,
        },
        {
            accessorKey: 'content',
            header: 'Content',
            cell: ({ row }) => <div className="line-clamp-3 max-w-xs text-sm" dangerouslySetInnerHTML={{ __html: row.original.content }} />,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    className={`${row.original.status ? 'bg-green-800 hover:bg-green-800 ' : 'bg-red-600 hover:bg-red-600 '} text-white hover:text-white`}
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
                    <Link href={`/adminblogs/${row.original.id}/edit`}>
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
            <Head title="Blogs" />

            <div className="container mx-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Blogs</h1>
                    <Link href="/adminblogs/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Blog
                        </Button>
                    </Link>
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
