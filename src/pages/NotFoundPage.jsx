import { Link } from 'react-router-dom';
import { Camera, Home, BookOpen, AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/90 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 404 Illustration Badge */}
        <div className="relative inline-flex items-center justify-center">
          <span className="text-8xl sm:text-9xl font-black text-amber-500/20 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30 animate-bounce">
              <Camera className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>خطأ 404: الصفحة غير موجودة</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            عفواً، الصورة غير واضحة!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
            يبدو أن الزاوية التي التقطتها غير صحيحة، أو أن الرابط الذي تحاول الوصول إليه لم يعد موجوداً أو تم نقله لمسار آخر.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/25 hover:shadow-lg transition-all"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
          <Link
            to="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>تصفح المدونة</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
