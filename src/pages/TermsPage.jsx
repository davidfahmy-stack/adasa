import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <Link to="/" className="hover:text-amber-600 transition-colors">
          الرئيسية
        </Link>
        <ChevronRight className="w-3.5 h-3.5 rotate-180 text-gray-400" />
        <span className="text-gray-900 font-bold">شروط الاستخدام</span>
      </nav>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
          <FileText className="w-3.5 h-3.5 text-amber-500" />
          <span>الشروط والأحكام</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          شروط الاستخدام
        </h1>
        <p className="text-sm text-gray-500">
          آخر تحديث: يناير 2026
        </p>
      </div>

      {/* Content */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-amber-500 rounded-full inline-block" />
            <span>1. قبول الشروط</span>
          </h2>
          <p>
            باستخدامك لموقع ومدونة "عدسة"، فإنك تقر وتوافق على الالتزام بجميع بنود وشروط هذه الاتفاقية وسياسة الخصوصية الملحقة بها. إذا كنت لا توافق على هذه الشروط، يرجى التوقف عن استخدام الموقع.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-amber-500 rounded-full inline-block" />
            <span>2. حقوق الملكية الفكرية</span>
          </h2>
          <p>
            جميع النصوص والمقالات والدروس والشروحات المنشورة في "عدسة" هي ملكية فكرية حصرية لمدونة عدسة وكتّابها ومصوريها. يُسمح بمشاركة الروابط واقتباس فقرات قصيرة بشرط ذكر المصدر ورابط المقال الأصلي بوضوح.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-amber-500 rounded-full inline-block" />
            <span>3. الاستخدام المقبول</span>
          </h2>
          <p>
            يلتزم المستخدم بعدم استخدام الموقع لأي غرض غير قانوني أو ضار، بما في ذلك محاولة الوصول غير المصرح به لقواعد البيانات أو انتهاك حقوق أي طرف ثالث.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-amber-500 rounded-full inline-block" />
            <span>4. إخلاء المسؤولية</span>
          </h2>
          <p>
            المحتوى المنشور في المدونة هو لأغراض تعليمية وإرشادية. نبذل قصارى جهدنا لضمان دقة المعلومات المتعلقة بالمعدات والإعدادات، ولكننا لا نتحمل مسؤولية أي أخطاء أو أضرار ناتجة عن التطبيق غير السليم.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-amber-500 rounded-full inline-block" />
            <span>5. التواصل</span>
          </h2>
          <p>
            لأي استفسارات حول شروط الاستخدام، يمكنك التواصل معنا عبر البريد الإلكتروني:{' '}
            <a href="mailto:hello@adasah.com" className="text-amber-600 font-mono font-bold hover:underline">
              hello@adasah.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
