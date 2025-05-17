import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Create({ blogCategories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        author_name: '',
        author_image: null,
        image: null,
        content: '',
        faq: [{ question: '', answer: '' }],
        blog_category_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'faq') {
                formData.append(key, JSON.stringify(value));
            } else if ((key === 'image' || key === 'author_image') && value) {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        });

        post('/adminblogs', {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => toast.success('Blog created successfully'),
        });
    };

    return (
        <AppLayout>
            <Head title="Create Blog" />
            <div className="px-4">
                <h1 className="mb-4 text-2xl font-bold">Create New Blog</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label>Blog Category</Label>
                        <Select value={data.blog_category_id} onValueChange={(val) => setData('blog_category_id', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {blogCategories.map((cat) => (
                                    <SelectItem key={cat.id} value={String(cat.id)}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.blog_category_id && <p className="text-sm text-red-500">{errors.blog_category_id}</p>}
                    </div>
                    <div>
                        <Label>Blog Title</Label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Label>Author Name</Label>
                        <Input value={data.author_name} onChange={(e) => setData('author_name', e.target.value)} />
                        {errors.author_name && <p className="text-sm text-red-500">{errors.author_name}</p>}
                    </div>

                    <div>
                        <Label>Author Image</Label>
                        <Input type="file" onChange={(e) => setData('author_image', e.target.files[0])} />
                        {errors.author_image && <p className="text-sm text-red-500">{errors.author_image}</p>}
                    </div>

                    <div>
                        <Label>Blog Image</Label>
                        <Input type="file" onChange={(e) => setData('image', e.target.files[0])} />
                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                    </div>

                    <div>
                        <Label>Blog Content</Label>
                        <Textarea value={data.content} onChange={(e) => setData('content', e.target.value)} />
                        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                    </div>

                    <div className="mt-8">
                        <Label>FAQs</Label>
                        <div className="grid gap-4">
                            {data.faq.map((faq, index) => (
                                <div key={index} className="relative space-y-2 ">
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                setData(
                                                    'faq',
                                                    data.faq.filter((_, i) => i !== index),
                                                )
                                            }
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                    <div>
                                        <Label>Question</Label>
                                        <Input
                                            value={faq.question}
                                            onChange={(e) => {
                                                const updated = [...data.faq];
                                                updated[index].question = e.target.value;
                                                setData('faq', updated);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <Label>Answer</Label>
                                        <Textarea
                                            value={faq.answer}
                                            onChange={(e) => {
                                                const updated = [...data.faq];
                                                updated[index].answer = e.target.value;
                                                setData('faq', updated);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4">
                            <Button type="button" variant="outline" onClick={() => setData('faq', [...data.faq, { question: '', answer: '' }])}>
                                + Add FAQ
                            </Button>
                        </div>
                        {errors.faq && <p className="text-sm text-red-500">{errors.faq}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Link href="/blogs">
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
