import WebLayouts from '@/layouts/web-layout';
import Banner from '@/web-component/banner/Banner';
import About from '@/web-component/categoryTab/About';
import CategoryTab from '@/web-component/categoryTab/CategoryTab';
import PartnerSlider from '@/web-component/PartnerSlider';
import Plain from '@/web-component/Plain';
import Testimonials from '@/web-component/testimonials/Testimonials';
import WhatWeOffer from '@/web-component/whatweoffer';
import { Head } from '@inertiajs/react';
const plans =[
    {
      "title": "Standard plan",
      "price": 49,
      "frequency": "month",
      "features": [
        "2 team members",
        "20GB Cloud storage",
        "Integration help"
      ],
      "disabledFeatures": [
        "Sketch Files",
        "API Access",
        "Complete documentation",
        "24×7 phone & email support"
      ]
    },
    {
      "title": "Premium plan",
      "price": 99,
      "frequency": "month",
      "features": [
        "10 team members",
        "100GB Cloud storage",
        "Integration help",
        "Sketch Files",
        "API Access"
      ],
      "disabledFeatures": [
        "Complete documentation",
        "24×7 phone & email support"
      ]
    },
    {
      "title": "Premium Plus plan",
      "price": 199,
      "frequency": "month",
      "features": [
        "Unlimited team members",
        "1TB Cloud storage",
        "Integration help",
        "Sketch Files",
        "API Access",
        "Complete documentation",
        "24×7 phone & email support"
      ],
      "disabledFeatures": []
    }
  ]
  const logos = [
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    '/build/assets/web-assets/university.svg',
    // Add more paths as needed
  ];
export default function Footer() {
    return (
        <>
            <WebLayouts>
                <Head title="Home" />
                <section className="w-full bg-gradient-to-br from-blue-200 via-green-200 to-yellow-100 dark:from-gray-900 dark:via-gray-600 dark:to-gray-900 transition-colors duration-500">

                    <Banner />
                </section>
                <section className="py-16 pt-50 pb-4">
                    <About/>
                </section>
                <section className="py-16 pt-4">
                    <CategoryTab />
                </section>
                <section>
                  <WhatWeOffer/>
                </section>
                <section className='py-16 pt-4'>
                    <PartnerSlider logos={logos} />
                </section>
                <section className='py-16 pt-4'>
                    <Plain plans={plans} />
                </section>
                <section className='py-16 pt-4'>
                    <Testimonials/>
                </section>               
            </WebLayouts>
        </>
    );
}
