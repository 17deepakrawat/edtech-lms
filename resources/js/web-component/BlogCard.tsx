export default function BlogCard({ post }) {
    return (
      <div className="relative overflow-hidden rounded shadow-sm transition hover:shadow-md bg-white dark:bg-gray-800 group dark:shadow-sm dark:shadow-gray-700">
        {/* Image with Zoom Effect */}
        <div className="overflow-hidden relative">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[2/2] object-cover transition-transform duration-300 group-hover:scale-105"
          />
  
          {/* Overlay: Category and Date */}
          <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-sm shadow-sm backdrop-blur-sm">
            {post.category} — {post.date}
          </div>
        </div>
  
        {/* Card Content */}
        <div className="p-4 bg-gray-50 dark:bg-gray-900">
          <h3 className="mt-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
            {post.title}
          </h3>
  
          {/* Author Section */}
          {post.author && (
            <div className="mt-4 flex items-center gap-3 bg-gray-200 dark:bg-gray-700 p-3 rounded-sm">
              <img
                src={post.authorimg}
                alt={post.author}
                className="w-8 h-8 rounded-full object-cover shadow-sm"
              />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {post.author}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  