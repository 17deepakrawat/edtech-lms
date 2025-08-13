import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { CheckCircle, Edit as EditIcon, Plus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import Create from './Create';
import Edit from './Edit';
import { usePermission } from '@/pages/admin/pagepermision';

interface Course {
    id: number;
    name: string;
}

interface Unit {
    id: number;
    course_id: number;
    title: string;
    order: number;
    status: boolean;
    course: Course;
}

interface User {}

interface Props extends PageProps {
    units: {
        data: Unit[];
        links: any[];
    };
    courses: Course[];
    users: User[];
}

export default function Index({ units, courses }: Props) {
    const { hasPermission } = usePermission();
    const [globalFilter, setGlobalFilter] = useState('');
    const [data, setData] = useState<Unit[]>(units.data);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

    const openEditModal = (unit: Unit) => {
        setSelectedUnit(unit);
        setIsEditModalOpen(true);
    };

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            `/units/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData((prev) =>
                        prev.map((item) =>
                            item.id === id ? { ...item, status: !currentStatus } : item
                        )
                    );
                    toast.success('Course status updated');
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
                router.delete(`/units/${id}`, {
                    onSuccess: () => {
                        setData((prev) => prev.filter((item) => item.id !== id));
                        toast.success('Unit deleted successfully');
                    },
                    onError: () => {
                        toast.error('Failed to delete unit.');
                    },
                });
            }
        });
    };

    const handleCreateSuccess = (newUnit: Unit) => {
        setData((prev) => [...prev, newUnit]);
        setIsCreateModalOpen(false);
        toast.success('Unit created successfully');
    };

    const handleEditSuccess = (updatedUnit: Unit) => {
        setData((prev) =>
            prev.map((item) => (item.id === updatedUnit.id ? updatedUnit : item))
        );
        setIsEditModalOpen(false);
        toast.success('Unit updated successfully');
    };

    const columns: ColumnDef<Unit>[] = [
        {
            header: 'S.No',
            cell: (info) =>
                pagination.pageIndex * pagination.pageSize + info.row.index + 1,
        },
        {
            accessorKey: 'title',
            header: 'Title',
        },
        {
            accessorKey: 'course.name',
            header: 'Course',
        },
        {
            accessorKey: 'order',
            header: 'Order',
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    className={`${
                        row.original.status
                            ? 'bg-green-800 hover:bg-green-800'
                            : 'bg-red-600 hover:bg-red-600'
                    } text-white hover:text-white`}
                    onClick={() =>
                        handleStatusToggle(row.original.id, row.original.status)
                    }
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
                    {hasPermission('edit unit') && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditModal(row.original)}
                        >
                            <EditIcon className="h-4 w-4" />
                        </Button>
                    )}
                    {hasPermission('delete unit') && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(row.original.id)}
                        >
                            <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination,
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: false,
    });

    return (
        <AppLayout>
            <Head title="Units" />

            <div className="container mx-auto p-4 mt-20">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Units</h1>
                    {hasPermission('create unit') && (
                        <Button onClick={() => setIsCreateModalOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" /> Create Unit
                        </Button>
                    )}
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <select
                        value={pagination.pageSize}
                        onChange={(e) =>
                            setPagination({
                                ...pagination,
                                pageSize: Number(e.target.value),
                                pageIndex: 0,
                            })
                        }
                        className="ml-2 rounded border px-2 py-1"
                    >
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
                            <tr
                                key={headerGroup.id}
                                className="bg-neutral-100 dark:bg-neutral-700"
                            >
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="px-4 py-2 text-left">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-t dark:border-neutral-700"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="px-4 py-2">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 flex items-center justify-between">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <div>
                        Page {pagination.pageIndex + 1} of {table.getPageCount()}
                    </div>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* Create Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Unit</DialogTitle>
                    </DialogHeader>
                    <Create
                        courses={courses}
                        onClose={() => setIsCreateModalOpen(false)}
                        onSuccess={handleCreateSuccess}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Unit</DialogTitle>
                    </DialogHeader>
                    {selectedUnit && (
                        <Edit
                            unit={selectedUnit}
                            courses={courses}
                            onClose={() => setIsEditModalOpen(false)}
                            onSuccess={handleEditSuccess}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
