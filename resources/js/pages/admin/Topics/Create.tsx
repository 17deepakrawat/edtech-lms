import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Page } from '@inertiajs/core';

interface Course {
    id: number;
    name: string;
}

interface Unit {
    id: number;
    course_id: number;
    title: string;
    course: Course;
}

interface Topic {
    id: number;
    unit_id: number;
    name: string;
    status: boolean;
    unit: Unit;
}

interface PageProps {
    topics: {
        data: Topic[];
    };
}

interface CreateProps {
    units: Unit[];
    onClose: () => void;
    onSuccess: (topic: Topic) => void;
}

export default function Create({ units, onClose, onSuccess }: CreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        unit_id: '',
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/topics', {
            onSuccess: (page: Page<PageProps>) => {
                const newTopic = page.props.topics.data[0];
                onSuccess(newTopic);
                reset();
                toast.success('Topic created successfully');
            },
            onError: (errors) => {
                toast.error('Failed to create topic. Please check the form.');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="unit_id">Unit</Label>
                <Select
                    value={data.unit_id}
                    onValueChange={(value) => setData('unit_id', value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {units.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id.toString()}>
                                {unit.title} - {unit.course.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.unit_id && <p className="mt-1 text-sm text-red-500">{errors.unit_id}</p>}
            </div>

            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full"
                    placeholder="Enter topic name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing ? 'Creating...' : 'Create Topic'}
                </Button>
            </div>
        </form>
    );
} 