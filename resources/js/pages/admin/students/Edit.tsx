import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Student {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    dob: string;
    mobile: string;
   
}

export default function EditUser({ student }: { student: Student }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: student?.first_name || '',
        middle_name: student?.middle_name || '',
        last_name: student?.last_name || '',
        email: student?.email || '',
        dob: student?.dob || '',
        mobile: student?.mobile || '',
        status: student?.status || 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/students/${student.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('User updated successfully!');
            },
            onError: () => {
                toast.error('Please check your input and try again.');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Edit User" />
            <div className="px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">Edit User</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="first_name">First Name</Label>
                        <Input id="first_name" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                        {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="middle_name">Middle Name</Label>
                        <Input id="middle_name" value={data.middle_name} onChange={(e) => setData('middle_name', e.target.value)} />
                        {errors.middle_name && <p className="text-sm text-red-500">{errors.middle_name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="last_name">Last Name</Label>
                        <Input id="last_name" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                        {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                    </div>

                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" value={data.dob} onChange={(e) => setData('dob', e.target.value)} />
                        {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
                    </div>

                    <div>
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input id="mobile" value={data.mobile} onChange={(e) => setData('mobile', e.target.value)} />
                        {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
                    </div>

                   

                    <div className="flex justify-end">
                        <Link href="/students">
                            <Button variant="outline">← Back</Button>
                        </Link>
                        <Button className="ms-3" type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
