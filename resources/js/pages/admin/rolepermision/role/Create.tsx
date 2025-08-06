import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import InputError from '@/components/input-error';
import axios from 'axios';

interface CreateRoleProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (role: { id: number; name: string }) => void;
}

export default function Create({ isOpen, onClose, onSuccess }: CreateRoleProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        guard_name: 'user', // ✅ add default guard_name here
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/roles', {
                name: data.name,
                guard_name: data.guard_name,
            });
            toast.success('Role created successfully');
            reset();
            onClose();
            if (onSuccess) onSuccess(response.data);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                toast.error('Please check your input and try again.');
            } else {
                toast.error('An error occurred.');
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="w-full">
                        <Label htmlFor="name">Role Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            autoFocus
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="w-full">
                        <Label htmlFor="guard_name">Visible To</Label>
                        <select
                            id="guard_name"
                            className="w-full border rounded-md p-2"
                            value={data.guard_name}
                            onChange={e => setData('guard_name', e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="student">Student</option>
                        </select>
                        <InputError message={errors.guard_name} />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Create'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
