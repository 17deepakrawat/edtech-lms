import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <WebLayout>
            <Head title="About Us" />
            <div className="container pb-16">
                <nav className="mt-20 flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm md:space-x-2 rtl:space-x-reverse">
                        <li>
                            <a href="/" className="inline-flex items-center text-gray-700 hover:text-blue-600 dark:text-white">
                                <svg
                                    className="me-2.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li className="flex items-center">
                            <svg
                                className="mx-2 h-3 w-3 text-gray-400 rtl:rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="font-semibold text-gray-700 dark:text-white">About Us</span>
                        </li>
                    </ol>
                </nav>
                <div className="space-y-6 pt-10">
                    <h1 className="custom_title mt-3 mb-4 text-start">About Us</h1>

                    <p className="text-start text-lg font-medium text-gray-700">
                        <strong>Master Your Skills to Accelerate Your Career with Expert-Led Courses</strong>
                    </p>

                    <p className="leading-relaxed text-gray-700">
                        At <strong>Ed.Tech Innovate</strong>, we offer a diverse range of short courses designed to foster both personal and
                        professional growth. Our platform is committed to the holistic development of learners, helping them build digital skills,
                        technical expertise, communication literacy, and analytical thinking. Whether you want to enhance your existing skills or
                        develop new ones, our tailored curriculum ensures you get the right knowledge to take your next step forward.
                    </p>

                    <p className="leading-relaxed text-gray-700">
                        Our expert-led courses are result-driven and focused on creating real-world impact. Join us today and unlock your
                        potential—one skill at a time.
                    </p>

                    <div className="border-t border-gray-300 pt-6">
                        <div className="grid-1 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
                            <div className="md:col-span-3 lg:col-span-4">
                                <h2 className="mb-2 text-2xl font-semibold">Vision</h2>
                                <p className="leading-relaxed text-gray-700">
                                    We aspire to become global leaders in accessible and relevant education. Our goal is to equip individuals across
                                    all backgrounds with industry-aligned short courses that are high-quality, affordable, and impactful. We believe
                                    that everyone deserves the opportunity to learn, grow, and succeed in the modern world.
                                </p>
                            </div>
                            <div className="md:col-span-1 lg:col-span-2">
                                <img src="/build/assets/web-assets/vision.jpg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 pt-6">
                        <h2 className="mb-2 text-2xl font-semibold">Mission</h2>
                        <div className="grid-1 grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-6">
                            <div className="md:col-span-1 lg:col-span-2">
                                <img src="/build/assets/web-assets/mission.jpg" alt="" />
                            </div>
                            <div className="md:col-span-3 lg:col-span-4">
                                <p className="leading-relaxed text-gray-700">
                                    Our mission is to empower learners by providing meaningful, skill-based courses that are flexible and effective.
                                    Designed by industry professionals, our programs are tailored to meet the dynamic needs of today’s workforce. With
                                    hands-on learning, practical knowledge, and relevant content, we help our students reach their personal and
                                    professional goals.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 rounded bg-gray-100 p-6 shadow">
                        <h3 className="mb-3 text-xl font-semibold">Empower Yourself in:</h3>
                        <ul className="list-inside list-disc space-y-1 text-gray-700">
                            <li>Digital Skills</li>
                            <li>Technical Expertise</li>
                            <li>Communication & Soft Skills</li>
                            <li>Analytical Thinking</li>
                            <li>Content Creation & Writing</li>
                        </ul>
                        <p className="mt-4 text-gray-700">
                            Our expert-led courses deliver noticeable improvement in your career growth and personal development.
                        </p>
                    </div>

                    {/* <div className="mt-8 text-center">
                        <p className="text-lg font-medium text-blue-700">Learn Fast. Perform Better. Achieve Your Goals with Ed.Tech Innovate!</p>
                    </div> */}
                </div>
            </div>
        </WebLayout>
    );
}
