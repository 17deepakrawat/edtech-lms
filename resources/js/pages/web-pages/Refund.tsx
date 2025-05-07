import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function RefundPolicy() {
    return (
        <WebLayout>
            <Head title="Refund Policy" />
            <div className="container pt-25 py-16">
                {/* Breadcrumb */}
                <nav className="mb-10 flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm md:space-x-2 rtl:space-x-reverse">
                        <li>
                            <a href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 dark:text-gray-300">
                                <svg className="me-2.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                                </svg>
                                Home
                            </a>
                        </li>
                        <li className="flex items-center">
                            <svg className="mx-2 h-3 w-3 text-gray-400 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="font-semibold text-gray-700 dark:text-white">Refund Policy</span>
                        </li>
                    </ol>
                </nav>

                {/* Page Content */}
                <div className=" text-gray-700 dark:text-gray-300 space-y-8">
                    <h1 className="custom_title text-gray-900 dark:text-white">Refund Policy</h1>
                    <p className=" text-lg font-medium">
                        At <strong className="text-blue-600 dark:text-blue-400">EDTECH Education</strong>, we understand that circumstances change. This Refund Policy ensures fairness for all learners and participants.
                    </p>

                    <Section title="General Terms">
                        By using this website, you agree to abide by the following refund terms. Please read the details carefully before enrolling in any course or event.
                    </Section>

                    <Section title="Eligibility for Refunds">
                        <ul className="list-disc list-inside space-y-1">
                            <li>A full refund will be issued if you cancel your registration **at least 2 days before** the course or event starts.</li>
                            <li><strong>No refund</strong> will be provided once the course or event has started.</li>
                            <li>All refund requests will be processed within <strong>4 to 8 business days</strong>.</li>
                        </ul>
                    </Section>

                    <Section title="Course or Event Cancellation">
                        <p>
                            If you choose to cancel your course registration more than 2 days before it begins, you're eligible for a full refund. However, once the course begins, no refund will be entertained.
                        </p>
                    </Section>

                    <Section title="Exceptions to Policy">
                        <p>
                            In certain genuine cases such as medical emergencies or personal loss, exceptions may be considered. Please contact us directly to discuss your situation.
                        </p>
                    </Section>

                    <Section title="Course or Event Changes">
                        <p>
                            EDTECH Education reserves the right to postpone or cancel any course due to unforeseen circumstances. We will notify all affected participants promptly and process refunds in the best possible way.
                        </p>
                    </Section>

                    <Section title="Contact Information">
                        <ul className="space-y-1">
                            <li><strong>Company:</strong> EDTECH Education</li>
                            <li><strong>Email:</strong> <a href="mailto:education@edtechinnovate.com" className="text-blue-600 dark:text-blue-400">education@edtechinnovate.com</a></li>
                            <li><strong>Phone:</strong> 9870336933</li>
                            <li><strong>Address:</strong> A-18, A Block, Sector 59, Noida, Uttar Pradesh 201301</li>
                        </ul>
                        <p className="mt-4">
                            Our team is here to support you and ensure your learning experience is smooth and worry-free.
                        </p>
                    </Section>
                </div>
            </div>
        </WebLayout>
    );
}

// Reusable Section Component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{title}</h2>
            <div className="leading-relaxed">{children}</div>
        </div>
    );
}
