import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface Department {
    id: number;
    name: string;
}

interface EditProps {
    isOpen: boolean;
    onClose: () => void;
    department: Department;
    onSuccess?: () => void;
}

export default function Edit({ isOpen, onClose, department, onSuccess }: EditProps) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: department.name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        post(`/department/${department.id}`, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Department updated successfully!');
                onClose();
                if (onSuccess) onSuccess();
            },
            onError: () => {
                toast.error('Failed to update Department. Please try again.');
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Department</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Update'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
