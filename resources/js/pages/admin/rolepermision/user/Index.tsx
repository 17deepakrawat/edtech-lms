import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Dialog } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CheckCircle, CirclePlus, Edit, Plus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import Swal from 'sweetalert2';

interface User {
    id: number;
    name: string;
    email: string;
    status: boolean;
}

interface Course {
    id: number;
    name: string;
}

interface Props extends PageProps {
    users: User[];
    courses: Course[];
}

export default function Index({ users, courses = [] }: Props) {
    const [data, setData] = useState<User[]>(users);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [roles, setRoles] = useState<string[]>([]);
    const [userRole, setUserRole] = useState<string>('');
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    const openRoleModal = (userId: number) => {
        setIsRoleOpen(true);
        setSelectedUserId(userId);
        fetch(`/users/${userId}/roles`)
            .then((res) => res.json())
            .then((data) => {
                setRoles(data.roles || []);
                setUserRole(data.userRoles?.[0] || '');
            });
    };

    const openCourseModal = (userId: number) => {
        setSelectedUserId(userId);
        setIsCourseOpen(true);
    };

    const submitRole = () => {
        if (!selectedUserId) return;

        router.post(
            `/api/users/${selectedUserId}/roles`,
            { role: userRole },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Role assigned successfully');
                    setIsRoleOpen(false);
                },
                onError: () => toast.error('Failed to assign role'),
            },
        );
    };

    const submitCourse = () => {
        if (!selectedUserId || !selectedCourseId) {
            toast.error('Please select a user and a course');
            return;
        }

        router.post(
            `/users/${selectedUserId}/assign-course`, // ✅ must match web.php route
            { course_id: selectedCourseId },
            {
                preserveScroll: true,
                onSuccess: (page: { props: { flash?: { success?: string; msg?: string } } }) => {
                    const flash = page.props.flash;

                    if (flash?.success) {
                        toast.success(flash.success);
                    } else if (flash?.msg) {
                        toast.error(flash.msg);
                    }

                    setIsCourseOpen(false);
                },
                onError: (errors: any) => {
                    const msg = errors?.message || (errors?.course_id && errors.course_id[0]) || 'Failed to assign course';
                    toast.error(msg);
                },
            },
        );
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/users/${id}`, {
                    onSuccess: () => {
                        setData((prev) => prev.filter((user) => user.id !== id));
                        toast.success('User deleted successfully');
                    },
                    onError: () => toast.error('Failed to delete user'),
                });
            }
        });
    };

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            `/users/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData((prev) => prev.map((user) => (user.id === id ? { ...user, status: !currentStatus } : user)));
                    toast.success('User status updated');
                },
                onError: () => toast.error('Failed to update status'),
            },
        );
    };

    const columns: ColumnDef<User>[] = [
        { header: 'S.No', cell: (info) => info.row.index + 1 },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    className={`text-white hover:text-white ${row.original.status ? 'bg-green-800 hover:bg-green-800' : 'bg-red-600 hover:bg-red-600'}`}
                    onClick={() => handleStatusToggle(row.original.id, row.original.status)}
                >
                    {row.original.status ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                </Button>
            ),
        },
        {
            header: 'Allot Role',
            cell: ({ row }) => (
                <Button variant="outline" onClick={() => openRoleModal(row.original.id)}>
                    Allot Role
                </Button>
            ),
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openCourseModal(row.original.id)}>
                        <CirclePlus className="h-4 w-4 text-green-600" />
                    </Button>
                    <Link href={`/users/${row.original.id}/edit`}>
                        <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4 text-blue-700" />
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
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AppLayout>
            <Head title="Users" />
            <div className="container mx-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">User Management</h1>
                    <Link href="/users/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add User
                        </Button>
                    </Link>
                </div>

                <input
                    type="text"
                    className="mb-4 w-full max-w-sm rounded border p-2"
                    placeholder="Search..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />

                <div className="overflow-x-auto rounded-lg border shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th key={header.id} className="px-6 py-3 text-left text-gray-700 uppercase">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {table.getRowModel().rows.map((row) => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex justify-between">
                    <span className="text-sm text-gray-600">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <div className="space-x-2">
                        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="outline">
                            Previous
                        </Button>
                        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="outline">
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            {/* Role Modal */}
            <Dialog open={isRoleOpen} onClose={() => setIsRoleOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
                        <Dialog.Title className="mb-4 text-lg font-bold">Assign Role</Dialog.Title>
                        <select className="mb-4 w-full rounded border p-2" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                            <option value="">-- Select Role --</option>
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsRoleOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={submitRole}>Assign</Button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Course Modal */}
            <Dialog open={isCourseOpen} onClose={() => setIsCourseOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
                        <Dialog.Title className="mb-4 text-lg font-bold">Assign Course</Dialog.Title>
                        <select
                            className="mb-4 w-full rounded border p-2"
                            value={selectedCourseId ?? ''}
                            onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                        >
                            <option value="">-- Select Course --</option>
                            {Array.isArray(courses) && courses.length > 0 ? (
                                courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No courses available</option>
                            )}
                        </select>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsCourseOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={submitCourse}>Assign</Button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </AppLayout>
    );
}
