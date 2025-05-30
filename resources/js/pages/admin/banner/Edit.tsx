import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import RichTextEditor from '@/components/ui/RichTextEditor'; // ✅ Import RichTextEditor

interface Banner {
    id: number;
    title: string;
    description: string;
    bannerimage: string;
}

interface Props {
    banner: Banner;
}

export default function Edit({ banner }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: banner.title,
        description: banner.description,
        bannerimage: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        if (data.bannerimage) formData.append('bannerimage', data.bannerimage);

        post(`/banner/${banner.id}`, {
            data: formData,
            preserveState: true,
            onSuccess: () => {
                toast.success('Banner updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update banner. Please try again.');
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Banner" />
            <div className="w-full space-y-6 p-4">
                <h1 className="text-2xl font-bold">Edit Banner</h1>

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
                        <Label htmlFor="description">Description</Label>
                        <RichTextEditor
                            value={data.description}
                            onChange={(val) => setData('description', val)}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="bannerimage">Update Image (optional)</Label>
                        <Input
                            id="bannerimage"
                            type="file"
                            onChange={(e) => setData('bannerimage', e.target.files?.[0] || null)}
                        />
                        {errors.bannerimage && (
                            <p className="text-sm text-red-500">{errors.bannerimage}</p>
                        )}
                        {banner.bannerimage && (
                            <img
                                src={`/storage/${banner.bannerimage}`}
                                alt="Current Banner"
                                className="mt-2 h-auto w-48 rounded"
                            />
                        )}
                    </div>

                    <div className="justify-end flex">
                        <Link href="/banner">
                            <Button variant="outline">← Back</Button>
                        </Link>
                        <Button type="submit" className="ms-2" disabled={processing}>
                            {processing ? 'Updating...' : 'Update'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
