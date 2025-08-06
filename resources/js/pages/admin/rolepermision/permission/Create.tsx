import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import Select from 'react-select';

interface CreatePermissionProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: (permission: { id: number; name: string }) => void;
}

export default function Create({ isOpen, onClose, onSuccess }: CreatePermissionProps) {
    const guardOptions = [
        { value: 'user', label: 'User' },
        { value: 'student', label: 'Student' },
    ];

    const [selectedGuards, setSelectedGuards] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setError(null);

        try {
            const response = await axios.post('/permissions', {
                name,
                guard_names: selectedGuards, // send array of guard names
            });

            toast.success('Permission created successfully');
            onClose();
            if (onSuccess) onSuccess(response.data);
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setError(error.response.data.errors.name?.[0] || 'Please check your input and try again.');
                toast.error('Please check your input and try again.');
            } else {
                setError('An error occurred.');
                toast.error('An error occurred.');
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Permission</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Permission Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                        <InputError message={error || undefined} />
                    </div>
                    <div>
                        <Label htmlFor="guard_name">Visible To</Label>
                        <Select
                            isMulti
                            options={guardOptions}
                            value={guardOptions.filter((opt) =>
                                selectedGuards.includes(opt.value)
                            )}
                            onChange={(selectedOptions) => {
                                const values = selectedOptions.map((opt) => opt.value);
                                setSelectedGuards(values);
                            }}
                        />
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
