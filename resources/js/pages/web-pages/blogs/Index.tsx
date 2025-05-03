import WebLayouts from '@/layouts/web-layout';
import BlogBanner from '@/web-component/banner/BlogBanner';
import BlogCard from '@/web-component/BlogCard';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
type BlogPost = {
    id: number;
    category: string;
    date: string;
    title: string;
    excerpt: string;
    image: string;
    author: string;
    authorimg: string;
};

const allPosts: BlogPost[] = [
    {
        id: 1,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 2,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'A little bit of France, only 16 miles from Canada',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 3,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 4,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 5,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 6,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 7,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 8,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 9,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 6,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 7,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 8,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 9,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 10,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 11,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 12,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 13,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 14,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 15,
        category: 'Travel',
        date: 'October 31, 2018',
        author: 'Deepak Singh Rawat',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Why your socks may be the most important thing you pack',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 16,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 17,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 18,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
    {
        id: 19,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
];

const groupedByCategory: Record<string, BlogPost[]> = allPosts.reduce(
    (acc, post) => {
        if (!acc[post.category]) acc[post.category] = [];
        acc[post.category].push(post);
        return acc;
    },
    {} as Record<string, BlogPost[]>,
);

export default function BlogIndex() {
    return (
        <WebLayouts>
            <div className="container">
                <BlogBanner blogPosts={allPosts.slice(0, 3)} />
            </div>

            <div className="container">
                {Object.entries(groupedByCategory).map(([category, posts], index) => {
                    const navPrev = `swiper-button-prev-${index}`;
                    const navNext = `swiper-button-next-${index}`;

                    return (
                        <div key={category} className="mb-12">
                            <div className=" flex items-center justify-between">
                                <h2 className="px-2 py-0 text-lg font-extrabold text-black dark:text-white">{category}</h2>
                                <div className="flex items-center space-x-2">
                                    <a href="#" className="text-sm text-gray-900 hover:underline dark:text-white">
                                        View All
                                    </a>
                                    <div className={`${navPrev} swiper-nav-button cursor-pointer px-2 text-xl`}>
                                        {' '}
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
                                        <BlogCard post={post} />
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
