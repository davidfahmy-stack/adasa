import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Tag,
  BookOpen,
  User,
  Sparkles,
  Camera,
  ChevronRight
} from 'lucide-react';
import CategoryBadge from '../components/CategoryBadge';
import PostCard from '../components/PostCard';
import postsData from '../data/posts.json';

export default function BlogDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const { posts } = postsData;

  // Match post by id (number or string) or slug
  const post = posts.find(
    (p) => String(p.id) === String(id) || p.slug === id
  );

  // If post not found
  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <Camera className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-gray-900">
          عذراً، المقال المطلوب غير موجود!
        </h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          ربما تم حذف هذا المقال أو أن الرابط الذي اتبعته غير صحيح.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>العودة لصفحة المدونة</span>
        </Link>
      </div>
    );
  }

  // Related posts (from same category, excluding current post)
  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Next and Previous posts
  const currentIndex = posts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Copy link handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Render markdown content sections
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const parts = content.split('\n\n');

    return parts.map((part, index) => {
      // Check for h2 heading (##)
      if (part.startsWith('## ')) {
        const headingText = part.replace(/^##\s+/, '');
        return (
          <div key={index} className="pt-6 pb-2">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-3">
              <span className="w-2 h-7 bg-amber-500 rounded-full inline-block" />
              <span>{headingText}</span>
            </h2>
          </div>
        );
      }

      // Check for bullet list
      if (part.includes('\n- ') || part.startsWith('- ')) {
        const items = part.split('\n').filter((l) => l.startsWith('- '));
        return (
          <ul key={index} className="space-y-2.5 my-4 pr-6 list-disc list-inside text-gray-700 leading-relaxed">
            {items.map((item, itemIdx) => (
              <li key={itemIdx} className="text-base sm:text-lg">
                {item.replace(/^- /, '')}
              </li>
            ))}
          </ul>
        );
      }

      // Standard paragraph
      return (
        <p
          key={index}
          className="text-gray-700 text-base sm:text-lg leading-[1.8] sm:leading-[1.9] font-normal"
        >
          {part}
        </p>
      );
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav aria-label="مسار التصفح" className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <Link to="/" className="hover:text-amber-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180 text-gray-400" />
        <Link to="/blog" className="hover:text-amber-600 transition-colors">
          المدونة
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180 text-gray-400" />
        <span className="text-gray-900 font-bold truncate max-w-xs sm:max-w-sm">
          {post.title}
        </span>
      </nav>

      {/* 2. Article Header */}
      <header className="space-y-6">
        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-3">
          <CategoryBadge category={post.category} size="lg" />
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500">
            <Calendar className="w-4 h-4 text-amber-500" />
            {post.date}
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-500">
            <Clock className="w-4 h-4 text-amber-500" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-[1.25] tracking-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author card & Share Actions */}
        <div className="pt-6 border-t border-b border-gray-100 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Author */}
          <div className="flex items-center gap-3.5">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-300 shadow-xs"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';
              }}
            />
            <div>
              <p className="text-base font-bold text-gray-900">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {post.author.role}
              </p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 ml-1">مشاركة:</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl border border-gray-200 hover:border-amber-400 bg-white text-gray-700 hover:text-amber-600 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
              title="نسخ الرابط"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ</span>
                </>
              )}
            </button>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-gray-200 hover:border-blue-400 bg-white text-gray-700 hover:text-blue-500 transition-colors text-xs font-bold"
              title="مشاركة على X"
            >
              X / تويتر
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-gray-200 hover:border-blue-600 bg-white text-gray-700 hover:text-blue-600 transition-colors text-xs font-bold"
              title="مشاركة على فيسبوك"
            >
              فيسبوك
            </a>
          </div>
        </div>
      </header>

      {/* 3. Main Featured Image */}
      <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100 max-h-[500px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=400&fit=crop';
          }}
        />
      </div>

      {/* 4. Article Full Content */}
      <div className="prose prose-lg max-w-none space-y-6 pt-4">
        {renderFormattedContent(post.content)}
      </div>

      {/* 5. Tags Section */}
      {post.tags && post.tags.length > 0 && (
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-3">
            <Tag className="w-4 h-4 text-amber-500" />
            <span>الوسوم والكلمات الدلالية:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?search=${encodeURIComponent(tag)}`}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-800 text-xs font-bold transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 6. Author Bio Box */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-md shrink-0"
        />
        <div className="text-center sm:text-right space-y-2">
          <span className="text-xs font-bold text-amber-700">عن الكاتب</span>
          <h4 className="text-xl font-bold text-gray-900">{post.author.name}</h4>
          <p className="text-xs text-amber-800 font-semibold">{post.author.role}</p>
          <p className="text-sm text-gray-600 leading-relaxed">
            كاتب ومصور شغوف يشارك تجاربه الميدانية ونصائحه الاحترافية لمساعدة مجتمع المصورين في تطوير مهاراتهم وتحقيق رؤيتهم البصرية.
          </p>
        </div>
      </div>

      {/* 7. Next / Previous Article Navigation */}
      <div className="pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevPost ? (
          <Link
            to={`/blog/${prevPost.id}`}
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all group text-right flex flex-col justify-between"
          >
            <span className="text-xs font-bold text-gray-400 flex items-center gap-1 mb-2">
              <ArrowRight className="w-3.5 h-3.5 text-amber-500 group-hover:translate-x-1 transition-transform" />
              <span>المقال السابق</span>
            </span>
            <p className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
              {prevPost.title}
            </p>
          </Link>
        ) : (
          <div />
        )}

        {nextPost ? (
          <Link
            to={`/blog/${nextPost.id}`}
            className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all group text-left flex flex-col justify-between"
          >
            <span className="text-xs font-bold text-gray-400 flex items-center gap-1 justify-end mb-2">
              <span>المقال التالي</span>
              <ArrowLeft className="w-3.5 h-3.5 text-amber-500 group-hover:-translate-x-1 transition-transform" />
            </span>
            <p className="text-sm font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2 text-right">
              {nextPost.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* 8. Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900">
              مقالات ذات صلة في تصنيف "{post.category}"
            </h3>
            <Link
              to={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>المزيد في {post.category}</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => (
              <PostCard key={related.id} post={related} viewMode="grid" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
