import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function BlogSwiperBanner({ blogPosts }: { blogPosts: any[] }) {
    return (
        <div className="relative my-16 mt-20 w-full bg-white dark:bg-gray-900">
            <Swiper modules={[Navigation]} navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }} loop speed={2500} className="mySwiper">
                {blogPosts.map((post) => (
                    <SwiperSlide key={post.id}>
                        <div className="flex h-auto w-full flex-col items-stretch transition-all duration-700 ease-in-out md:h-[500px] md:flex-row">
                            {/* Text Section */}
                            <div className="flex w-full flex-col justify-center bg-gray-100 rounded-l-sm p-6 transition-all duration-700 ease-in-out md:w-1/2 md:p-10 dark:bg-gray-900">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {post.category} — {post.date}
                                </p>
                                <h2 className="mt-3 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">{post.title}</h2>
                                {post.author && (
                                    <div className="mt-4 flex items-center gap-2">
                                        <img src={post.authorimg} alt={post.author} className="h-8 w-8 rounded-full object-cover" />
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{post.author}</span>
                                    </div>
                                )}
                                <p className="mt-4 text-base text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                                <a href="#" className="mt-4 text-sm text-green-600 hover:underline dark:text-blue-400">
                                    Continue reading...
                                </a>
                            </div>

                            {/* Image Section */}
                            <div className="h-64 w-full md:h-auto md:w-1/2">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full rounded-r-sm object-cover transition-all duration-700 ease-in-out"
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="absolute right-4 bottom-4 z-10 flex gap-2">
                <button className="custom-prev rounded bg-white p-2 text-black shadow transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    &larr;
                </button>
                <button className="custom-next rounded bg-white p-2 text-black shadow transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    &rarr;
                </button>
            </div>
        </div>
    );
}
