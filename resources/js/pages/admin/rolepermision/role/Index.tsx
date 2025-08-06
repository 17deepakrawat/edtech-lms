// resources/js/Pages/admin/rolepermision/role/Index.tsx

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import axios from 'axios';
import { Plus, Shield } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
import Create from './Create';
import PermissionModal from './PermissionModal';

interface Role {
    id: number;
    name: string;
    guard_name: string;
}

export default function RoleIndex({ roles: initialRoles }: { roles: Role[] }) {
  console.log(initialRoles);
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<Role[]>(initialRoles);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [allPermissions, setAllPermissions] = useState<string[]>([]);
    const [assignedPermissions, setAssignedPermissions] = useState<string[]>([]);

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
                axios
                    .delete(`/roles/${id}`)
                    .then(() => {
                        setData((prev) => prev.filter((item) => item.id !== id));
                        toast.success('Role deleted successfully');
                    })
                    .catch(() => {
                        toast.error('Failed to delete role.');
                    });
            }
        });
    };

    const columns: ColumnDef<Role>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'guard_name',
            header: 'Visible To',
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={async () => {
                            try {
                                const response = await axios.post(`/roles/${row.original.id}/permissions`);
                                const { role, allPermissions, assignedPermissions } = response.data;
                                setSelectedRole(role);
                                setAllPermissions(allPermissions);
                                setAssignedPermissions(assignedPermissions);
                                setIsPermissionModalOpen(true);
                            } catch (error) {
                                toast.error('Failed to load permissions');
                            }
                        }}
                    >
                        <Shield className="h-4 w-4" />
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
                pageSize,
                pageIndex: 0,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        manualPagination: false,
    });

    return (
        <AppLayout>
            <Head title="Roles" />
            <div className="container mx-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Roles</h1>
                    <Button onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Create Role
                    </Button>
                </div>
                <div className="mb-4 flex items-center gap-2">
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

            <Create
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={(newRole) => {
                    setData((prev) => [...prev, newRole]);
                    setIsCreateModalOpen(false);
                }}
            />

            {selectedRole && isPermissionModalOpen && (
                <PermissionModal
                    isOpen={isPermissionModalOpen}
                    onClose={() => setIsPermissionModalOpen(false)}
                    role={selectedRole}
                    allPermissions={allPermissions}
                    assignedPermissions={assignedPermissions}
                />
            )}
        </AppLayout>
    );
}
