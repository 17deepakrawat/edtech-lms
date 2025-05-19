import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Head, Link, useForm } from '@inertiajs/react';
import RichTextEditor from '@/components/ui/RichTextEditor'; // ✅ Rich Text Editor

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        name: '',
        description: '',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.image) formData.append('image', data.image);

        post('/feedback', {
            data: formData,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Feedback created successfully');
            },
            onError: () => {
                toast.error('Please check your input and try again.');
            }
        });
    };

    return (
        <AppLayout>
            <div className="px-4">
                <h1 className="text-2xl font-bold">Create New Banner</h1>

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
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <RichTextEditor
                            value={data.description}
                            onChange={(val) => setData('description', val)}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="image">Banner Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={e => setData('image', e.target.files?.[0] || null)}
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    <div className="justify-end flex">
                        <Link href="/banner">
                            <Button variant="outline">← Back</Button>
                        </Link>
                        <Button className="ms-3" type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
