import { usePage, Link } from '@inertiajs/react';
import WebLayouts from '@/layouts/web-layout';
import BlogBanner from '@/web-component/banner/BlogBanner';
import BlogCard from '@/web-component/BlogCard';
import 'swiper/css';
import 'swiper/css/navigation';

type Blog = {
  id: number;
  name: string;
  slug: string;
  excerpt?: string;
  image: string;
  created_at: string | null;
  category: string;
  author_name: string;
  author_image: string;
};

type BlogCategoryGroup = {
  slug: string;
  blogs: Blog[];
};

export default function Blogs() {
  const { slidblogs = [], categories = [] } = usePage().props as {
    slidblogs: Blog[];
    categories: BlogCategoryGroup[];
  };

  return (
    <WebLayouts>
      <div className="container mx-auto px-4 py-8">
        {/* Banner slider for top blogs */}
        {slidblogs.length > 0 && <BlogBanner blogPosts={slidblogs} />}

        {/* Loop through each category group */}
        {categories.length > 0 &&
          categories.map((categoryGroup, index) => (
            categoryGroup.blogs.length > 0 && (
              <section key={index} className="my-8">
                <div className="flex justify-between items-center">
                  <p className="course_title">
                    {categoryGroup.blogs[0]?.category ?? 'Uncategorized'}
                  </p>
                  
                  <Link
                    href={`/category/${categoryGroup.slug}`} // ✅ fixed this line
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {categoryGroup.blogs.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </section>
            )
          ))}
      </div>
    </WebLayouts>
  );
}
