import { Link } from 'react-router-dom';
import { Aperture, Mail, ArrowUpRight, Heart, Sparkles } from 'lucide-react';
import postsData from '../data/posts.json';

export default function Footer() {
  const { siteInfo, categories } = postsData;

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-24">
      {/* Upper Footer with Newsletter Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 text-center lg:text-right max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-3 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>انضم إلى أكثر من 10,000 مصور</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mb-3">
                اشترك في نشرة عدسة الأسبوعية
              </h3>
              <p className="text-white/80 text-sm sm:text-base">
                نصائح حصرية، كواليس جلسات تصوير، ومراجعات لأحدث الكاميرات والعدسات مباشرة إلى بريدك الإلكتروني.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('شكراً لاشتراكك في نشرة عدسة الإخبارية!');
              }}
              className="relative z-10 w-full sm:w-auto flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="أدخل بريدك الإلكتروني..."
                className="px-5 py-3.5 rounded-2xl bg-white/95 text-gray-900 placeholder-gray-500 text-sm focus:outline-hidden focus:ring-2 focus:ring-white w-full sm:w-80 shadow-md"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gray-950 hover:bg-black text-white font-bold rounded-2xl text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
              >
                اشتراك مجاني
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Aperture className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white">{siteInfo.name}</span>
                <span className="text-xs text-amber-400 font-medium">{siteInfo.tagline}</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {siteInfo.description}
            </p>
            <div className="flex items-center gap-2 pt-2 text-sm text-gray-400">
              <Mail className="w-4 h-4 text-amber-500" />
              <a
                href={`mailto:${siteInfo.email}`}
                className="hover:text-amber-400 transition-colors font-mono"
              >
                {siteInfo.email}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 relative inline-block">
              روابط رئيسية
              <span className="block h-0.5 w-8 bg-amber-500 rounded-full mt-1"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                  جميع المقالات
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 relative inline-block">
              التصنيفات
              <span className="block h-0.5 w-8 bg-amber-500 rounded-full mt-1"></span>
            </h4>
            <ul className="space-y-3 text-sm">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={`/blog?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-amber-400 transition-colors inline-flex items-center justify-between w-full group"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 group-hover:bg-amber-500/20 group-hover:text-amber-300 transition-colors">
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 relative inline-block">
              تابعنا
              <span className="block h-0.5 w-8 bg-amber-500 rounded-full mt-1"></span>
            </h4>
            <p className="text-xs text-gray-400 mb-4">
              كن جزءاً من مجتمعنا على شبكات التواصل الاجتماعي.
            </p>
            <ul className="space-y-2 text-sm">
              {Object.entries(siteInfo.social).map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-gray-400 hover:text-amber-400 transition-colors py-1 group"
                  >
                    <span className="capitalize">{platform}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {siteInfo.name} - عالم التصوير الفوتوغرافي
          </p>
          <p className="flex items-center gap-1.5">
            <span>صُنع بشغف للمصورين والمبدعين العرب</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
