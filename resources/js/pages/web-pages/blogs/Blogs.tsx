import WebLayouts from '@/layouts/web-layout';
import BlogBanner from '@/web-component/banner/BlogBanner';
import BlogCard from '@/web-component/BlogCard';
import 'swiper/css';
import 'swiper/css/navigation';

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
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
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
        id: 10,
        category: 'Fitness',
        date: 'October 31, 2018',
        author: 'Safdar Ali',
        authorimg: '/build/assets/web-assets/course.jpg',
        title: 'Visualizing your goal weight could help boost weight loss',
        excerpt: 'Alice was beginning to get very tired of sitting by her sister on the bank...',
        image: '/build/assets/web-assets/course.jpg',
    },
];

export default function Blogs() {
    return (
        <WebLayouts>
            <div className="container mx-auto px-4 py-8">
                <BlogBanner blogPosts={allPosts.slice(0, 3)} />
                <p className="course_title">Fitness</p>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {allPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </WebLayouts>
    );
}
