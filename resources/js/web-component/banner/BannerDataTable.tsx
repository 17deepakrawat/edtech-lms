import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type Banner } from '@/types/banner';
import { Edit, Trash2 } from 'lucide-react';

interface BannerDataTableProps {
    banners: Banner[];
    onEdit: (banner: Banner) => void;
    onDelete: (id: number) => void;
}

export default function BannerDataTable({ banners, onEdit, onDelete }: BannerDataTableProps) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {banners.map((banner) => (
                        <TableRow key={banner.id}>
                            <TableCell>{banner.title}</TableCell>
                            <TableCell>{banner.description}</TableCell>
                            <TableCell>
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="h-10 w-10 object-cover rounded"
                                />
                            </TableCell>
                            <TableCell>
                                <a
                                    href={banner.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View Link
                                </a>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                        banner.status
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                    }`}
                                >
                                    {banner.status ? 'Active' : 'Inactive'}
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(banner)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(banner.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 