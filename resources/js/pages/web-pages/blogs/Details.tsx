import WebLayout from '@/layouts/web-layout';
import FAQ from '@/web-component/FAQ';
import OtherBlogs from '@/web-component/OtherBlogs';
import { usePage } from '@inertiajs/react';

export default function BlogDetails() {
    const { blog, otherBlogs } = usePage().props;

    return (
        <WebLayout>
            <div className="container pb-5">
                <img src={`/storage/${blog.image}`} alt="Blog banner" className="mt-18 h-[700px] w-full rounded-md object-cover" />
                <div className="pt-2">
                    {/* Breadcrumb */}
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="mb-4 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                            <li className="inline-flex items-center">
                                <a
                                    href="/"
                                    className="ms-1 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    <svg className="me-2.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                    </svg>
                                    Home
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="mx-1 h-3 w-3 text-gray-400 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    <a
                                        href="#"
                                        className="ms-1 text-sm font-medium text-gray-600 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                    >
                                        Blog
                                    </a>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                <div className="grid grid-cols-6 gap-8">
                    <div className="col-span-6 space-y-6 md:col-span-4">
                        <p className="mb-0.5 w-[max-content] rounded-sm bg-gray-900 px-3 py-0.5 text-white">{blog.category}</p>
                        <h1 className="mb-1 text-2xl font-semibold text-gray-800">{blog.name}</h1>
                        <div className="text-sm text-gray-500">Published: {blog.created_at}</div>
                        <div className="space-y-4 text-base leading-relaxed text-gray-700" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    </div>

                    <div className="col-span-6 md:col-span-2">
                        <div className="sticky top-28 space-y-4">
                            <div className="rounded-md bg-gray-100 p-4 text-gray-700 shadow-sm">
                                {                                
                                otherBlogs.map((blog) => (
                                    <OtherBlogs key={blog.id} blogs={blog} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {blog.faq?.length > 0 && (
                    <div className="mt-10">
                        <p className="course_title">Frequently Asked Questions</p>
                        <FAQ faqs={blog.faq} />
                    </div>
                )}
            </div>
        </WebLayout>
    );
}
