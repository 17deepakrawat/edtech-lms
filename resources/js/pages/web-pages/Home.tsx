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
    status: boolean;
}

interface Department {
    id: number;
    name: string;
    status: boolean;
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
    status: boolean;
}

interface ProgramWithCourses {
    id: number;
    name: string;
    status: boolean;
    department_id: number;
    courses: Course[];
}

interface Partner {
    id: number;
    link: string;
    image: string;
    name: string;
}

interface HomeProps {
    universityPartner?: Partner[]; // fixed
    banners?: BannerSlide[];
    departments?: Department[];
    programsWithCourses?: ProgramWithCourses[];
    categoryData?: Record<string, Record<string, any[]>>;
    weoffers?: {
        id: number;
        title: string;
        description: string;
        link: string;
        image: string;
        status: boolean;
    }[];
}

const plans = [
    {
        title: 'Standard plan',
        price: 49,
        frequency: 'month',
        features: ['2 team members', '20GB Cloud storage', 'Integration help'],
        disabledFeatures: ['Sketch Files', 'API Access', 'Complete documentation', '24×7 phone & email support'],
    },
    {
        title: 'Premium plan',
        price: 99,
        frequency: 'month',
        features: ['10 team members', '100GB Cloud storage', 'Integration help', 'Sketch Files', 'API Access'],
        disabledFeatures: ['Complete documentation', '24×7 phone & email support'],
    },
    {
        title: 'Premium Plus plan',
        price: 199,
        frequency: 'month',
        features: [
            'Unlimited team members',
            '1TB Cloud storage',
            'Integration help',
            'Sketch Files',
            'API Access',
            'Complete documentation',
            '24×7 phone & email support',
        ],
        disabledFeatures: [],
    },
];

const logos = [
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
];

export default function Home({ banners, departments, programsWithCourses, categoryData, weoffers, universityPartner }: HomeProps) {
    // console.log(universityPartner);
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
                <Plain plans={plans} />
            </section>
            <section className="py-16 pt-4">
                <Testimonials />
            </section>
        </WebLayouts>
    );
}
