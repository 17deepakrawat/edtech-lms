import WebLayouts from '@/layouts/web-layout';
import Banner from '@/web-component/banner/Banner';
import About from '@/web-component/categoryTab/About';
import CategoryTab from '@/web-component/categoryTab/CategoryTab';
import LeadForm from '@/web-component/leadform/LeadForm';
import PartnerSlider from '@/web-component/PartnerSlider';
import Plain from '@/web-component/Plain';
import Testimonials from '@/web-component/testimonials/Testimonials';
import WhatWeOffer from '@/web-component/WhatWeOffer';
import { Head } from '@inertiajs/react';

interface BannerSlide {
    id: number;
    title: string;
    description: string;
    bannerimage: string;
}
interface Department {
    id: number;
    name: string;
}
interface Course {
    id: number;
    name: string;
    short_description?: string;
    image?: string;
    content?: string;
    modes?: string;
    duration?: string;
    rating?: number;
    price?: number;
    is_subject?: boolean;
    course_keys?: string[];
    faqs?: any[];
}
interface ProgramWithCourses {
    id: number;
    name: string;
    department_id: number;
    courses: Course[];
}
interface Partner {
    id: number;
    link: string;
    image: string;
    name: string;
}
interface WebPlan {
    id: number;
    title: string;
    price: number;
    frequency: string;
    features: string[]; // JSON-decoded array from backend
    disabled_features: string[]; // JSON-decoded array from backend
}
interface Feedback {
    id: number;
    name: string;
    title: string;
    description: string;
    image: string;
}
interface HomeProps {
    universityPartner?: Partner[];
    banners?: BannerSlide[];
    feedback?: Feedback[];
    webplan?: WebPlan[];
    departments?: Department[];
    programsWithCourses?: ProgramWithCourses[];
    categoryData?: Record<string, Record<string, any[]>>;
    weoffers?: {
        id: number;
        title: string;
        description: string;
        link: string;
        image: string;
    }[];
}

export default function Home({ banners, departments, programsWithCourses, categoryData, weoffers, universityPartner, webplan, feedback }: HomeProps) {
    return (
        <WebLayouts>
            <Head title="Home" />
            <div className="relative">
                <section className="w-full bg-gradient-to-br from-blue-200 via-green-200 to-yellow-100 transition-colors duration-500 dark:from-gray-900 dark:via-gray-600 dark:to-gray-900">
                    <Banner banners={banners} />
                </section>
                <div className="absolute bottom-0 left-1/2 z-10 w-full max-w-md -translate-x-1/2 translate-y-1/2 transform">
                    <LeadForm />
                </div>
            </div>

            <section className="pt-24 pb-4">
                <About />
            </section>

            <section className="py-16 pt-4">
                <CategoryTab categoryData={categoryData || {}} />
            </section>

            <section>
                <WhatWeOffer weoffers={weoffers || []} />
            </section>

            <section className="py-16 pt-4">
                <PartnerSlider partners={universityPartner || []} />
            </section>

            <section className="py-16 pt-4">
                <Plain plans={webplan || []} />
            </section>

            <section className="py-16 pt-4">
                <Testimonials feedbacks={feedback || []} />
            </section>
        </WebLayouts>
    );
}
