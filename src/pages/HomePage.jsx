import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  BookOpen,
  Camera,
  SunMedium,
  User,
  Trees,
  Sliders,
  Disc,
  Compass,
  CheckCircle2,
  TrendingUp,
  Aperture
} from 'lucide-react';
import PostCard from '../components/PostCard';
import postsData from '../data/posts.json';

const categoryIcons = {
  'إضاءة': SunMedium,
  'بورتريه': User,
  'مناظر طبيعية': Trees,
  'تقنيات': Sliders,
  'معدات': Disc,
};

const categoryDescriptions = {
  'إضاءة': 'أسرار الإضاءة الطبيعية والصناعية، تصوير الساعة الذهبية، وتوزيع الظلال.',
  'بورتريه': 'فن التقاط روح وتعابير الشخصيات والتواصل الإنساني مع الموديل.',
  'مناظر طبيعية': 'توثيق جمال الطبيعة، الجبال، الشواطئ، والتقاط تفاصيل الأرض.',
  'تقنيات': 'مثلث التعريض الضوئي، قواعد التكوين، وتقنيات التصوير الاحترافي.',
  'معدات': 'دليل اختيار الكاميرات والعدسات والمعدات المساعدة المناسبة لكل أسلوب.',
};

export default function HomePage() {
  const { posts, categories, siteInfo } = postsData;

  // Featured posts (featured: true)
  const featuredPosts = posts.filter((p) => p.featured);

  // Latest 6 posts
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="space-y-24 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/90 border border-amber-300/80 text-amber-800 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>مرحباً بكم في {siteInfo.name} - منصة المصورين الأولى</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.2]">
              اكتشف سحر{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                التصوير الفوتوغرافي
              </span>{' '}
              بأعين المحترفين
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal">
              {siteInfo.description}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-base shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <BookOpen className="w-5 h-5" />
                <span>تصفح كل التدوينات ({posts.length})</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-base border border-gray-200 shadow-xs hover:border-gray-300 transition-all"
              >
                <Compass className="w-5 h-5 text-amber-500" />
                <span>عن مدونة عدسة</span>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 border-t border-gray-200/60 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-white/80 border border-gray-100 shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-amber-600">28+</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">تدوينة احترافية</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 border border-gray-100 shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-amber-600">5</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">تصنيفات تخصصية</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 border border-gray-100 shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-amber-600">100%</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">محتوى عربي دقيق</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/80 border border-gray-100 shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-amber-600">10k+</span>
                <span className="text-xs sm:text-sm text-gray-500 font-medium">قارئ ومصور</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>مختارات المحرر</span>
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                التدوينات المميزة ⭐
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                مقالات أساسية ينصح بقراءتها للتعمق في أسرار التصوير الفوتوغرافي
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 self-start sm:self-auto group"
            >
              <span>عرض جميع التدوينات</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} viewMode="grid" />
            ))}
          </div>
        </section>
      )}

      {/* 3. Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>تنظيم محكم</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            استكشف التصنيفات
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            اختر التخصص الذي تود تطويره واستمتع بمقالات متسلسلة أعدت بعناية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const IconComponent = categoryIcons[cat.name] || Camera;
            const description = categoryDescriptions[cat.name] || 'مقالات متخصصة في هذا المجال.';
            const countInPosts = posts.filter((p) => p.category === cat.name).length;

            return (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="group bg-white p-7 rounded-3xl border border-gray-200/80 hover:border-amber-400 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-amber-500 text-amber-600 group-hover:text-white flex items-center justify-center transition-all duration-300 mb-5 shadow-xs">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    {description}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-amber-600">
                  <span>{countInPosts} مقال متوفر</span>
                  <span className="flex items-center gap-1">
                    <span>استكشف</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Quick All-Categories Box */}
          <Link
            to="/blog"
            className="group bg-gradient-to-br from-gray-900 to-gray-800 text-white p-7 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-amber-400 flex items-center justify-center mb-5">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">كل التدوينات</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                تصفح المكتبة الكاملة التي تشمل {posts.length} دليلاً تعليمياً مع إمكانية البحث والفلترة.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-700 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>{posts.length} مقال إجمالي</span>
              <span className="flex items-center gap-1">
                <span>تصفح الكل</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Latest Articles Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>جديد المدونة</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              أحدث التدوينات
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              آخر ما كتبه نخبة المصورين في مدونة عدسة
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 hover:border-amber-500 text-gray-800 hover:text-amber-600 text-sm font-bold bg-white transition-all shadow-xs self-start sm:self-auto"
          >
            <span>مشاهدة الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} viewMode="grid" />
          ))}
        </div>

        {/* Big Bottom Action */}
        <div className="mt-14 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            <span>عرض كافة المقالات مع خيارات البحث والفلترة</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 5. Inspirational Quote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8 sm:p-14 shadow-xl border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <Aperture className="w-12 h-12 text-amber-500 mb-6" />
            <blockquote className="text-2xl sm:text-3xl font-extrabold leading-snug mb-4">
              "الصورة الناجحة ليست تلك التي تلتقطها الكاميرا الأغلى سعراً، بل تلك التي تنبض بروح المصور وحكايته."
            </blockquote>
            <p className="text-amber-400 font-medium text-sm">
              — فلسفة فريق عدسة
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
