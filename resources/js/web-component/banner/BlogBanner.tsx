import { Link } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type BlogPost = {
  id: number;
  name: string;
  slug: string;
  excerpt: string;
  image: string;
  created_at: string;
  category: string;
  author_name: string;
  author_image: string;
  short_description: string;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(date);
}

export default function BlogBanner({ blogPosts }: { blogPosts: BlogPost[] }) {
  console.log('BlogPosts:', blogPosts);
  return (
    <div className="relative my-16 mt-20 w-full bg-white dark:bg-gray-900">
      <Swiper
        modules={[Navigation]}
        navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
        loop
        speed={2500}
        className="mySwiper"
      >
        {blogPosts.map((post) => (
        
          <SwiperSlide key={post.id}>
            <Link href={`/blog/${post.slug}`}>
              <div className="flex h-auto w-full flex-col items-stretch transition-all duration-700 ease-in-out md:h-[500px] md:flex-row">
                {/* Text Section */}
                <div className="flex w-full flex-col justify-center rounded-l-sm bg-gray-100 p-6 md:w-1/2 md:p-10 dark:bg-gray-900">
                  <p dangerouslySetInnerHTML={{ __html: post.short_description }}></p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {post.category} — {formatDate(post.created_at)}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">{post.name}</h2>

                  {post.author_name && (
                    <div className="mt-4 flex items-center gap-2">
                      <img
                        src={`/storage/${post.author_image || 'default.png'}`}
                        alt={post.author_name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{post.author_name}</span>
                    </div>
                  )}

                  <p className="mt-4 text-base text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 text-sm text-green-600 hover:underline dark:text-blue-400"
                  >
                    Continue reading...
                  </Link>
                </div>

                {/* Image Section */}
                <div className="h-64 w-full md:h-auto md:w-1/2">
                  <img
                    src={`/storage/${post.image}`}
                    alt={post.name}
                    className="h-full w-full rounded-r-sm object-cover transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
            </Link>
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
