import AppLayout from '@/layouts/app-layout';
import Enroll from '@/web-component/enroll/Enroll';
import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent, useRef, useState } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { toast } from 'sonner';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
type Course = {
    id: number | string;
    course_name?: string;
    name?: string;
    duration: string;
    rating?: number;
    image?: string;
    slug?: string;
    price?: number;
    short_description?: string;
    video_duration?: string;
    progress?: number;
};

type EnrollCourse = {};

type StudentDashboardProps = {
    student_info: {
        name: string;
        email: string;
        dob: string;
        phone_no: string;
        address: string;
        user_profile_pic?: string;
    };
    mycourses: Course[];
    relatedCourses: Course[];
    enroll_status: EnrollCourse[];
};

export default function StudentDashboard({ student_info, mycourses, relatedCourses, enroll_status }: StudentDashboardProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const swiperRef = useRef<any>(null);

    const { data, setData, post, processing, reset } = useForm({
        profile_img: null as File | null,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const renderStars = (rating: number) => {
        const stars = [];
        if (rating !== 0) {
            for (let i = 1; i <= 5; i++) {
                if (rating >= i) {
                    stars.push(<FaStar key={i} className="text-yellow-400" />);
                } else if (rating >= i - 0.5) {
                    stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
                } else {
                    stars.push(<FaRegStar key={i} className="text-gray-300" />);
                }
            }
        }
        return stars;
    };

    const handleImageChange = (field: 'profile_img') => (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData(field, file);
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        post('/student/update-profile-image', {
            onSuccess: () => {
                toast.success('Profile updated successfully');
                setIsModalOpen(false);
                reset();
            },
            onError: () => {
                toast.error('Failed to update profile');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/student/dashboard' }]}>
            <Head title="Dashboard" />
            <div className="container mt-20 space-y-8 p-6">
                {/* Profile section */}
                <section className="flex items-center gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                    <div className="relative">
                        <img
                            src={selectedImage || `/storage/${student_info.user_profile_pic}` || 'https://i.pravatar.cc/150?u=deepak'}
                            alt="Profile"
                            className="h-20 w-20 rounded-full border-2 border-blue-500 object-cover"
                        />
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="absolute right-0 bottom-0 rounded-full shadow-md"
                            title="Edit Profile Picture"
                        >
                            <FiEdit size={16} className='text-gray-500' />
                        </button>
                    </div>

                    <div>
                        <h1 className="text-3xl font-semibold">Hello, {student_info.name}!</h1>
                        <p className="text-gray-600">
                            DOB: {student_info.dob} | Email: {student_info.email} | Number: {student_info.phone_no}
                        </p>
                        <p className="text-gray-600">Address: {student_info.address}</p>
                    </div>
                </section>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                            <h2 className="mb-4 text-xl font-semibold">Update Profile Picture</h2>
                            <form onSubmit={handleSave} className="space-y-6">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange('profile_img')}
                                    className="mb-4 w-full rounded border p-2"
                                />
                                {selectedImage && <img src={selectedImage} alt="Preview" className="mb-4 h-32 w-32 rounded-full object-cover" />}
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* My Courses */}
                <section>
                    <h2 className="mb-3 text-2xl font-semibold">My Courses</h2>
                    <div className="mb-3 flex flex-wrap">
                        {mycourses.map((course, index) => (
                            <h3
                                key={course.id}
                                className="clickslide me-3 cursor-pointer rounded-sm border border-gray-300 px-3 py-1 text-xl font-bold shadow"
                                onClick={() => swiperRef.current?.slideTo(index)}
                            >
                                {course.course_name}
                            </h3>
                        ))}
                    </div>

                    {mycourses.length > 0 ? (
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={10}
                            pagination={{ clickable: true }}
                            className="mb-4 h-[230px]"
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                        >
                            {mycourses.map((course) => (
                                <SwiperSlide key={course.id} className="relative h-[230px] overflow-hidden rounded-lg">
                                    <div
                                        className="absolute inset-0 h-[230px] bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url('${
                                                course.image ? `/storage/${course.image}` : 'https://via.placeholder.com/600x400'
                                            }')`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
                                    </div>
                                    <div className="relative z-10 flex h-full flex-row items-end justify-between p-4 text-white">
                                        <div>
                                            {course.rating !== undefined && (
                                                <div className="mb-1 flex items-center gap-2">
                                                    <p className="text-sm font-semibold">{course.rating}/5</p>
                                                    <div className="flex space-x-1">{renderStars(course.rating)}</div>
                                                </div>
                                            )}
                                            <h3 className="text-xl font-bold">{course.course_name}</h3>
                                            <p className="text-sm">Duration: {course.duration}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="mb-1 text-sm">Progress</p>
                                            <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-300">
                                                <div
                                                    className="h-2 rounded-full bg-green-500"
                                                    style={{
                                                        width: `${course.progress || 0}%`,
                                                    }}
                                                />
                                            </div>
                                            <span className="mt-1 text-xs">{course.progress || 0}%</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p className="text-gray-500">You have no enrolled courses.</p>
                    )}
                </section>

                {/* Related Courses */}
                {relatedCourses.length > 0 && (
                    <section>
                        <h2 className="mb-2 text-2xl font-semibold">Other Courses</h2>
                        <Swiper
                            modules={[Pagination]}
                            spaceBetween={10}
                            slidesPerView={4}
                            pagination={{ clickable: true }}
                            className="mb-4 max-h-[400px] min-h-[150px]"
                        >
                            {relatedCourses.map((course) => (
                                <SwiperSlide key={course.id} className="relative max-h-[400px] min-h-[180px] overflow-hidden rounded-lg">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url('${
                                                course.image ? `/storage/${course.image}` : 'https://via.placeholder.com/600x400'
                                            }')`,
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
                                    </div>
                                    <div className="relative z-10 flex flex-col max-h-[400px] min-h-[180px] justify-end p-4 text-white">
                                        {course.rating !== undefined && (
                                            <div className="mb-1 flex items-center gap-2">
                                                <p className="text-sm font-semibold">{course.rating}/5</p>
                                                <div className="flex space-x-1">{renderStars(course.rating)}</div>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-lg font-bold">{course.name || course.course_name}</h3>
                                                <p className="text-sm">Duration: {course.duration}</p>
                                            </div>
                                            <Enroll
                                                enrollCourse={{
                                                    price: course.price ?? null,
                                                    image: course.image ?? null,
                                                    name: course.name ?? null,
                                                    short_description: course.short_description ?? null,
                                                    id: course.id ?? null,
                                                    duration: course.duration ?? null,
                                                    video_duration: course.video_duration ?? null,
                                                }}
                                                enrollStatus={enroll_status ?? 0}
                                                bgStudeantPay={'student related course'}
                                            />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                )}
            </div>
        </AppLayout>
    );
}
