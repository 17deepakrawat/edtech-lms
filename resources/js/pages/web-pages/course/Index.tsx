// 'use client';

import WebLayouts from '@/layouts/web-layout';
import CourseCard from '@/web-component/CourseCard';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from "lucide-react";

export default function CourseIndex() {
    const minPrice = 0;
    const maxPrice = 1000;

    const [price, setPrice] = useState(maxPrice);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const courseData = {
        Science: {
            BSc: [
                {
                    img: '/build/assets/web-assets/course.jpg',
                    duration: '12 Jan 2025',
                    price: 200,
                    courseTitle: 'Physics 101',
                    isEnrolled: false,
                    courseDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                    rating: 4.5,
                    department: 'Science',
                },
                {
                    img: '/build/assets/web-assets/course.jpg',
                    duration: '15 Jan 2025',
                    price: 250,
                    courseTitle: 'Chemistry 101',
                    isEnrolled: true,
                    courseDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                    department: 'Science',
                },
                {
                    img: '/build/assets/web-assets/course.jpg',
                    duration: '18 Jan 2025',
                    price: 180,
                    courseTitle: 'Biology 101',
                    isEnrolled: false,
                    courseDescription: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis beatae quod nemo laboriosam vero vel animi ullam doloremque itaque! Deleniti?',
                    department: 'Science',
                },
            ],
            MSc: [
                {
                    img: '/build/assets/web-assets/course.jpg',
                    duration: '12 Jan 2025',
                    price: 200,
                    courseTitle: 'Physics 201',
                    isEnrolled: false,
                    courseDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, voluptas.',
                    rating: 4.7,
                    department: 'Science',
                },
                {
                    img: '/build/assets/web-assets/course.jpg',
                    duration: '15 Jan 2025',
                    price: 250,
                    courseTitle: 'Chemistry 201',
                    isEnrolled: true,
                    courseDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, voluptas.',
                    department: 'Science',
                },
            ],
        },
        Arts: {
            BA: [],
            MA: [],
        },
        Commerce: {
            BCom: [],
            MCom: [],
        },
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedDepartments((prev) => [...prev, value]);
        } else {
            setSelectedDepartments((prev) => prev.filter((dept) => dept !== value));
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filterCourses = (courses: any[]) => {
        return courses.filter((course) => {
            const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(`${course.department}-${course.level}`);
            const matchesPrice = course.price <= price;
            const matchesSearch = course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesDepartment && matchesPrice && matchesSearch;
        });
    };

    const allCourses = Object.keys(courseData).reduce((acc: any[], program) => {
        Object.keys(courseData[program]).forEach((level) => {
            acc.push(
                ...courseData[program][level].map((course: any) => ({
                    ...course,
                    program,
                    level,
                    department: program,
                }))
            );
        });
        return acc;
    }, []);

    const filteredCourses = filterCourses(allCourses);

    return (
        <WebLayouts>
            <div className="container-fluid">
                <div className="pt-25 pb-5 sm:pt-25 sm:pb-5">
                    {/* Breadcrumb */}
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                                <svg
                                            className="me-2.5 h-3 w-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                        </svg>
                                           Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="ms-1 text-sm font-bold text-gray-700 hover:text-blue-600">
                                        Courses
                                    </span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-5">
                    {/* Left Sidebar */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <p className="mb-3.5 text-2xl font-bold">All Category</p>

                        <div className="max-h-96 space-y-4 overflow-y-auto">
                            {Object.keys(courseData).map((program, index) => (
                                <details key={index} className="group rounded-lg border ">
                                    <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-700 hover:bg-gray-100">
                                        <span className="text-sm font-medium">{program}</span>
                                        <svg
                                            className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="max-h-60 overflow-y-auto bg-white   p-4">
                                        <ul className="space-y-2">
                                            {Object.keys(courseData[program]).map((level, idx) => (
                                                <li key={idx} className="flex items-center space-x-2">
                                                    <input
                                                        id={`${program}-${level}`}
                                                        type="checkbox"
                                                        value={`${program}-${level}`}
                                                        onChange={handleDepartmentChange}
                                                        className="h-4 w-4 rounded border-gray-300"
                                                    />
                                                    <label htmlFor={`${program}-${level}`} className="text-sm text-gray-700">
                                                        {level}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            ))}
                        </div>

                        {/* Price Filter */}
                        <div className="mt-6 w-full rounded-lg bg-white dark:bg-black dark:border-gray dark:border-1 p-4 shadow-md ">
                            <h2 className="mb-4 text-lg font-semibold text-gray-700">Filter by Price</h2>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={price}
                                onChange={handleSliderChange}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                            />
                            <div className="mt-2 flex justify-between text-sm text-gray-600">
                                <span>₹{minPrice}</span>
                                <span>₹{price}</span>
                                <span>₹{maxPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3 lg:col-span-4">
                        {/* Search Bar */}
                        <div className="pb-6">
                            <form className="flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Search courses..."
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-customgreen-600 p-2 text-white hover:bg-blue-700"
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        {/* Course Cards */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                            <AnimatePresence>
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course, idx) => (
                                        <motion.div
                                            key={course.courseTitle + idx}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CourseCard courses={course} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.p
                                        key="no-courses"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="col-span-full text-center text-gray-500"
                                    >
                                        No courses found.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayouts>
    );
}
