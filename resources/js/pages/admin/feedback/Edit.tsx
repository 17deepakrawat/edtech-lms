import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner'; // ✅ Import from sonner

interface Feedbacks {
    id: number;
    name: string;
    title: string;
    description: string;
    image: string;
}

interface Props {
    feedbacks: Feedbacks;
}

export default function Edit({ feedbacks }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: feedbacks.name || '',
        title: feedbacks.title || '',
        description: feedbacks.description || '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(`/feedback/${feedbacks.id}`, {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Feedback updated successfully!'); // Success toast
            },
            onError: () => {
                toast.error('Failed to update feedback. Please try again.'); // Error toast
            }
        });
    };

    return (
        <AppLayout>
            <div className="px-4">
                <h1 className="text-2xl font-bold mb-4">Edit Feedback</h1>
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
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={(e) => setData('image', e.target.files?.[0] || null)}
                        />
                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        {feedbacks.image && (
                            <img
                                src={`/storage/${feedbacks.image}`}
                                alt="Current"
                                className="mt-2 w-48 rounded"
                            />
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Link href="/feedback">
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
