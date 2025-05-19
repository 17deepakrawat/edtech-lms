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
    title: string;
    description: string;
    image: string;
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
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => <div className="line-clamp-3 max-w-xs text-sm" dangerouslySetInnerHTML={{ __html: row.original.description }} />,
        },
        {
            header: 'Image',
            cell: ({ row }) => <img src={`/storage/${row.original.image}`} alt="Blog" className="h-20 w-20 rounded" />,
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

    // ... rest of the component code ...
} 