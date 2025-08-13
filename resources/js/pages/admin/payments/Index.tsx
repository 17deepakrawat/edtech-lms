import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { usePermission } from '@/pages/admin/pagepermision';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { CheckCircle,Clock, XCircle } from 'lucide-react';
import { useState } from 'react';

interface PaymentInfo {
    payment_id: number;
    student_name: string;
    course_name: string;
    transaction_id: string;
    amount: string;
    payment_date: string;
    payment_time: string;
    payment_status: boolean;
}

interface Props extends PageProps {
    paymentinfo: PaymentInfo[];
}

export default function PaymentGatewayIndex({ paymentinfo }: Props) {
    const { hasPermission } = usePermission();
    const [globalFilter, setGlobalFilter] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<PaymentInfo[]>(paymentinfo);

    const columns: ColumnDef<PaymentInfo>[] = [
        {
            header: 'S.No',
            cell: (info) => info.row.index + 1,
        },
        {
            accessorKey: 'student_name',
            header: 'Student Name',
        },
        {
            accessorKey: 'course_name',
            header: 'Course Name',
        },
        {
            accessorKey: 'transaction_id',
            header: 'Transaction ID',
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: (info) => `₹${info.getValue()}`,
        },
        {
            accessorKey: 'payment_date',
            header: 'Date',
        },
        {
            accessorKey: 'payment_time',
            header: 'Time',
        },
        {
            accessorKey: 'payment_status',
            header: 'Status',
            cell: (info) => {
                const status = info.getValue();
                if (status === 'paid') {
                    return (
                        <span className="flex items-center font-medium text-green-600">
                            <CheckCircle className="mr-1 h-4 w-4" /> Paid
                        </span>
                    );
                } else if (status === 'pending') {
                    return (
                        <span className="flex items-center font-medium text-yellow-600">
                            <Clock className="mr-1 h-4 w-4" /> Pending
                        </span>
                    );
                } else {
                    return (
                        <span className="flex items-center font-medium text-red-600">
                            <XCircle className="mr-1 h-4 w-4" /> Unpaid
                        </span>
                    );
                  }
                }

        },
    ];
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination: {
                pageIndex: 0,
                pageSize,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: (updater) => {
            const newState = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
            table.setPageIndex(newState.pageIndex);
        },
        manualPagination: false,
    });
    return (
        <AppLayout>
            <Head title="Payment Gateway" />
            <div className="container mx-auto p-4 mt-20">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Payment Gateway</h1>
                </div>

                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <input
                        type="text"
                        placeholder="Search payment gateways..."
                        value={table.getState().globalFilter ?? ''}
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                        className="w-full max-w-sm rounded-md border px-3 py-2 shadow-sm"
                    />
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            const newSize = Number(e.target.value);
                            setPageSize(newSize);
                            table.setPageSize(newSize);
                        }}
                        className="rounded-md border px-3 py-2 shadow-sm"
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
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
