import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/Textarea';
import AppLayout from '@/layouts/app-layout';
import { Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner'; // ✅ Import from sonner

interface blogCategories {
    id: number;
    name: string;   
}

interface Props {
    blogCategory: blogCategories;
}

export default function Edit({ blogCategory }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: blogCategory.name || '',        
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', data.name);     
        post(`/blogcategories/${blogCategory.id}`, {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Department updated successfully!'); // Success toast
            },
            onError: () => {
                toast.error('Failed to update Department. Please try again.'); // Error toast
            }
        });
    };

    return (
        <AppLayout>
            <div className="px-4">
                <h1 className="text-2xl font-bold mb-4">Edit Blog Category</h1>
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

                    <div className="flex justify-end gap-2">
                        <Link href="/department">
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
