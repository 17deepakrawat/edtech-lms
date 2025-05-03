import '@/web-component/categoryTab/CategoryTab.css';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CourseCard from '../CourseCard';
const data: Record<string, Record<string, any[]>> = {
    Science: {
        BSc: [
            { img: '/build/assets/web-assets/course.jpg', duration: '12 Jan 2025', price: '200', courseTitle: 'Physics 101', isEnrolled: false,
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',"rating": 4.5

             },
            { img: '/build/assets/web-assets/course.jpg', duration: '15 Jan 2025', price: '250', courseTitle: 'Chemistry 101', isEnrolled: true,
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',

             },
            { img: '/build/assets/web-assets/course.jpg', duration: '18 Jan 2025', price: '180', courseTitle: 'Biology 101', isEnrolled: false,
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',

             },
            { img: '/build/assets/web-assets/course.jpg', duration: '20 Jan 2025', price: '300', courseTitle: 'Mathematics 101', isEnrolled: false,
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',

             },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '22 Jan 2025',
                price: '$200',
                courseTitle: 'Computer Science 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',

                isEnrolled: true,
            },
            { img: '/build/assets/web-assets/course.jpg', duration: '25 Jan 2025', price: '$220', courseTitle: 'Geography 101', isEnrolled: false,
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',

             },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '28 Jan 2025',
                price: '$270',
                courseTitle: 'Environmental Science 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
            { img: '/build/assets/web-assets/course.jpg', duration: '30 Jan 2025', price: '$230', courseTitle: 'Astronomy 101', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '2 Feb 2025', price: '$250', courseTitle: 'Genetics 101', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '5 Feb 2025', price: '$210', courseTitle: 'Chemistry 102', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '8 Feb 2025', price: '$180', courseTitle: 'Physics 102', isEnrolled: true },
            { img: '/build/assets/web-assets/course.jpg', duration: '10 Feb 2025', price: '$300', courseTitle: 'Biology 102', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '12 Feb 2025', price: '$230', courseTitle: 'Mathematics 102', isEnrolled: true },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '15 Feb 2025',
                price: '$250',
                courseTitle: 'Computer Science 102',
                isEnrolled: false,
            },
            { img: '/build/assets/web-assets/course.jpg', duration: '18 Feb 2025', price: '$200', courseTitle: 'Geography 102', isEnrolled: false },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '20 Feb 2025',
                price: '$220',
                courseTitle: 'Environmental Science 102',
                isEnrolled: true,
            },
            { img: '/build/assets/web-assets/course.jpg', duration: '23 Feb 2025', price: '$280', courseTitle: 'Astronomy 102', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '25 Feb 2025', price: '$260', courseTitle: 'Genetics 102', isEnrolled: true },
            { img: '/build/assets/web-assets/course.jpg', duration: '28 Feb 2025', price: '$290', courseTitle: 'Physics 103', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '2 Mar 2025', price: '$200', courseTitle: 'Chemistry 103', isEnrolled: false },
        ],
        MSc: [
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '10 Feb 2025',
                price: '$300',
                courseTitle: 'Advanced Physics',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: false,
            },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '12 Feb 2025',
                price: '$350',
                courseTitle: 'Quantum Mechanics',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: false,
            },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '15 Feb 2025',
                price: '$320',
                courseTitle: 'Advanced Chemistry',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '18 Feb 2025',
                price: '$330',
                courseTitle: 'Organic Chemistry',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: false,
            },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '20 Feb 2025',
                price: '$310',
                courseTitle: 'Molecular Biology',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
            { img: '/build/assets/web-assets/course.jpg', duration: '23 Feb 2025', price: '$340', courseTitle: 'Astrophysics', isEnrolled: false },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '25 Feb 2025',
                price: '$360',
                courseTitle: 'Computational Science',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
            { img: '/build/assets/web-assets/course.jpg', duration: '28 Feb 2025', price: '$380', courseTitle: 'Ecology', isEnrolled: false },
        ],
        BA: [
            { img: '/build/assets/web-assets/course.jpg', duration: '18 Mar 2025', price: '$150', courseTitle: 'History 101', isEnrolled: false },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '20 Mar 2025',
                price: '$170',
                courseTitle: 'Political Science 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '25 Mar 2025',
                price: '$190',
                courseTitle: 'English Literature 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: false,
            },
            { img: '/build/assets/web-assets/course.jpg', duration: '30 Mar 2025', price: '$180', courseTitle: 'Art History 101', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '2 Apr 2025', price: '$160', courseTitle: 'Psychology 101', isEnrolled: true },
            { img: '/build/assets/web-assets/course.jpg', duration: '5 Apr 2025', price: '$150', courseTitle: 'Sociology 101', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '10 Apr 2025', price: '$180', courseTitle: 'Anthropology 101', isEnrolled: true },
        ],
    },
    Arts: {
        BA: [
            { img: '/build/assets/web-assets/course.jpg', duration: '20 Jan 2025', price: '$180', courseTitle: 'Sociology 101', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '22 Jan 2025', price: '$210', courseTitle: 'Anthropology 101', isEnrolled: true },
            { img: '/build/assets/web-assets/course.jpg', duration: '25 Jan 2025', price: '$200', courseTitle: 'History 101', isEnrolled: false },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '30 Jan 2025',
                price: '$220',
                courseTitle: 'English Literature 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
        ],
        MA: [
            { img: '/build/assets/web-assets/course.jpg', duration: '15 Feb 2025', price: '$220', courseTitle: 'Philosophy 101', isEnrolled: true },
            { img: '/build/assets/web-assets/course.jpg', duration: '20 Feb 2025', price: '$240', courseTitle: 'History 201', isEnrolled: false },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '25 Feb 2025',
                price: '$250',
                courseTitle: 'Political Science 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
        ],
    },
    Commerce: {
        BCom: [
            { img: '/build/assets/web-assets/course.jpg', duration: '25 Mar 2025', price: '$200', courseTitle: 'Accounting 101', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '28 Mar 2025', price: '$220', courseTitle: 'Finance 101', isEnrolled: true },
            { img: '/build/assets/web-assets/course.jpg', duration: '2 Apr 2025', price: '$240', courseTitle: 'Economics 101', isEnrolled: false },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '5 Apr 2025',
                price: '$260',
                courseTitle: 'Business Management 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: true,
            },
        ],
        MCom: [
            { img: '/build/assets/web-assets/course.jpg', duration: '5 Apr 2025', price: '$250', courseTitle: 'Economics 101', isEnrolled: false },
            { img: '/build/assets/web-assets/course.jpg', duration: '10 Apr 2025', price: '$270', courseTitle: 'Taxation 101', isEnrolled: true },
            {
                img: '/build/assets/web-assets/course.jpg',
                duration: '12 Apr 2025',
                price: '$290',
                courseTitle: 'Business Analytics 101',
                courseDescription:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                isEnrolled: false,
            },
        ],
    },
};

export default function CategoryTab() {
    const departments = Object.keys(data || {});
    const [activeDept, setActiveDept] = useState(departments[0]);
    const [activeProgram, setActiveProgram] = useState(Object.keys(data[activeDept] || {})[0]);

    const deptWrapperRef = useRef<HTMLDivElement>(null);
    const programWrapperRef = useRef<HTMLDivElement>(null);
    const [showDeptNav, setShowDeptNav] = useState(false);
    const [showProgramNav, setShowProgramNav] = useState(false);

    useEffect(() => {
        const programs = Object.keys(data[activeDept] || {});
        if (programs.length > 0) {
            setActiveProgram(programs[0]);
        } else {
            setActiveProgram('');
        }
    }, [activeDept]);

    useEffect(() => {
        const checkOverflow = (ref: React.RefObject<HTMLElement>, setNav: (val: boolean) => void) => {
            const el = ref.current;
            if (el) {
                setNav(el.scrollWidth > el.clientWidth);
            }
        };

        const handleResize = () => {
            checkOverflow(deptWrapperRef, setShowDeptNav);
            checkOverflow(programWrapperRef, setShowProgramNav);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const courses = data[activeDept]?.[activeProgram] || [];

    return (
        <div className="container">
            {/* Department Swiper */}
            <p className="custom_title mb-5 text-center">Category Courses</p>
            <div className="relative" ref={deptWrapperRef}>
                <div className="px-8">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={15}
                        slidesPerView="auto"
                        navigation={{ prevEl: '.dept-swiper-prev', nextEl: '.dept-swiper-next' }}
                        className="mb-2 border-gray-300 px-1 dark:border-gray-700"
                    >
                        {departments.map((dept) => (
                            <SwiperSlide key={dept} className="w-auto" style={{ width: 'fit-content' }}>
                                <button
                                    onClick={() => setActiveDept(dept)}
                                    className={`rounded-t px-4 py-2 text-sm font-medium transition ${
                                        activeDept === dept
                                            ? 'border-b-2 border-blue-600 text-blue-600'
                                            : 'text-gray-500 hover:text-blue-500 dark:text-gray-300'
                                    }`}
                                >
                                    {dept}
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="dept-swiper-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer text-xl">‹</div>
                <div className="dept-swiper-next absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer text-xl">›</div>
            </div>

            {/* Program Swiper */}
            <div className="relative mt-4" ref={programWrapperRef}>
                <div className="px-8">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={15}
                        slidesPerView="auto"
                        navigation={{ prevEl: '.program-swiper-prev', nextEl: '.program-swiper-next' }}
                    >
                        {Object.keys(data[activeDept] || {}).map((program) => (
                            <SwiperSlide key={program} className="w-auto" style={{ width: 'fit-content' }}>
                                <button
                                    onClick={() => setActiveProgram(program)}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                        activeProgram === program
                                            ? 'bg-customgreen-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200'
                                    }`}
                                >
                                    {program}
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="program-swiper-prev absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer text-xl">‹</div>
                <div className="program-swiper-next absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer text-xl">›</div>
            </div>

            {/* Course List */}
            <motion.div
                key={activeProgram}
                className="mt-6 rounded-lg bg-white text-gray-800 sm:p-6 dark:bg-gray-900 dark:text-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {courses.length > 0 ? (
                    <div className="relative w-full">
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            spaceBetween={15}
                            slidesPerView={3}
                            navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                450: {
                                    slidesPerView: 2,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                                1300: {
                                    slidesPerView: 3.5,
                                },
                            }}
                            className="mb-2"
                        >
                           
                            {courses.map((course, index) => (
                                <SwiperSlide key={index} className="w-[100%] p-4 m-0" style={{margin : "0px !important;"}}>
                                    <CourseCard courses={course} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="swiper-prev invisible absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer text-xl sm:visible">‹</div>
                        <div className="swiper-next invisible absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer text-xl sm:visible">
                            ›
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-red-500">No courses found.</p>
                )}
            </motion.div>
        </div>
    );
}
