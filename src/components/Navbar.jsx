import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Camera, Aperture, Search, Menu, X, BookOpen, Home, Info, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/blog?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-2 ${
      isActive
        ? 'bg-amber-50 text-amber-700 shadow-sm font-bold border border-amber-200/60'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center gap-3 ${
      isActive
        ? 'bg-amber-500 text-white font-bold shadow-md'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/80 transition-shadow duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
              <Aperture className="w-7 h-7 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-amber-600 transition-colors">
                  عدسة
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              </div>
              <span className="text-xs text-gray-500 font-medium">عالم التصوير الفوتوغرافي</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </NavLink>
            <NavLink to="/blog" className={navLinkClass}>
              <BookOpen className="w-4 h-4" />
              <span>المدونة</span>
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              <Info className="w-4 h-4" />
              <span>من نحن</span>
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Search Toggle / Form */}
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center animate-fade-in">
                <input
                  type="text"
                  placeholder="ابحث عن مقال أو فكرة..."
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  autoFocus
                  className="w-64 pl-9 pr-4 py-2 text-sm bg-gray-50 border border-amber-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute left-2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors flex items-center gap-2 text-sm border border-transparent hover:border-amber-200"
                title="بحث سريع"
              >
                <Search className="w-5 h-5" />
                <span className="text-xs font-medium text-gray-400">بحث</span>
              </button>
            )}

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4" />
              <span>استكشف المقالات</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-hidden border border-gray-200"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-xl animate-fade-in">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
          </form>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-2">
            <NavLink
              to="/"
              end
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>الرئيسية</span>
            </NavLink>
            <NavLink
              to="/blog"
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5" />
              <span>المدونة</span>
            </NavLink>
            <NavLink
              to="/about"
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="w-5 h-5" />
              <span>من نحن</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
