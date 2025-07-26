import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CheckCircle, Edit as EditIcon, Plus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Create from './Create';
import Edit from './Edit';

interface Course {
    id: number;
    name: string;
}

interface Unit {
    id: number;
    course_id: number;
    title: string;
    course: Course;
}

interface Topic {
    id: number;
    unit_id: number;
    name: string;
    status: boolean;
    unit: Unit;
}
interface User {}
 
interface Props extends PageProps {
    topics: {
        data: Topic[];
        links: any[];
    };
    units: Unit[];
    users: User[];
    can: {
        create: boolean;
        edit: boolean;
        delete: boolean;
    };
}

export default function Index({ topics, units, can }: Props) {
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<Topic[]>(topics.data);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

    const openEditModal = (topic: Topic) => {
        setSelectedTopic(topic);
        setIsEditModalOpen(true);
    };

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            `/topics/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData(prev =>
                        prev.map(item =>
                            item.id === id ? { ...item, status: !currentStatus } : item
                        )
                    );
                    toast.success('Topic status updated');
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
                router.delete(`/topics/${id}`, {
                    onSuccess: () => {
                        setData(prev => prev.filter(item => item.id !== id));
                        toast.success('Topic deleted successfully');
                    },
                    onError: () => {
                        toast.error('Failed to delete topic.');
                    }
                });
            }
        });
    };

    const handleCreateSuccess = (newTopic: Topic) => {
        setData(prev => [...prev, newTopic]);
        setIsCreateModalOpen(false);
        toast.success('Topic created successfully');
    };

    const handleEditSuccess = (updatedTopic: Topic) => {
        setData(prev =>
            prev.map(item =>
                item.id === updatedTopic.id ? updatedTopic : item
            )
        );
        setIsEditModalOpen(false);
        toast.success('Topic updated successfully');
    };

    const columns: ColumnDef<Topic>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'unit.title',
            header: 'Unit',
        },
        {
            accessorKey: 'unit.course.name',
            header: 'Course',
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
                     {can.edit && (
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(row.original)}>
                        <EditIcon className="h-4 w-4" />
                    </Button>)}
                     {can.delete && (
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>)}
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
            <Head title="Topics" />

            <div className="container mx-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Topics</h1>
                     {can.create && (
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Create Topic
                    </Button>)}
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

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Topic</DialogTitle>
                    </DialogHeader>
                    <Create 
                        units={units} 
                        onClose={() => setIsCreateModalOpen(false)} 
                        onSuccess={handleCreateSuccess}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Topic</DialogTitle>
                    </DialogHeader>
                    {selectedTopic && (
                        <Edit 
                            topic={selectedTopic} 
                            units={units} 
                            onClose={() => setIsEditModalOpen(false)}
                            onSuccess={handleEditSuccess}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
} 