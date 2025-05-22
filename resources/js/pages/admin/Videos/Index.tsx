import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CheckCircle, Edit as EditIcon, Plus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

interface Video {
    id: number;
    name: string;
    video_type: 'local' | 'embed';
    video_path: string | null;
    embed_url: string | null;
    duration: string;
    status: boolean;
    course: { id: number; name: string } | null;
    unit: { id: number; title: string } | null;
    topic: { id: number; name: string } | null;
}

interface Props {
    videos: {
        data: Video[];
    };
    courses: { id: number; name: string }[];
}

export default function VideoIndex({ videos, courses }: Props) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<Video[]>(videos.data);

    const handleToggleStatus = (id: number, currentStatus: boolean) => {
        router.get(
            `/videos/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData((prev) => prev.map((item) => (item.id === id ? { ...item, status: !currentStatus } : item)));
                    toast.success('Video status updated');
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
                router.delete(`/videos/${id}`, {
                    onSuccess: () => {
                        setData((prev) => prev.filter((item) => item.id !== id));
                        Swal.fire('Deleted!', 'The video has been deleted.', 'success');
                    },
                    onError: () => {
                        Swal.fire('Error!', 'Failed to delete the video.', 'error');
                    }
                });
            }
        });
    };

    const columns: ColumnDef<Video>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            header: 'Course',
            accessorKey: 'course.name',
            cell: ({ row }) => row.original.course?.name || '-',
        },
        {
            header: 'Unit',
            accessorKey: 'unit.title',
            cell: ({ row }) => row.original.unit?.title || '-',
        },
        {
            header: 'Topic',
            accessorKey: 'topic.name',
            cell: ({ row }) => row.original.topic?.name || '-',
        },
        {
            header: 'Type',
            accessorKey: 'video_type',
            cell: ({ row }) => <Badge variant={row.original.video_type === 'local' ? 'default' : 'secondary'}>{row.original.video_type}</Badge>,
        },
        {
            accessorKey: 'duration',
            header: 'Duration',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    className={`${row.original.status ? 'bg-green-800 hover:bg-green-800' : 'bg-red-600 hover:bg-red-600'} text-white hover:text-white`}
                    onClick={() => handleToggleStatus(row.original.id, row.original.status)}
                >
                    {row.original.status ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                </Button>
            ),
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-2">
                    <Link href={`/videos/${row.original.id}/edit`}>
                        <Button variant="ghost" size="icon">
                            <EditIcon className="h-4 w-4" />
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
            pagination: { pageIndex: 0, pageSize },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: (updater) => {
            const next = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
            table.setPageIndex(next.pageIndex);
        },
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

                {/* 🔍 Search Input */}
                <div className="mb-4 flex justify-end">
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={table.getState().globalFilter ?? ''}
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                        className="w-full max-w-sm rounded-md border px-3 py-2 shadow-sm"
                    />
                </div>

                <div className="overflow-x-auto rounded-lg border shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {table.getHeaderGroups()[0].headers.map((header) => (
                                    <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
