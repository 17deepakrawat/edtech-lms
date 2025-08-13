// ... imports
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { usePermission } from '@/pages/admin/pagepermision';
import { PageProps } from '@/types';
import { Dialog } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CheckCircle, CirclePlus, Trash2, XCircle } from 'lucide-react';
import { useState } from 'react';
import Select from 'react-select';
import { toast } from 'sonner';
import Swal from 'sweetalert2';
interface User {
    id: number;
    name: string;
    email: string;
    status: boolean;
    courses?: { id: number; name: string; fee: string }[];
}
interface Course {
    id: number;
    name: string;
}
interface Props extends PageProps {
    mentor: User[];
    courses: Course[];
}
export default function Index({ mentor, courses }: Props) {
    const { hasPermission } = usePermission();
    const [data, setData] = useState<User[]>(mentor);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [selectedCourses, setSelectedCourses] = useState<{ id: number; fee: number }[]>([]);
    const [removedCourseIds, setRemovedCourseIds] = useState<number[]>([]);

    const openCourseModal = (userId: number) => {
        const mentor = data.find((u) => u.id === userId);
        const prefilledCourses =
            mentor?.courses?.map((c) => ({
                id: c.id,
                fee: parseFloat(c.fee),
            })) ?? [];

        setSelectedUserId(userId);
        setSelectedCourses(prefilledCourses);
        setRemovedCourseIds([]); // Reset removed list on new modal open
        setIsCourseOpen(true);
    };

    const updateFee = (courseId: number, fee: number) => {
        setSelectedCourses((prev) => prev.map((c) => (c.id === courseId ? { ...c, fee } : c)));
    };

    const handleRemoveCourse = (courseId: number) => {
        setSelectedCourses((prev) => prev.filter((c) => c.id !== courseId));
        setRemovedCourseIds((prev) => [...prev, courseId]);
    };

    // const submitCourse = () => {
    //     if (!selectedUserId) return;

    //     router.post(
    //         `/mentor-allot/${selectedUserId}/assign-course`,
    //         {
    //             courses: selectedCourses,
    //             removed: removedCourseIds,
    //         },
    //         {
    //             preserveScroll: true,
    //             onSuccess: (page) => {
    //                 const flash = page.props.flash;
    //                 if (flash?.success) toast.success(flash.success);
    //                 if (flash?.msg) toast.error(flash.msg);
    //                 setIsCourseOpen(false);
    //                 setRemovedCourseIds([]);
    //             },
    //             onError: () => toast.error('Course assignment failed'),
    //         }
    //     );
    // };
    const submitCourse = () => {
        if (!selectedUserId) return;

        router.post(
            `/mentor-allot/${selectedUserId}/assign-course`,
            {
                courses: selectedCourses,
                removed: removedCourseIds,
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = page.props.flash;
                    if (flash?.success) toast.success(flash.success);
                    if (flash?.msg) toast.error(flash.msg);

                    // ✅ Update local data without reload
                    setData((prevData) =>
                        prevData.map((mentor) => {
                            if (mentor.id === selectedUserId) {
                                const updatedCourses = selectedCourses.map((c) => {
                                    const course = courses.find((co) => co.id === c.id);
                                    return {
                                        id: c.id,
                                        name: course?.name || '',
                                        fee: c.fee.toString(),
                                    };
                                });
                                return {
                                    ...mentor,
                                    courses: updatedCourses,
                                };
                            }
                            return mentor;
                        }),
                    );

                    setIsCourseOpen(false);
                    setRemovedCourseIds([]);
                },
                onError: () => toast.error('Course assignment failed'),
            },
        );
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then((res) => {
            if (res.isConfirmed) {
                router.delete(`/mentors/${id}`, {
                    onSuccess: () => {
                        setData((prev) => prev.filter((user) => user.id !== id));
                        toast.success('Mentor deleted');
                    },
                });
            }
        });
    };

    const handleStatusToggle = (id: number, currentStatus: boolean) => {
        router.get(
            `/mentors/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                onSuccess: () => {
                    setData((prev) => prev.map((user) => (user.id === id ? { ...user, status: !currentStatus } : user)));
                },
            },
        );
    };

    const columns: ColumnDef<User>[] = [
        { header: 'S.No', cell: (info) => info.row.index + 1 },
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'email', header: 'Email' },
        {
            accessorKey: 'courses',
            header: 'Alloted',
            cell: ({ row }) => row.original.courses?.map((c) => c.name).join(', ') || '—',
        },
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
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex gap-2">
                    {hasPermission('allot course mentor') && (
                        <Button variant="ghost" size="icon" onClick={() => openCourseModal(row.original.id)}>
                            <CirclePlus className="h-4 w-4 text-green-600" />
                        </Button>
                    )}
                    {hasPermission('delete course mentor') && (
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
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
        state: { globalFilter },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AppLayout>
            <Head title="Mentors" />
            <div className="container mx-auto p-4 mt-20">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Mentors</h1>
                    {/* {hasPermission('create mentor') && (
                    <Link href="/users/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add User
                        </Button>
                    </Link>)} */}
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
                            {table.getHeaderGroups().map((group) => (
                                <tr key={group.id}>
                                    {group.headers.map((header) => (
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

            {/* Modal */}
            <Dialog open={isCourseOpen} onClose={() => setIsCourseOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
                        <Dialog.Title className="mb-4 text-lg font-bold">Assign Courses</Dialog.Title>

                        {/* Dropdown Select */}
                        <div className="mb-4">
                            <label className="mb-1 block text-sm font-medium">Select Courses</label>
                            <Select
                                isMulti
                                options={courses.map((course) => ({
                                    value: course.id,
                                    label: course.name,
                                }))}
                                value={selectedCourses.map((c) => {
                                    const course = courses.find((x) => x.id === c.id);
                                    return { value: c.id, label: course?.name || '' };
                                })}
                                onChange={(selectedOptions) => {
                                    const selectedIds = selectedOptions.map((opt) => opt.value);
                                    const removed = selectedCourses.filter((c) => !selectedIds.includes(c.id)).map((c) => c.id);

                                    setRemovedCourseIds((prev) => [...prev, ...removed]);

                                    const updated = selectedOptions.map((opt) => {
                                        const existing = selectedCourses.find((c) => c.id === opt.value);
                                        return { id: opt.value, fee: existing?.fee ?? 0 };
                                    });

                                    setSelectedCourses(updated);
                                }}
                            />
                        </div>

                        {/* Fee Inputs */}
                        {selectedCourses.length > 0 && (
                            <div className="mb-4 space-y-2">
                                {selectedCourses.map((c) => {
                                    const course = courses.find((course) => course.id === c.id);
                                    return (
                                        <div key={c.id} className="flex items-center justify-between gap-4 rounded bg-gray-100 px-3 py-2">
                                            <div className="flex-1">
                                                <div className="font-medium">{course?.name}</div>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    placeholder="Fee"
                                                    value={c.fee}
                                                    onChange={(e) => updateFee(c.id, parseFloat(e.target.value))}
                                                    className="mt-1 w-32 rounded border px-2 py-1"
                                                />
                                            </div>
                                            <button onClick={() => handleRemoveCourse(c.id)} className="text-red-500">
                                                Remove
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Buttons */}
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
