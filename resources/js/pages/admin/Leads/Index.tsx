import { Button } from '@/components/ui/button';
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
import { FileDown, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface Props extends PageProps {
  leads: Lead[];
}

export default function LeadIndex({ leads }: Props) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState<Lead[]>(leads);

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
        router.delete(`/leads/${id}`, {
          onSuccess: () => {
            setData((prev) => prev.filter((lead) => lead.id !== id));
            Swal.fire('Deleted!', 'Lead has been deleted.', 'success');
          },
          onError: () => {
            Swal.fire('Error!', 'Failed to delete lead.', 'error');
          },
        });
      }
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Leads Report', 14, 15);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    const tableColumn = ['S.No', 'Name', 'Email', 'Phone', 'Created At'];
    const tableRows = data.map((lead, index) => [
      index + 1,
      lead.name,
      lead.email,
      lead.phone,
      new Date(lead.created_at).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold',
      },
    });

    doc.save('leads.pdf');
  };

  const exportToExcel = () => {
    const worksheetData = data.map((lead, index) => ({
      'S.No': index + 1,
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      'Created At': new Date(lead.created_at).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

    XLSX.writeFile(workbook, 'leads.xlsx');
  };

  const columns: ColumnDef<Lead>[] = [
    { header: 'S.No', cell: (info) => info.row.index + 1 },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'created_at', header: 'Date' },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)}>
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
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
    onPaginationChange: (updater) => {
      const newState = typeof updater === 'function' ? updater(table.getState().pagination) : updater;
      table.setPageIndex(newState.pageIndex);
    },
    manualPagination: false,
  });

  return (
    <AppLayout>
      <Head title="Leads" />

      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Leads</h1>
          <div className="flex gap-2">
            <Button onClick={exportToPDF} variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export PDF
            </Button>
            <Button onClick={exportToExcel} variant="outline" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
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
