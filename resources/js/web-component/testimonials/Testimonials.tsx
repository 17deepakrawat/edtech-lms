import animationData from '@/web-component/testimonials/Animation - 1745412583214.json'; // Adjust path as needed
import Lottie from 'lottie-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Testimonials() {
    const testimonials = [
        {
            quote: 'Flowbite is just awesome. Tons of predesigned components and pages.',
            name: 'Michael Gough',
            role: 'CEO at Google',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png',
        },
        {
            quote: 'Designing with Flowbite is super efficient.',
            name: 'Sarah Doe',
            role: 'UI/UX Designer at Meta',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
        },
        {
            quote: 'Highly recommend Flowbite. Easy to customize.',
            name: 'John Smith',
            role: 'CTO at Microsoft',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png',
        },
        {
            quote: 'Flowbite is the best design system I’ve used so far.',
            name: 'Emily Jones',
            role: 'Frontend Dev at Amazon',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png',
        },
        {
            quote: 'Boosted our project speed by 10x!',
            name: 'Ali Khan',
            role: 'DevOps at Netflix',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
        },
        {
            quote: 'Very clean and minimal design. Love it.',
            name: 'Lena Mors',
            role: 'Freelancer',
            image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/avatar-3.png',
        },
    ];

    return (
        <div className="container py-10">
            <p className='text-center custom_title mb-5'>Testimonials</p>
            <div className="flex flex-col items-center gap-4 sm:flex-col md:flex-row lg:flex-row">
                <div className="w-full sm:w-full md:w-[20%] lg:w-[20%]">
                    <Lottie animationData={animationData} loop={true} />
                </div>
                <div className="w-full sm:w-full md:w-[80%] lg:w-[80%]">
                    <Swiper 
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 1 },
                            1024: { slidesPerView: 2 },
                            1440: { slidesPerView: 3 },
                          }}
                        modules={[Pagination]}
                        className="w-full custom_testimonial"
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="h-[300px] rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" >
                                    <figure className="text-center">
                                        <svg
                                            className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 14"
                                        >
                                            <path d="..." />
                                        </svg>
                                        <blockquote>
                                            <p className="text-lg font-medium text-gray-900 italic dark:text-white">"{item.quote}"</p>
                                        </blockquote>
                                        <figcaption className="mt-4 flex items-center justify-center gap-3">
                                            <img className="h-6 w-6 rounded-full" src={item.image} alt={item.name} />
                                            <div className="text-left">
                                                <cite className="block text-sm font-medium text-gray-900 dark:text-white">{item.name}</cite>
                                                <cite className="text-xs text-gray-500 dark:text-gray-400">{item.role}</cite>
                                            </div>
                                        </figcaption>
                                    </figure>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
