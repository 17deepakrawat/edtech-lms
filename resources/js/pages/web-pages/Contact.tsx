import WebLayout from '@/layouts/web-layout';
import Lottie from 'lottie-react';
import animationData from '/xampp/htdocs/edtech_lms/public/build/assets/web-assets/Animation - 1746012845568.json'; // Update if needed

export default function ContactPage() {
    return (
        <WebLayout>
            <div className="container">
                {/* Breadcrumb */}
                <nav className="flex mt-20" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm">
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
                            <span className="font-semibold text-gray-700 dark:text-white">Contact</span>
                        </li>
                    </ol>
                </nav>

                {/* Heading */}
                <div className="mt-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">Contact Us</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">
                        We'd love to hear from you! Please fill out the form below.
                    </p>
                </div>

                {/* Main Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-10">
                    {/* Lottie Animation */}
                    <div className="w-full h-full items-center flex">
                        <Lottie animationData={animationData} loop={true} className="w-full max-w-md mx-auto" />
                    </div>

                    {/* Contact Form */}
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 sm:p-8">
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="mb-1 text-sm font-medium">Subject</label>
                            <input
                                type="text"
                                placeholder="Subject"
                                className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="mb-1 text-sm font-medium">Message</label>
                            <textarea
                                rows={5}
                                placeholder="Write your message here..."
                                className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow transition duration-300"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </WebLayout>
    );
}
