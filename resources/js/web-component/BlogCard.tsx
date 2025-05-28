import { Link } from '@inertiajs/react';

type BlogPost = {
  id?: number;
  slug?: string;
  name: string;
  excerpt?: string;
  image?: string;
  created_at?: string;
  category?: string;
  author_name?: string;
  author_image?: string;
};

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.created_at
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }).format(new Date(post.created_at))
    : '';

  return (
    <div className="group relative overflow-hidden rounded bg-white shadow-sm transition hover:shadow-md dark:bg-gray-800 dark:shadow-gray-700">
      <Link href={`/blog/${post.slug ?? '#'}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden">
          {post.image ? (
            <img
              src={`/storage/${post.image}`}
              alt={post.name}
              className="aspect-[2/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex aspect-[2/2] w-full items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-700">
              No Image
            </div>
          )}

          {/* Category & Date */}
          {(post.category || formattedDate) && (
            <div className="absolute top-3 left-3 rounded-sm bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm shadow-sm">
              {post.category}
              {post.category && formattedDate && ' — '}
              {formattedDate}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-gray-50 p-4 dark:bg-gray-900">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
            {post.name}
          </h3>

          {post.excerpt && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Author */}
          {post.author_name && (
            <div className="mt-4 flex items-center gap-3">
              {post.author_image ? (
                <img
                  src={`/storage/${post.author_image}`}
                  alt={post.author_name}
                  className="h-8 w-8 rounded-full object-cover shadow-sm"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-400 dark:bg-gray-600" />
              )}
              <span className="text-sm text-gray-800 dark:text-gray-200">{post.author_name}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
