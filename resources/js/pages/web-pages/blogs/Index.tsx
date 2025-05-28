import WebLayouts from '@/layouts/web-layout';
import BlogBanner from '@/web-component/banner/BlogBanner';
import BlogCard from '@/web-component/BlogCard';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { usePage } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type BlogPost = {
    id: number;
    name: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    created_at: string;
    category: string;
    author_name: string;
    author_image: string;
};

export default function BlogIndex() {
    const { blogs } = usePage().props as { blogs: BlogPost[] };

    const groupedByCategory: Record<string, BlogPost[]> = blogs.reduce((acc, post) => {
        if (!acc[post.category]) acc[post.category] = [];
        acc[post.category].push(post);
        return acc;
    }, {} as Record<string, BlogPost[]>);

    return (
        <WebLayouts>
            <div className="container">
                <BlogBanner blogPosts={blogs.slice(0, 3)} />
            </div>

            <div className="container">
                {Object.entries(groupedByCategory).map(([category, posts], index) => {
                    const navPrev = `swiper-button-prev-${index}`;
                    const navNext = `swiper-button-next-${index}`;

                    return (
                        <div key={category} className="mb-12">
                            <div className="flex items-center justify-between">
                                <h2 className="px-2 text-lg font-extrabold text-black dark:text-white">{category}</h2>
                                <div className="flex items-center space-x-2">
                                   
                                    <div className={`${navPrev} swiper-nav-button cursor-pointer px-2 text-xl`}>
                                        <HiChevronLeft />
                                    </div>
                                    <div className={`${navNext} swiper-nav-button cursor-pointer px-2 text-xl`}>
                                        <HiChevronRight />
                                    </div>
                                </div>
                            </div>

                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1.1}
                                breakpoints={{
                                    640: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 4 },
                                }}
                                navigation={{
                                    nextEl: `.${navNext}`,
                                    prevEl: `.${navPrev}`,
                                }}
                                modules={[Navigation]}
                            >
                                {posts.map((post) => (
                                    <SwiperSlide key={post.id} className="py-5">
                                        <BlogCard
                                            post={{
                                                id: post.id,
                                                name: post.name,
                                                slug: post.slug,
                                                image: `${post.image}`,
                                                author_name: post.author_name,
                                                author_image: `${post.author_image}`,
                                                category: post.category,
                                                created_at: post.created_at,
                                            }}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    );
                })}
            </div>
        </WebLayouts>
    );
}
