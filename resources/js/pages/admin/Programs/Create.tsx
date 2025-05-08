import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Head, Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface Department {
    id: number;
    name: string;
}

interface Props extends PageProps {
    departments: Department[];
}

export default function Create({ departments }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        department_id: '',
        status: '1', // default active
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post('/programs', {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Program created successfully');
            },
            onError: () => {
                toast.error('Please check your input and try again.');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Create Program" />
            <div className="px-4">
                <h1 className="text-2xl font-bold mb-4">Create New Program</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name">Program Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Enter program name"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="department_id">Select Department</Label>
                        <Select
                            value={data.department_id}
                            onValueChange={value => setData('department_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a department" />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map(dep => (
                                    <SelectItem key={dep.id} value={String(dep.id)}>
                                        {dep.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.department_id && <p className="text-red-500 text-sm mt-1">{errors.department_id}</p>}
                    </div>                   

                    <div className="flex justify-end space-x-3">
                        <Link href="/programs">
                            <Button variant="outline">← Back</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
