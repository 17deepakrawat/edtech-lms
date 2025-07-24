import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/ui/RichTextEditor'; // ✅ import the rich text editor
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.image) formData.append('image', data.image);

        post('/weoffers', {
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
            <Head title="What We Offer" />
            <div className="px-4">
                <h1 className="mb-4 text-2xl font-bold">Create What We Offer</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="w-full">
                        <Label htmlFor="name">Title</Label>
                        <Input id="name" value={data.title} onChange={(e) => setData('title', e.target.value)} />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div className="w-full">
                        <Label htmlFor="image">Image</Label>
                        <Input id="image" type="file" onChange={(e) => setData('image', e.target.files?.[0] || null)} />
                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                    </div>

                    <div className="w-full">
                        <Label htmlFor="description">Description</Label>
                        <RichTextEditor
                            value={data.description}
                            onChange={(content) => setData('description', content)}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link href="/weoffers">
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
