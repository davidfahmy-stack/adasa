import { Link } from 'react-router-dom';
import { Aperture, Camera, Target, Heart, Award, Users, BookOpen, ArrowLeft } from 'lucide-react';
import postsData from '../data/posts.json';

export default function AboutPage() {
  const { siteInfo, posts } = postsData;

  // Extract unique authors
  const authorsMap = {};
  posts.forEach((p) => {
    if (!authorsMap[p.author.name]) {
      authorsMap[p.author.name] = p.author;
    }
  });
  const authors = Object.values(authorsMap);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* 1. Header Banner */}
      <section className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
          <Aperture className="w-4 h-4 text-amber-500" />
          <span>من نحن</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
          عن منصة {siteInfo.name}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          {siteInfo.description}
        </p>
      </section>

      {/* 2. Story & Mission */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-amber-600 font-bold text-sm">
            <Target className="w-4 h-4" />
            <span>رسالتنا ورؤيتنا</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            تمكين المصورين العرب من صناعة فن مؤثر ومبتكر
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            انطلقت "عدسة" بهدف سد الفجوة في المحتوى التعليمي العربي المتخصص في مجال التصوير الفوتوغرافي. نؤمن بأن كل شخص يحمل في داخله عيناً فنية تستحق أن ترى النور وتتسلح بالمعرفة التقنية الدقيقة.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            سواء كنت تلتقط أول صورة بهاتفك الذكي أو تدير استوديو تصوير تجاري متقدم، ستجد في "عدسة" رفيقك الدائم لتعلم الجديد وصقل مهاراتك.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg h-72 sm:h-80 bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop"
            alt="كاميرا ومصور"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
            قيمنا ومبادئنا
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            الأسس التي ننطلق منها في صياغة كل محتوى ومقال
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">الجودة والاحترافية</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              كل معلومة وتلميحة يتم مراجعتها وتجربتها ميدانياً من قبل مصورين ممارسين.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">الشغف والمشاركة</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              نشارك المعرفة بحب ودون احتكار للأسرار لنرتقي بالمجتمع الفوتوغرافي بأكمله.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">المجتمع التفاعلي</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              نبني منصة تشجع الحوار البناء وتبادل الآراء والخبرات بين مختلف الأجيال.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Contributing Authors */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
            فريق الكتّاب والمصورين
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            نخبة من المصورين المبدعين الذين يثرون مدونة عدسة بمقالاتهم
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {authors.map((author) => (
            <div
              key={author.name}
              className="bg-white p-4 rounded-2xl border border-gray-200/80 text-center space-y-2 hover:border-amber-400 hover:shadow-md transition-all"
            >
              <img
                src={author.avatar}
                alt={author.name}
                className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-amber-300"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop';
                }}
              />
              <p className="font-bold text-sm text-gray-900 truncate">{author.name}</p>
              <p className="text-xs text-amber-700 truncate">{author.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-black">
          جاهز لتبدأ رحلتك في عالم التصوير؟
        </h3>
        <p className="text-white/90 text-sm max-w-xl mx-auto">
          استكشف مقالاتنا اليوم وطبق ما تتعلمه فوراً بعدستك الخاصة.
        </p>
        <div className="pt-2">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-950 hover:bg-black text-white font-bold text-sm rounded-2xl shadow-lg transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>تصفح المدونة الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
