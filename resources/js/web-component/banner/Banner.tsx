import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import LeadForm from '../leadform/LeadForm';

interface BannerSlide {
    id: number;
    title: string;
    description: string;
    bannerimage: string;
    status: boolean;
}

interface BannerProps {
    banners?: BannerSlide[];
}

export default function Banner({ banners = [] }: BannerProps) {
    const titleCharRefs = useRef<HTMLSpanElement[][]>([]);
    const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

    const animateContent = (index: number) => {
        const charEls = titleCharRefs.current[index] || [];
        const descEl = descRefs.current[index];
        const imageEl = imageRefs.current[index];

        if (!charEls.length || !descEl || !imageEl) return;

        gsap.set(charEls, { y: -50, opacity: 0 });
        gsap.set(imageEl, { y: -60, opacity: 0, scale: 0.95 });

        const tl = gsap.timeline();

        tl.to(charEls, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.05,
        })
            .fromTo(
                descEl,
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                },
                '+=0.3',
            )
            .to(
                imageEl,
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                },
                '-=0.3',
            );
    };
    useEffect(() => {
        if (banners.length > 0) {
            animateContent(0);
        }
    }, [banners]);

    // If no banners are provided, use default slides
    const slides =
        banners.length > 0
            ? banners
            : [
                  {
                      id: 1,
                      title: 'Engaging & Accessible Online Courses For All ',
                      description:
                          'With our carefully crafted online courses, which are customized to meet each learners requirements and individual goals, you can explore a world of knowledge. Our captivating content, which covers everything from basic abilities to more complex subjects, guarantees that education is available at any time and from any location, enabling students to succeed in todays fast-paced world. Begin to achieve your goal right now!',
                      bannerimage: '/build/assets/web-assets/herobanner.png',
                      status: true,
                  },
                  {
                      id: 2,
                      title: 'Engaging & Accessible Online Courses For All ',
                      description:
                          'With our carefully crafted online courses, which are customized to meet each learners requirements and individual goals, you can explore a world of knowledge. Our captivating content, which covers everything from basic abilities to more complex subjects, guarantees that education is available at any time and from any location, enabling students to succeed in todays fast-paced world. Begin to achieve your goal right now!',
                      bannerimage: '/build/assets/web-assets/herobanner.png',
                      status: true,
                  },
              ];

    return (
        <>
            <Swiper
                slidesPerView={1}
                loop={true}
                speed={600}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                onSlideChangeTransitionStart={({ realIndex }) => {
                    const chars = titleCharRefs.current[realIndex] || [];
                    gsap.set([...chars, descRefs.current[realIndex], imageRefs.current[realIndex]], {
                        opacity: 0,
                        y: 50,
                    });
                }}
                onSlideChangeTransitionEnd={({ realIndex }) => {
                    animateContent(realIndex);
                }}
                className="w-full"
            >
                {slides.map((slide, index) => {
                    const chars = slide.title.split('');
                    titleCharRefs.current[index] = [];

                    return (
                        <SwiperSlide key={slide.id} className="pt-20 pb-8">
                            <div className="container py-10">
                                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                                    <div>
                                        <h1 className="mb-4 text-4xl font-bold text-black dark:text-white">
                                            {chars.map((char, charIndex) => (
                                                <span
                                                    key={charIndex}
                                                    ref={(el) => {
                                                        if (el) {
                                                            titleCharRefs.current[index][charIndex] = el;
                                                        }
                                                    }}
                                                    style={{ display: 'inline-block' }}
                                                >
                                                    {char === ' ' ? '\u00A0' : char}
                                                </span>
                                            ))}
                                        </h1>
                                        <p
                                            ref={(el) => (descRefs.current[index] = el)}
                                            className="text-gray-700 dark:text-white"
                                            dangerouslySetInnerHTML={{ __html: slide.description }}
                                        ></p>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img
                                            ref={(el) => (imageRefs.current[index] = el)}
                                            src={'/storage/' + slide.bannerimage}
                                            alt={slide.title}
                                            className="w-full max-w-md rounded-lg object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <LeadForm />
        </>
    );
}
