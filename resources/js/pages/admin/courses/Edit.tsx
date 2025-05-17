import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/Textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Edit({ course, departments, programs: initialPrograms }) {
    const isSubjectValue = course.is_subject === 1 || course.is_subject === true || course.is_subject === '1' ? '1' : '0';

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        department_id: course.department_id ? String(course.department_id) : '',
        program_id: course.program_id ? String(course.program_id) : '',
        name: course.name || '',
        short_description: course.short_description || '',
        content: course.content || '',
        modes: course.modes?.toLowerCase() || '',
        duration: course.duration || '',
        rating: course.rating || '',
        price: course.price || '',
        is_subject: isSubjectValue,
        course_keys: Array.isArray(course.course_keys) ? course.course_keys : JSON.parse(course.course_keys || '[]'),
        faqs: Array.isArray(course.faqs) ? course.faqs : JSON.parse(course.faqs || '[]'),
        image: null,
    });

    const [programs, setPrograms] = useState(initialPrograms || []);
    const [previewImage, setPreviewImage] = useState(course.image || '');

    const fetchPrograms = (department_id) => {
        if (!department_id) return;
        fetch(`/get-program-by-department/${department_id}`)
            .then((res) => res.json())
            .then((dataList) => {
                setPrograms(dataList);
                if (!dataList.some((p) => String(p.id) === String(data.program_id))) {
                    setData('program_id', '');
                }
            });
    };

    useEffect(() => {
        if (data.department_id) {
            fetchPrograms(data.department_id);
        }
    }, [data.department_id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'course_keys' || key === 'faqs') {
                formData.append(key, JSON.stringify(value || []));
            } else if (key === 'image' && value) {
                formData.append('image', value);
            } else {
                formData.append(key, value ?? '');
            }
        });

        post(`/courses/${course.id}`, {
            data: formData,
            preserveState: true,
            onSuccess: () => {
                toast.success('Course updated successfully!');
            },
            onError: () => {
                toast.error('Failed to update Course. Please try again.');
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Edit Course" />
            <div className="px-4">
                <h1 className="mb-4 text-2xl font-bold">Edit Course</h1>
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    {/* Department & Program */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label>Select Department</Label>
                            <Select value={data.department_id} onValueChange={(val) => setData('department_id', val)}>
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
                            <Select value={data.program_id} onValueChange={(val) => setData('program_id', val)} disabled={!programs.length}>
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

                    {/* Course Fields */}
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
                        <Textarea value={data.content} onChange={(e) => setData('content', e.target.value)} />
                        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                    </div>

                    <div>
                        <Label>Modes</Label>
                        <Select value={data.modes} onValueChange={(val) => setData('modes', val)}>
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

                    {/* Course Key Points */}
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
                        {errors.course_keys && <p className="text-sm text-red-500">{errors.course_keys}</p>}
                    </div>

                    {/* FAQs */}
                    <div>
                        <Label>FAQs</Label>
                        {data.faqs.map((faq, index) => (
                            <div key={index} className="mb-4 rounded-md  space-y-2">
                                <div>
                                    <Label>Question</Label>
                                    <Input
                                        value={faq.question}
                                        onChange={(e) => {
                                            const updated = [...data.faqs];
                                            updated[index].question = e.target.value;
                                            setData('faqs', updated);
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label>Answer</Label>
                                    <Textarea
                                        value={faq.answer}
                                        onChange={(e) => {
                                            const updated = [...data.faqs];
                                            updated[index].answer = e.target.value;
                                            setData('faqs', updated);
                                        }}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => {
                                        const filtered = data.faqs.filter((_, i) => i !== index);
                                        setData('faqs', filtered);
                                    }}
                                >
                                    Remove FAQ
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setData('faqs', [...data.faqs, { question: '', answer: '' }])}
                        >
                            + Add FAQ
                        </Button>
                        {errors.faqs && <p className="text-sm text-red-500">{errors.faqs}</p>}
                    </div>

                    {/* Course Image */}
                    <div>
                        <Label>Change Course Image</Label>
                        <Input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setData('image', file);
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setPreviewImage(reader.result);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        {previewImage && (
                            <img
                                src={previewImage.startsWith('data:') ? previewImage : `/storage/${previewImage}`}
                                alt="Course Image"
                                className="mt-2 h-32 rounded-lg object-cover"
                            />
                        )}
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        <Link href="/courses">
                            <Button type="button" variant="outline">
                                ← Cancel
                            </Button>
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
