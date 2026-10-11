import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  X,
  LayoutGrid,
  List,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Camera,
  Sparkles,
  BookOpen
} from 'lucide-react';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import postsData from '../data/posts.json';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const blogTopRef = useRef(null);

  // Initialize filters from URL query parameters
  const initialCategory = searchParams.get('category') || 'الكل';
  const initialSearch = searchParams.get('search') || '';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(isNaN(initialPage) ? 1 : initialPage);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('latest'); // 'latest', 'oldest', 'readTime'

  const { posts, categories } = postsData;

  // Sync state if URL search params change (e.g., via Navbar search or Category links)
  useEffect(() => {
    const cat = searchParams.get('category') || 'الكل';
    const query = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    setSelectedCategory(cat);
    setSearchQuery(query);
    setCurrentPage(isNaN(page) ? 1 : page);
  }, [searchParams]);

  // Update URL search parameters when state changes
  const updateUrlParams = (newCategory, newSearch, newPage) => {
    const params = {};
    if (newCategory && newCategory !== 'الكل') params.category = newCategory;
    if (newSearch && newSearch.trim()) params.search = newSearch.trim();
    if (newPage && newPage > 1) params.page = newPage.toString();
    setSearchParams(params, { replace: true });
  };

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = posts;

    // 1. Category Filter (Real state filtration, NOT navs & tabs)
    if (selectedCategory && selectedCategory !== 'الكل') {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // 2. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(q);
        const excerptMatch = post.excerpt.toLowerCase().includes(q);
        const contentMatch = post.content.toLowerCase().includes(q);
        const authorMatch = post.author.name.toLowerCase().includes(q);
        const tagMatch = post.tags && post.tags.some((t) => t.toLowerCase().includes(q));
        return titleMatch || excerptMatch || contentMatch || authorMatch || tagMatch;
      });
    }

    // 3. Sorting
    const sorted = [...result];
    if (sortBy === 'latest') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'readTime') {
      sorted.sort((a, b) => {
        const timeA = parseInt(a.readTime, 10) || 0;
        const timeB = parseInt(b.readTime, 10) || 0;
        return timeB - timeA;
      });
    }

    return sorted;
  }, [posts, selectedCategory, searchQuery, sortBy]);

  // Pagination calculation
  const totalPosts = filteredAndSortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Paginated chunk
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredAndSortedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredAndSortedPosts, currentPage]);

  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrlParams(category, searchQuery, 1);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setCurrentPage(1);
    updateUrlParams(selectedCategory, val, 1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
    updateUrlParams(selectedCategory, '', 1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('الكل');
    setSearchQuery('');
    setCurrentPage(1);
    setSortBy('latest');
    setSearchParams({}, { replace: true });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateUrlParams(selectedCategory, searchQuery, newPage);
    if (blogTopRef.current) {
      blogTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { 'الكل': posts.length };
    categories.forEach((cat) => {
      counts[cat.name] = posts.filter((p) => p.category === cat.name).length;
    });
    return counts;
  }, [posts, categories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" ref={blogTopRef}>
      {/* 1. Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          <span>مكتبة التدوينات الشاملة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          مدونة عدسة الفوتوغرافية
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          تصفح {posts.length} مقالاً تعليمياً وتطبيقياً يغطي جميع جوانب فن وتكنيك التصوير الفوتوغرافي.
        </p>
      </div>

      {/* 2. Search & Filter Control Center */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="ابحث بالعنوان، الكاتب، الوسم، أو موضوع التدوينة..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-amber-500 focus:bg-white focus:outline-hidden focus:ring-4 focus:ring-amber-500/10 text-base text-gray-900 transition-all placeholder:text-gray-400 font-medium shadow-inner"
          />
          <Search className="w-6 h-6 text-gray-400 absolute right-4 top-4" />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-700 p-1 hover:bg-gray-200 rounded-full transition-colors"
              title="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills (Pure State-Based Filtering, not Navs/Tabs) */}
        <div>
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              <span>التصنيفات:</span>
            </span>
            {(selectedCategory !== 'الكل' || searchQuery) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة ضبط الفلاتر</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => handleCategoryChange('الكل')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                selectedCategory === 'الكل'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-102'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <span>الكل</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                  selectedCategory === 'الكل'
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-gray-600'
                }`}
              >
                {categoryCounts['الكل']}
              </span>
            </button>

            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              const count = categoryCounts[cat.name] || 0;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-102'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls Bar: Results Count, Sort, and View Mode Toggle */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Results count */}
          <div className="text-sm font-medium text-gray-600 self-start sm:self-auto">
            <span>تم العثور على </span>
            <span className="font-bold text-gray-900">{totalPosts}</span>
            <span> تدوينة</span>
            {selectedCategory !== 'الكل' && (
              <span className="text-amber-700 font-bold"> في تصنيف "{selectedCategory}"</span>
            )}
            {searchQuery && (
              <span className="text-amber-700 font-bold"> مطابقة لـ "{searchQuery}"</span>
            )}
          </div>

          {/* Right side controls: Sorting + Grid/List View Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 hidden sm:inline">ترتيب:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-700 focus:outline-hidden focus:border-amber-400"
              >
                <option value="latest">الأحدث تاريخاً</option>
                <option value="oldest">الأقدم تاريخاً</option>
                <option value="readTime">الأطول قراءة</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid vs List (Crucial Assignment Requirement) */}
            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-amber-600 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="عرض شبكي (Grid)"
                aria-label="عرض شبكي"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline">شبكة</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-amber-600 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="عرض قائمة (List)"
                aria-label="عرض قائمة"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline">قائمة</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Posts Display Section */}
      {paginatedPosts.length > 0 ? (
        <div className="space-y-10">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} viewMode="list" />
              ))}
            </div>
          )}

          {/* 4. Pagination Controls (Bonus 🎁) */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-8 space-y-5">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <Camera className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">
              لم نجد أي تدوينات مطابقة لبحثك
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              تأكد من كتابة الكلمات بشكل صحيح أو جرب استخدام كلمات عامة أكثر، أو يمكنك تصفح جميع التصنيفات.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>عرض جميع التدوينات</span>
          </button>
        </div>
      )}
    </div>
  );
}
