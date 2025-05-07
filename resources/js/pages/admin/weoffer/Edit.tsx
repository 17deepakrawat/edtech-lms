import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm } from '@inertiajs/react';
import { Textarea } from '@/components/ui/Textarea';

import { title } from 'process';
import { toast } from 'sonner';

interface weoffers {
    id: number;
    title: string;
    description: string;
    link:string;
    image: string;
}

interface Props {
    weoffers: weoffers;
}

export default function Edit({ weoffers }: Props) {
    console.log(weoffers);
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: weoffers.title || '',
        description: weoffers.description || '',
        link: weoffers.link || '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('link', data.link);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(`/weoffers/${weoffers.id}`, {
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

    return (
        <AppLayout>
            <div className="px-4">
                <h1 className="mb-4 text-2xl font-bold">Edit University Partner</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
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
                        {weoffers.image && (
                            <img
                                src={`/storage/${weoffers.image}`}
                                alt="Current"
                                className="mt-2 w-48 rounded"
                            />
                        )}
                    </div>
                    <div className="w-full">
                        <Label htmlFor="name">Description</Label>
                        <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
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
