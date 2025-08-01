import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',       
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);       
        if (data.image) formData.append('image', data.image);

        post('/universitypartner', {
            data: formData,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('University partner created successfully');
            },
            onError: () => {
                toast.error('Please check your input and try again.');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Create University Partner" />
            <div className="px-4">
                <h1 className="text-2xl font-bold mb-4">Create New University Partner</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                   
                    <div className="w-full">
                        <Label htmlFor="image">University Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={e => setData('image', e.target.files?.[0] || null)}
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/universitypartner">
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
