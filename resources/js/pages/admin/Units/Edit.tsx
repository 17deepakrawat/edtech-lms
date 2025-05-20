import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Course {
    id: number;
    name: string;
}

interface Unit {
    id: number;
    course_id: number;
    title: string;
    order: number;
    status: boolean;
    course: Course;
}

interface EditProps {
    unit: Unit;
    courses: Course[];
    onClose: () => void;
    onSuccess: (unit: Unit) => void;
}

export default function Edit({ unit, courses, onClose, onSuccess }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        course_id: unit.course_id.toString(),
        title: unit.title,
        order: unit.order.toString(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/units/${unit.id}`, {
            onSuccess: (page: any) => {
                const updatedUnit = page.props.unit as Unit;
                onSuccess(updatedUnit);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="course_id">Course</Label>
                <Select
                    value={data.course_id}
                    onValueChange={(value) => setData('course_id', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id.toString()}>
                                {course.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.course_id && <p className="text-sm text-red-500">{errors.course_id}</p>}
            </div>

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
                <Label htmlFor="order">Order</Label>
                <Input
                    id="order"
                    type="number"
                    value={data.order}
                    onChange={(e) => setData('order', e.target.value)}
                />
                {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    Update Unit
                </Button>
            </div>
        </form>
    );
} 