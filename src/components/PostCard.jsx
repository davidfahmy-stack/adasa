import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, Tag } from 'lucide-react';
import CategoryBadge from './CategoryBadge';

export default function PostCard({ post, viewMode = 'grid' }) {
  if (viewMode === 'list') {
    return (
      <article className="group bg-white rounded-3xl border border-gray-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row gap-6 p-5 sm:p-6">
        {/* List Image */}
        <div className="relative md:w-72 lg:w-80 h-56 md:h-auto shrink-0 rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop';
            }}
          />
          <div className="absolute top-3 right-3">
            <CategoryBadge category={post.category} />
          </div>
          {post.featured && (
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-white shadow-md">
              مميز ⭐
            </span>
          )}
        </div>

        {/* List Content */}
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-3 leading-snug">
              <Link to={`/blog/${post.id}`}>
                {post.title}
              </Link>
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 sm:line-clamp-3">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="hidden sm:flex flex-wrap items-center gap-1.5 mb-4">
                <Tag className="w-3 h-3 text-gray-400 ml-1" />
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-md bg-gray-100 text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer of list item */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4 mt-auto">
            {/* Author */}
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-200"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';
                }}
              />
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">
                  {post.author.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {post.author.role}
                </p>
              </div>
            </div>

            {/* Read More Link */}
            <Link
              to={`/blog/${post.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 group-hover:translate-x-[-4px] transition-transform"
            >
              <span>اقرأ التدوينة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Grid Mode (Default)
  return (
    <article className="group bg-white rounded-3xl border border-gray-200/90 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1">
      {/* Grid Thumbnail */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-gray-100">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop';
          }}
        />
        <div className="absolute top-3.5 right-3.5">
          <CategoryBadge category={post.category} />
        </div>
        {post.featured && (
          <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-white shadow-md">
            مميز ⭐
          </span>
        )}
      </div>

      {/* Grid Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-500" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-3 leading-snug line-clamp-2">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer info: Author & CTA */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover border border-amber-200"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';
              }}
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-900 truncate">
                {post.author.name}
              </p>
              <p className="text-[11px] text-gray-500 truncate">
                {post.author.role}
              </p>
            </div>
          </div>

          {/* Read Arrow */}
          <Link
            to={`/blog/${post.id}`}
            aria-label={`اقرأ مقال ${post.title}`}
            className="w-9 h-9 rounded-xl bg-amber-50 group-hover:bg-amber-500 text-amber-600 group-hover:text-white flex items-center justify-center transition-all duration-200 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
