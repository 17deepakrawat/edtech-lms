import '@/web-component/categoryTab/CategoryTab.css';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CourseCard from '../CourseCard';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/web-component/categoryTab/CategoryTab.css';
interface CategoryTabProps {
    categoryData: Record<string, Record<string, any[]>>;
}

export default function CategoryTab({ categoryData }: CategoryTabProps) {
    const departments = Object.keys(categoryData || {});
    const [activeDepartment, setActiveDepartment] = useState<string>('');
    const [activeProgram, setActiveProgram] = useState<string>('');

    useEffect(() => {
        if (departments.length > 0 && !activeDepartment) {
            setActiveDepartment(departments[0]);
        }
    }, [departments]);

    const programs = activeDepartment && typeof categoryData[activeDepartment] === 'object'
        ? Object.keys(categoryData[activeDepartment] || {})
        : [];

    useEffect(() => {
        if (programs.length > 0 && (!activeProgram || !programs.includes(activeProgram))) {
            setActiveProgram(programs[0]);
        } else if (programs.length === 0) {
            setActiveProgram('');
        }
    }, [activeDepartment, programs]);

    const courses =
        activeDepartment &&
        activeProgram &&
        categoryData[activeDepartment] &&
        Array.isArray(categoryData[activeDepartment][activeProgram])
            ? categoryData[activeDepartment][activeProgram]
            : [];
    return (
        <div className="container">
            <p className="custom_title mb-5 text-center">Category Courses</p>

            {/* Departments */}
            <div className="px-8 relative">
                <button className="dept-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400">
                    ‹
                </button>
                <button className="dept-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400">
                    ›
                </button>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={15}
                    slidesPerView="auto"
                    navigation={{ prevEl: '.dept-swiper-prev', nextEl: '.dept-swiper-next' }}
                >
                    {departments.map((dept) => (
                        <SwiperSlide key={dept} className="sswiper-slide">
                            <button
                                onClick={() => setActiveDepartment(dept)}
                                className={`rounded-t px-4 py-2 text-sm font-medium ${
                                    activeDepartment === dept ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
                                }`}
                            >
                                {dept} ({Object.keys(categoryData[dept] || {}).reduce((count, prog) => count + (categoryData[dept][prog]?.length || 0), 0)})
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Programs */}
            <div className="px-8 mt-4 relative">
                <button className="program-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400">
                    ‹
                </button>
                <button className="program-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400">
                    ›
                </button>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={15}
                    slidesPerView="auto"
                    navigation={{ prevEl: '.program-swiper-prev', nextEl: '.program-swiper-next' }}
                >
                    {programs.map((program) => (
                        <SwiperSlide key={program} className="sswiper-slide">
                            <button
                                onClick={() => setActiveProgram(program)}
                                className={`rounded-full px-4 py-2 text-sm font-medium ${
                                    activeProgram === program ? 'bg-customgreen-600 text-white' : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {program} ({categoryData[activeDepartment]?.[program]?.length || 0})
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Courses */}
            <motion.div
                key={activeProgram}
                className="mt-6 rounded-lg bg-white sm:p-6 dark:bg-gray-900 relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {courses.length > 0 ? (
                    <>
                        <button className="swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400">
                            ‹
                        </button>
                        <button className="swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-300 rounded-full hover:bg-gray-400">
                            ›
                        </button>

                        <Swiper
                            modules={[Autoplay, Navigation]}
                            spaceBetween={15}
                            navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                450: { slidesPerView: 2 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1300: { slidesPerView: 3.5 },
                            }}
                        >
                            {courses.map((course: any) => (
                                <SwiperSlide key={course.id} className="p-4 ">
                                    <CourseCard courses={course} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                ) : (
                    <p className="text-center text-red-500">No courses found.</p>
                )}
            </motion.div>
        </div>
    );
}
