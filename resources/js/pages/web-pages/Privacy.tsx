import WebLayout from '@/layouts/web-layout';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <WebLayout>
            <Head title="Privacy Policy" />
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
                            <span className="font-semibold text-gray-700 dark:text-white">Privacy Policy</span>
                        </li>
                    </ol>
                </nav>

                {/* Page Content */}
                <div className="space-y-8 text-gray-700 dark:text-gray-300">
                    <h1 className="custom_title text-gray-900 dark:text-white">Privacy Policy</h1>
                    <p className="text-lg font-medium">
                        Your privacy matters to us at <strong className="text-blue-600 dark:text-blue-400">EDTECH Education</strong>.
                    </p>

                    <p>
                        EDTECH Education and its affiliates are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our platform.
                    </p>

                    {/* Sections */}
                    <div className="space-y-6">
                        <Section number="1" title="Gathering of Personal Information">
                            When you register or interact with our website, we may collect personal data like your name, email, phone number, IP address, browser type, and your interaction with the platform. All data is collected only with your consent and knowledge.
                        </Section>

                        <Section number="2" title="Use of Personal Data">
                            Your data helps us deliver, improve, and personalize our services. It is used to respond to your queries, process transactions, prevent fraud, and comply with legal obligations.
                        </Section>

                        <Section number="3" title="Disclosure of Personal Data">
                            We do not sell or rent your personal data. Disclosure happens only in specific cases—like legal compliance or safety needs—or when you’ve given us explicit permission to share information with trusted partners.
                        </Section>

                        <Section number="4" title="Data Security">
                            We implement robust security protocols to safeguard your personal data from unauthorized access, misuse, or loss. Our team follows industry standards to ensure your information is well protected.
                        </Section>

                        <Section number="5" title="Modifications to This Policy">
                            We may occasionally update this policy. You’ll be notified of major changes via email or a notice on our website. The updated policy date will always be visible, and we recommend checking this page regularly.
                        </Section>

                        <Section number="6" title="Privacy Concerns">
                            For any questions or issues regarding your data or our privacy practices, feel free to reach out to us using the contact information below.
                        </Section>
                    </div>

                    {/* Contact Box */}
                    <div className="mt-10 rounded-lg bg-gray-100 dark:bg-gray-800 p-6 shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                        <ul className="space-y-2">
                            <li><strong>Company:</strong> EDTECH Education</li>
                            <li><strong>Email:</strong> <a href="mailto:education@edtechinnovate.com" className="text-blue-600 dark:text-blue-400">education@edtechinnovate.com</a></li>
                            <li><strong>Phone:</strong> 9870336933</li>
                            <li><strong>Address:</strong> A-18, A Block, Sector 59, Noida, Uttar Pradesh 201301</li>
                        </ul>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                            Our team is trained and committed to responsibly handling your data and guiding you toward the right learning opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}

// Subcomponent for sections
function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">{number}. {title}</h3>
            <p className="leading-relaxed">{children}</p>
        </div>
    );
}
