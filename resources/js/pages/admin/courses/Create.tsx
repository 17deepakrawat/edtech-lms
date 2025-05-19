import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/Textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Create({ departments }) {
    const { data, setData, errors, post, processing } = useForm({
        department_id: '',
        program_id: '',
        name: '',
        short_description: '',
        content: '',
        modes: '',
        duration: '',
        rating: '',
        price: '',
        is_subject: '',
        course_keys: [''],
        faqs: [{ question: '', answer: '' }],
        image: null,
    });

    const [programs, setPrograms] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'course_keys' || key === 'faqs') {
                formData.append(key, JSON.stringify(value));
            } else if (key === 'image' && value instanceof File) {
                formData.append('image', value);
            } else {
                formData.append(key, value);
            }
        });

        post('/courses', {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => toast.success('Course created successfully'),
            onError: () => toast.error('Please check your input and try again.'),
        });
    };

    const fetchPrograms = (department_id) => {
        if (!department_id) return;
        fetch(`/get-program-by-departmnet/${department_id}`)
            .then((res) => res.json())
            .then((data) => {
                setPrograms(data);
                setData('program_id', '');
            })
            .catch(() => setPrograms([]));
    };

    const handleFaqChange = (index, field, value) => {
        const updated = [...data.faqs];
        updated[index][field] = value;
        setData('faqs', updated);
    };

    return (
        <AppLayout>
            <Head title="Create Course" />
            <div className="px-4">
                <h1 className="mb-4 text-2xl font-bold">Create New Course</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Department & Program */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label>Select Department</Label>
                            <Select
                                value={data.department_id}
                                onValueChange={(val) => {
                                    setData('department_id', val);
                                    fetchPrograms(val);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dep) => (
                                        <SelectItem key={dep.id} value={String(dep.id)}>
                                            {dep.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.department_id && <p className="text-sm text-red-500">{errors.department_id}</p>}
                        </div>
                        <div>
                            <Label>Select Program</Label>
                            <Select
                                value={data.program_id}
                                onValueChange={(val) => setData('program_id', val)}
                                disabled={!programs.length}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Program" />
                                </SelectTrigger>
                                <SelectContent>
                                    {programs.map((prog) => (
                                        <SelectItem key={prog.id} value={String(prog.id)}>
                                            {prog.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.program_id && <p className="text-sm text-red-500">{errors.program_id}</p>}
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div>
                        <Label>Course Name</Label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Label>Short Description</Label>
                        <Textarea value={data.short_description} onChange={(e) => setData('short_description', e.target.value)} />
                        {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
                    </div>

                    <div>
                        <Label>Full Description</Label>
                        <RichTextEditor value={data.content} onChange={(content) => setData('content', content)} />
                        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                    </div>

                    {/* Course Meta */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label>Modes</Label>
                            <Select value={data.modes} onValueChange={(value) => setData('modes', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select mode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="month">Month</SelectItem>
                                    <SelectItem value="year">Year</SelectItem>
                                    <SelectItem value="semester">Semester</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.modes && <p className="text-sm text-red-500">{errors.modes}</p>}
                        </div>

                        <div>
                            <Label>Duration</Label>
                            <Input value={data.duration} onChange={(e) => setData('duration', e.target.value)} />
                            {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
                        </div>

                        <div>
                            <Label>Rating</Label>
                            <Input type="number" value={data.rating} onChange={(e) => setData('rating', e.target.value)} />
                            {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                        </div>

                        <div>
                            <Label>Price</Label>
                            <Input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                        </div>

                        <div>
                            <Label>Is Subject?</Label>
                            <Select value={data.is_subject} onValueChange={(val) => setData('is_subject', val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Yes or No" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="1">Yes</SelectItem>
                                    <SelectItem value="0">No</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.is_subject && <p className="text-sm text-red-500">{errors.is_subject}</p>}
                        </div>
                    </div>

                    {/* Course Keys */}
                    <div>
                        <Label>Course Key Points</Label>
                        {data.course_keys.map((key, index) => (
                            <div key={index} className="mb-2 flex items-center gap-2">
                                <Input
                                    value={key}
                                    onChange={(e) => {
                                        const updated = [...data.course_keys];
                                        updated[index] = e.target.value;
                                        setData('course_keys', updated);
                                    }}
                                />
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                        const filtered = data.course_keys.filter((_, i) => i !== index);
                                        setData('course_keys', filtered);
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={() => setData('course_keys', [...data.course_keys, ''])}>
                            + Add Point
                        </Button>
                        {errors.course_keys && <p className="mt-1 text-sm text-red-500">{errors.course_keys}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <Label>Course Image</Label>
                        <Input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0])} />
                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                    </div>

                    {/* FAQs */}
                    <div className="mt-8">
                        <Label>FAQs</Label>
                        <div className="grid grid-cols-1 gap-4">
                            {data.faqs.map((faq, index) => (
                                <div key={index} className="relative space-y-2 rounded-md ">
                                    <div className="flex justify-end">
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => {
                                                const updated = data.faqs.filter((_, i) => i !== index);
                                                setData('faqs', updated);
                                            }}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                    <div>
                                        <Label>Question</Label>
                                        <Input
                                            placeholder="Enter question"
                                            value={faq.question}
                                            onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label>Answer</Label>
                                        <RichTextEditor value={faq.answer} onChange={(content) => handleFaqChange(index, 'answer', content)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button type="button" variant="outline" onClick={() => setData('faqs', [...data.faqs, { question: '', answer: '' }])}>
                                + Add FAQ
                            </Button>
                        </div>
                        {errors.faqs && <p className="mt-1 text-sm text-red-500">{errors.faqs}</p>}
                    </div>

                    {/* Submit */}
                    <div className="mt-4 flex justify-end gap-2">
                        <Link href="/courses">
                            <Button type="button" variant="outline">
                                ← Back
                            </Button>
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
