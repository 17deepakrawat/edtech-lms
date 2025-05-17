import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { toast } from 'sonner';
import { FormEvent } from 'react';

// Define types
type BlogCategory = {
  id: number;
  name: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type BlogProps = {
  id: number;
  name: string;
  author_name: string;
  blog_category_id: string | number;
  author_image: string | null;
  image: string | null;
  content: string;
  faq: FaqItem[] | null;
};

type EditProps = {
  blog: BlogProps;
  blogCategories: BlogCategory[];
};

export default function Edit({ blog, blogCategories }: EditProps) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    name: blog.name || '',
    author_name: blog.author_name || '',
    blog_category_id: blog.blog_category_id?.toString() || '',
    author_image: null as File | null,
    image: null as File | null,
    content: blog.content || '',
    faq: Array.isArray(blog.faq) ? blog.faq : [{ question: '', answer: '' }],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'faq') {
        formData.append(key, JSON.stringify(value));
      } else if ((key === 'image' || key === 'author_image') && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value as string);
      }
    });

    post(`/adminblogs/${blog.id}`, {
      data: formData,
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => toast.success('Blog updated successfully'),
      onError: () => toast.error('Update failed. Please check your input.'),
    });
  };

  return (
    <AppLayout>
      <Head title="Edit Blog" />
      <div className="px-4">
        <h1 className="mb-4 text-2xl font-bold">Edit Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Blog Category</Label>
            <Select
              value={data.blog_category_id}
              onValueChange={(val) => setData('blog_category_id', val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {blogCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.blog_category_id && (
              <p className="text-sm text-red-500">{errors.blog_category_id}</p>
            )}
          </div>

          <div>
            <Label>Blog Title</Label>
            <Input
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <Label>Author Name</Label>
            <Input
              value={data.author_name}
              onChange={(e) => setData('author_name', e.target.value)}
            />
            {errors.author_name && (
              <p className="text-sm text-red-500">{errors.author_name}</p>
            )}
          </div>

          <div>
            <Label>Change Author Image</Label>
            <Input
              type="file"
              onChange={(e) => setData('author_image', e.target.files?.[0] ?? null)}
            />
            {errors.author_image && (
              <p className="text-sm text-red-500">{errors.author_image}</p>
            )}
            {blog.author_image && (
              <img
                src={`/storage/${blog.author_image}`}
                className="mt-2 h-24 rounded border"
                alt="Author"
              />
            )}
          </div>

          <div>
            <Label>Change Blog Image</Label>
            <Input
              type="file"
              onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
            />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image}</p>
            )}
            {blog.image && (
              <img
                src={`/storage/${blog.image}`}
                className="mt-2 h-24 rounded border"
                alt="Blog"
              />
            )}
          </div>

          <div>
            <Label>Blog Content</Label>
            <Textarea
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content}</p>
            )}
          </div>

          {/* FAQ Section */}
          <div className="mt-8">
            <Label>FAQs</Label>
            <div className="grid gap-4">
              {data.faq.map((faq, index) => (
                <div key={index} className="relative space-y-2 border p-3 rounded-md">
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const filtered = data.faq.filter((_, i) => i !== index);
                        setData('faq', filtered);
                      }}
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
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setData('faq', [...data.faq, { question: '', answer: '' }])
                }
              >
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
              {processing ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
