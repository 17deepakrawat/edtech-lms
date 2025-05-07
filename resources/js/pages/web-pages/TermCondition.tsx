import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function TermsConditions() {
    return (
        <WebLayout>
            <Head title="Terms & Conditions" />
            <div className="container pt-25  py-16">
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
                            <span className="font-semibold text-gray-700 dark:text-white">Terms & Conditions</span>
                        </li>
                    </ol>
                </nav>

                {/* Page Content */}
                <div className=" text-gray-700 dark:text-gray-300 space-y-8">
                    <h1 className="custom_title text-gray-900 dark:text-white">Terms & Conditions</h1>
                    <p className=" text-lg font-medium">
                        Please review our terms carefully. By using the website and services of <strong className="text-blue-600 dark:text-blue-400">EDTECH Education</strong>, you agree to abide by them.
                    </p>

                    <Section title="Acceptance of Terms">
                        By accessing or using our website, you confirm that you accept these terms and conditions in full. We reserve the right to modify these terms at any time without prior notice.
                    </Section>

                    <Section title="Intellectual Property">
                        All content including text, graphics, videos, logos, and course materials is protected under Indian copyright law and is the property of EDTECH Education or its licensors.
                    </Section>

                    <Section title="Use of Website and Courses">
                        The website is for personal, non-commercial use only. Any misuse, including spreading malicious content or unauthorized access, may result in legal action.
                    </Section>

                    <Section title="User Content">
                        By submitting content to our site, you grant EDTECH a non-exclusive, perpetual license to use, reproduce, publish, and distribute that content across all media.
                    </Section>

                    <Section title="Links to Third-Party Sites">
                        EDTECH is not responsible for the content or privacy practices of third-party websites linked on our site. Your use of such sites is at your own risk.
                    </Section>

                    <Section title="Disclaimer of Warranties">
                        Our website is provided "as is" and "as available" without any warranties. Your use of it is at your own risk.
                    </Section>

                    <Section title="Limitation of Liability">
                        EDTECH Education is not liable for any direct, indirect, incidental, or consequential damages related to your use of the website.
                    </Section>

                    <Section title="Indemnification">
                        You agree to indemnify and hold harmless EDTECH and its team from any claims or liabilities arising from your use of the site.
                    </Section>

                    <Section title="Governing Law">
                        These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Uttar Pradesh.
                    </Section>

                    <Section title="Termination">
                        We reserve the right to suspend or terminate your access to the site at any time without notice for any violation of these terms.
                    </Section>

                    <Section title="License Agreement">
                        You are granted a non-transferable, revocable license to use our services. Sharing course material without permission may lead to account termination.
                    </Section>

                    <Section title="Severability & Waiver">
                        If any part of these terms is found to be unenforceable, the remaining provisions will still apply. Failure to enforce any part does not constitute a waiver.
                    </Section>

                    <Section title="No Partnership">
                        These terms do not create a partnership, joint venture, or employment relationship between you and EDTECH.
                    </Section>

                    <Section title="Contact Us">
                        <ul className="space-y-1">
                            <li><strong>Email:</strong> <a href="mailto:education@edtechinnovate.com" className="text-blue-600 dark:text-blue-400">education@edtechinnovate.com</a></li>
                            <li><strong>Phone:</strong> 9870336933</li>
                            <li><strong>Address:</strong> A-18, A Block, Sector 59, Noida, Uttar Pradesh 201301</li>
                        </ul>
                        <p className="mt-4">If you have any questions or concerns, feel free to reach out.</p>
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
