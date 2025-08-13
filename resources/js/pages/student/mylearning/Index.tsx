import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

type MyCourse = {
    id: number;
    image: string;
    name: string;
    short_description: string;
    slug: string;
    progress?: number; // optional, in case you calculate it later
    description?: string; // optional
};

type MyLearningProps = {
    coursesinfo: MyCourse[];
};

export default function MyLearning({ coursesinfo }: MyLearningProps) {
    return (
        <AppLayout>
            <Head title="My Learning" />
            <div className="mt-20 p-6">
                <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-gray-900">📚 My Learning</h1>

                {coursesinfo.length === 0 ? (
                    <div className="rounded-lg border border-dashed bg-gray-50 p-8 text-center text-gray-500">
                        You haven’t enrolled in any courses yet.
                        <br />
                        Start exploring and begin your learning journey!
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {coursesinfo.map((course) => (
                            <div
                                key={course.id}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Image */}
                                <div className="relative">
                                    <img
                                        src={`/storage/${course.image}`}
                                        alt={course.name}
                                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {course.progress !== undefined && (
                                        <span className="absolute top-3 right-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white shadow-lg">
                                            {course.progress}% Complete
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h2 className="mb-2 text-lg font-semibold text-gray-800 transition-colors group-hover:text-blue-600">
                                        {course.name}
                                    </h2>
                                    <p className="mb-4 text-sm text-gray-600">
                                        {course.short_description.length <= 80 ? course.short_description : course.short_description.slice(0, 80)+'...'}
                                    </p>

                                    {/* Progress Bar */}
                                    {course.progress !== undefined && (
                                        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                    )}

                                    {/* Button */}
                                    <Link
                                        href={`/courses-video/${course.slug}`}
                                        className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-800"
                                    >
                                        Continue Learning
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
