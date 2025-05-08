import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ program, departments }) {
    const { data, setData, put, processing, errors } = useForm({
        name: program.name || '',
        department_id: program.department_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/programs/${program.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Program updated successfully');
            },
            onError: () => {
                toast.error('Please check your input and try again.');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Program" />
            <div className="px-4">
                <h1 className="text-2xl font-bold mb-4">Edit Program</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="w-full">
                        <Label htmlFor="name">Program Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="w-full">
                        <Label htmlFor="department_id">Department</Label>
                        <select
                            id="department_id"
                            value={data.department_id}
                            onChange={(e) => setData('department_id', e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        {errors.department_id && (
                            <p className="text-red-500 text-sm">{errors.department_id}</p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/program">
                            <Button variant="outline">← Back</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
