import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface universityPartners {
    id: number;
    name: string;
    link: string;
    image: string;
}

interface Props {
    universityPartners: universityPartners;
}

export default function Edit({ universityPartners }: Props) {
    console.log(universityPartners);
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: universityPartners.name || '',
        link: universityPartners.link || '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('link', data.link);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(`/universitypartner/${universityPartners.id}`, {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('University Partner updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update. Please check your input.');
            },
        });
    };
console.log(data.name);
    return (
        <AppLayout>
            <div className="px-4">
                <h1 className="mb-4 text-2xl font-bold">Edit University Partner</h1>
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

                    <div>
                        <Label htmlFor="link">Link</Label>
                        <Input
                            id="link"
                            value={data.link}
                            onChange={(e) => setData('link', e.target.value)}
                        />
                        {errors.link && <p className="text-sm text-red-500">{errors.link}</p>}
                    </div>

                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                        />
                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        {universityPartners.image && (
                            <img
                                src={`/storage/${universityPartners.image}`}
                                alt="Current"
                                className="mt-2 w-48 rounded"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Link href="/universitypartner">
                            <Button variant="outline">← Back</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
