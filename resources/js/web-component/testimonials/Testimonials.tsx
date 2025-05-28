import animationData from '@/web-component/testimonials/Animation - 1745412583214.json';
import Lottie from 'lottie-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Feedback {
    id: number;
    name: string;
    title: string;
    description: string;
    image: string;
}

interface TestimonialsProps {
    feedbacks: Feedback[];
}

export default function Testimonials({ feedbacks }: TestimonialsProps) {
    return (
        <div className="container py-10">
            <p className="custom_title mb-5 text-center">Testimonials</p>
            <div className="flex flex-col items-center gap-4 sm:flex-col md:flex-row lg:flex-row">
                <div className="w-full sm:w-full md:w-[20%] lg:w-[20%]">
                    <Lottie animationData={animationData} loop />
                </div>
                <div className="w-full sm:w-full md:w-[80%] lg:w-[80%]">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        loop
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
                        className="custom_testimonial w-full"
                    >
                        {feedbacks.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="h-[300px] rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <figure className="text-center">
                                        <svg
                                            className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 18 14"
                                        >
                                            <path d="M6.83 0C3.15 0 0 3.4 0 7.58c0 3.01 1.98 5.43 4.63 6.17.35.1.6-.15.6-.45 0-.22-.01-.95-.01-1.73-1.88.37-2.27-.82-2.41-1.57-.08-.21-.42-.86-.71-1.03-.24-.13-.58-.45-.01-.46.54-.01.93.5 1.06.71.62 1.05 1.6.76 2.01.58.06-.45.24-.76.43-.93-1.75-.2-3.6-.88-3.6-3.91 0-.86.3-1.57.79-2.13-.08-.2-.35-1.01.08-2.12 0 0 .66-.22 2.17.82a7.54 7.54 0 0 1 3.95 0c1.5-1.04 2.16-.82 2.16-.82.43 1.11.17 1.92.08 2.12.49.56.79 1.27.79 2.13 0 3.04-1.86 3.71-3.62 3.9.25.22.47.64.47 1.29 0 .93-.01 1.67-.01 1.89 0 .3.25.55.6.45 2.65-.74 4.63-3.16 4.63-6.17C18 3.4 14.85 0 11.17 0H6.83Z" />
                                        </svg>
                                        <blockquote>
                                            <p
                                                className="text-lg font-medium text-gray-900 italic dark:text-white"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.description.replace(/^"(.*)"$/, '$1'),
                                                }}
                                            />
                                        </blockquote>
                                        <figcaption className="mt-4 flex items-center justify-center gap-3">
                                            <img
                                                className="h-6 w-6 rounded-full"
                                                src={`/storage/${item.image}`}
                                                alt={item.name}
                                            />
                                            <div className="text-left">
                                                <cite className="block text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.name}
                                                </cite>
                                                <cite className="text-xs text-gray-500 dark:text-gray-400">
                                                    {item.title}
                                                </cite>
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
