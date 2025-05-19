// Imports
import AppLayout from '@/layouts/app-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/Textarea';
import RichTextEditor from '@/components/ui/RichTextEditor';
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
import { FormEvent, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Types
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
  faq: FaqItem[] | string;
};

type EditProps = {
  blog: BlogProps;
  blogCategories: BlogCategory[];
};

export default function Edit({ blog, blogCategories }: EditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parsedFaq: FaqItem[] = Array.isArray(blog.faq)
    ? blog.faq
    : JSON.parse(blog.faq || '[]');

  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    name: blog.name || '',
    author_name: blog.author_name || '',
    blog_category_id: blog.blog_category_id?.toString() || '',
    author_image: null as File | null,
    image: null as File | null,
    content: blog.content || '',
    faq: parsedFaq.length ? parsedFaq : [{ question: '', answer: '' }],
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
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

      await post(`/adminblogs/${blog.id}`, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Blog updated successfully');
          setIsSubmitting(false);
        },
        onError: () => {
          toast.error('Update failed. Please check your input.');
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      toast.error('An unexpected error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <Head title="Edit Blog" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Blog</h1>
          <Link href="/blogs">
            <Button variant="outline">← Back to Blogs</Button>
          </Link>
        </div>

        <Card className="border-0 p-0 m-0 shadow-none">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category and Title */}
            <div className="grid gap-6 md:grid-cols-2">
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
                  <p className="mt-1 text-sm text-red-500">{errors.blog_category_id}</p>
                )}
              </div>

              <div>
                <Label>Blog Title</Label>
                <Input
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  placeholder="Enter blog title"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Author Name and Image */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label>Author Name</Label>
                <Input
                  value={data.author_name}
                  onChange={(e) => setData('author_name', e.target.value)}
                  placeholder="Enter author name"
                />
                {errors.author_name && (
                  <p className="mt-1 text-sm text-red-500">{errors.author_name}</p>
                )}
              </div>

              <div>
                <Label>Change Author Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData('author_image', e.target.files?.[0] ?? null)}
                />
                {errors.author_image && (
                  <p className="mt-1 text-sm text-red-500">{errors.author_image}</p>
                )}
                {blog.author_image && (
                  <img
                    src={`/storage/${blog.author_image}`}
                    className="mt-2 h-32 w-32 rounded-lg object-cover"
                    alt="Author"
                  />
                )}
              </div>
            </div>

            {/* Blog Image */}
            <div>
              <Label>Change Blog Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
              {blog.image && (
                <img
                  src={`/storage/${blog.image}`}
                  className="mt-2 h-48 w-full rounded-lg object-cover"
                  alt="Blog"
                />
              )}
            </div>

            {/* Blog Content */}
            <div>
              <Label>Blog Content</Label>
              <RichTextEditor
                value={data.content}
                onChange={(content) => setData('content', content)}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">{errors.content}</p>
              )}
            </div>

            {/* FAQs */}
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between ">
                <Label className="text-lg font-semibold">FAQs</Label>
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

              <div className="grid gap-4">
                {data.faq.map((faq, index) => (
                  <Card key={index} className="shadow-none border-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">FAQ #{index + 1}</h3>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const updated = [...data.faq];
                          updated.splice(index, 1);
                          setData('faq', updated);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label>Question</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...data.faq];
                            updated[index].question = e.target.value;
                            setData('faq', updated);
                          }}
                          placeholder="Enter your question"
                        />
                      </div>
                      <div>
                        <Label>Answer</Label>
                        <RichTextEditor
                          value={faq.answer}
                          onChange={(content) => {
                            const updated = [...data.faq];
                            updated[index].answer = content;
                            setData('faq', updated);
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {errors.faq && (
                <p className="mt-2 text-sm text-red-500">{errors.faq}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={processing || isSubmitting}>
                {processing || isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Blog'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
