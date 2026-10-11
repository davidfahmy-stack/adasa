import { Link } from 'react-router-dom';
import { Shield, Lock, ChevronRight } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <Link to="/" className="hover:text-amber-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180 text-gray-400" />
        <span className="text-gray-900 font-bold">سياسة الخصوصية</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>حماية البيانات والخصوصية</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          سياسة الخصوصية
        </h1>
        <p className="text-sm text-gray-500">
          آخر تحديث: يناير 2026
        </p>
      </div>

      {/* Content */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-emerald-500 rounded-full inline-block" />
            <span>1. التزامنا بخصوصيتك</span>
          </h2>
          <p>
            في "عدسة"، نعتبر خصوصية زوارنا وقرائنا ذات أهمية بالغة. توضح هذه الوثيقة أنواع المعلومات الشخصية التي نقوم بجمعها وكيفية استخدامها وحمايتها وفقاً لأعلى المعايير.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-emerald-500 rounded-full inline-block" />
            <span>2. البيانات التي نجمعها</span>
          </h2>
          <p>
            - **بيانات النشرة البريدية:** عندما تشترك في نشرتنا الإخبارية، نحتفظ فقط بعنوان بريدك الإلكتروني لإرسال المقالات الأسبوعية والتحديثات.<br />
            - **بيانات التصفح:** نقوم بجمع معلومات إحصائية عامة مجهولة المصدر (مثل نوع المتصفح والصفحات الأكثر زيارة) بهدف تحسين تجربة القراءة وتطوير الموقع.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-emerald-500 rounded-full inline-block" />
            <span>3. ملفات تعريف الارتباط (Cookies)</span>
          </h2>
          <p>
            قد نستخدم ملفات تعريف الارتباط البسيطة لتذكر تفضيلاتك (مثل طريقة العرض المفضلة لديك بين الشبكة والقائمة) لتوفير تجربة مخصصة عند عودتك للمدونة.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-emerald-500 rounded-full inline-block" />
            <span>4. عدم مشاركة البيانات</span>
          </h2>
          <p>
            نحن لا نبيع أو نؤجر أو نشارك أي معلومات شخصية تخص مستخدمينا مع أي أطراف ثالثة لأغراض تسويقية أو تجارية على الإطلاق.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-emerald-500 rounded-full inline-block" />
            <span>5. للتواصل والاستفسار</span>
          </h2>
          <p>
            إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية الخاصة بنا، يسعدنا تواصلك معنا على:{' '}
            <a href="mailto:hello@adasah.com" className="text-emerald-600 font-mono font-bold hover:underline">
              hello@adasah.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
