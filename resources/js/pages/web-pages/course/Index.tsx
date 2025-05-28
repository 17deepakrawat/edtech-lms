'use client';

import WebLayouts from '@/layouts/web-layout';
import CourseCard from '@/web-component/CourseCard';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import React from 'react';

// Debounce Hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export default function CourseIndex() {
    const { courses, departmentPrograms, maxAmount } = usePage().props as any;

    const allPrograms = Object.values(departmentPrograms).flat();
    const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
    const [price, setPrice] = useState(maxAmount);
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 150);

    useEffect(() => {
        setSelectedPrograms(allPrograms);
    }, [departmentPrograms]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(e.target.value));
    };

    const handleProgramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setSelectedPrograms((prev) => (checked ? [...prev, value] : prev.filter((prog) => prog !== value)));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const activePrograms = selectedPrograms.length > 0 ? selectedPrograms : allPrograms;
    const searchLower = debouncedSearch.toLowerCase();
    const searchAsNumber = parseFloat(debouncedSearch);

    const filteredCourses = courses.filter((course: any) => {
        const matchesProgram = activePrograms.includes(course.program);
        const matchesPrice = course.price <= price;
        const matchesSearch =
            course.name.toLowerCase().includes(searchLower) ||
            course.program.toLowerCase().includes(searchLower) ||
            course.department?.toLowerCase().includes(searchLower) ||
            (!isNaN(searchAsNumber) && course.price === searchAsNumber);

        return matchesProgram && matchesPrice && matchesSearch;
    });

    return (
        <WebLayouts>
            <div className="container-fluid mt-23">
                <div className="pt-6 pb-5">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-2">
                            <li className="inline-flex items-center">
                                <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                                    <svg className="me-2.5 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="mx-1 h-3 w-3 text-gray-400" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <span className="text-sm font-bold text-gray-700">Courses</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-5">
                    {/* Sidebar */}
                    <div className="md:col-span-2 lg:col-span-1">
                        <p className="mb-3 text-2xl font-bold">All Categories</p>
                        <div className="max-h-[28rem] space-y-4 overflow-y-auto">
                            {Object.entries(departmentPrograms).map(([dept, programs], i) => (
                                <details key={i} className="group rounded-lg border">
                                    <summary className="flex cursor-pointer justify-between p-4 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:borde-2">
                                        <span className="text-sm font-medium">{dept}</span>
                                        <svg
                                            className="h-4 w-4 transition-transform group-open:rotate-180"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="bg-white p-4">
                                        <ul className="space-y-2">
                                            {programs.map((prog, j) => (
                                                <li key={j} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={prog}
                                                        value={prog}
                                                        checked={selectedPrograms.includes(prog)}
                                                        onChange={handleProgramChange}
                                                        className="h-4 w-4 rounded border-gray-300"
                                                    />
                                                    <label htmlFor={prog} className="text-sm text-gray-700">
                                                        {prog}
                                                    </label>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            ))}
                        </div>

                        {/* Price Filter */}
                        <div className="mt-6 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                            <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">Filter by Price</h2>
                            <input
                                type="range"
                                min={0}
                                max={maxAmount}
                                value={price}
                                onChange={handleSliderChange}
                                className="accent-customgreen-600 h-2 w-full cursor-pointer rounded-lg bg-gray-200 dark:bg-gray-700"
                            />
                            <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-300">
                                <span>₹0</span>
                                <span>₹{price}</span>
                                <span>₹{maxAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3 lg:col-span-4">
                        <form className="flex flex-col gap-2 pb-6 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                                placeholder="Search by course, program, department or price..."
                            />
                            {/* <button type="submit" className="bg-customgreen-600 text-white p-2 rounded-lg hover:bg-blue-700">
                                Search
                            </button> */}
                        </form>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <AnimatePresence>
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course: any) => (
                                        <motion.div
                                            key={course.id}
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
