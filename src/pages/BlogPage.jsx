import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostCard, PostListCard } from '../components/PostCard';
import postsData from '../data/posts.json';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { posts, categories } = postsData;

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const resultsRef = useRef(null);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollToResults();
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(38,38,38,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(38,38,38,0.5)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="section-label inline-flex items-center gap-2 mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            مدونتنا
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            استكشف <span className="gradient-text">مقالاتنا</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ابحث في المقالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-dark w-full px-5 py-3 pr-12"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30'
                }`}
              >
                جميع المقالات
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name.toLowerCase())}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.name.toLowerCase()
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                      : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/30'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Container */}
      <div ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-[146px]">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-neutral-400">
            عرض <span className="font-bold text-white">{filteredPosts.length}</span>{' '}
            {filteredPosts.length === 1 ? 'مقالة' : 'مقالات'}
            {selectedCategory !== 'all' && (
              <span>
                {' '}
                في <span className="font-bold text-orange-500 capitalize">{selectedCategory}</span>
              </span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#161616] border border-[#262626] rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="عرض شبكي"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'
                }`}
                title="عرض قائمة"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-sm text-neutral-500 hover:text-orange-500 flex items-center gap-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                مسح الفلاتر
              </button>
            )}
          </div>
        </div>

        {currentPosts.length > 0 ? (
          <>
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post, idx) => (
                  <PostCard key={post.id} post={post} index={idx} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {currentPosts.map((post, idx) => (
                  <PostListCard key={post.id} post={post} index={idx} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    currentPage === 1
                      ? 'bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed'
                      : 'bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a]'
                  }`}
                >
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((num, idx) =>
                    num === '...' ? (
                      <span key={`ellipsis-${idx}`} className="px-3 py-2 text-neutral-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={num}
                        onClick={() => handlePageChange(num)}
                        className={`min-w-[44px] h-11 rounded-xl text-sm font-medium transition-all duration-300 ${
                          currentPage === num
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                            : 'bg-[#161616] text-neutral-400 border border-[#262626] hover:border-orange-500/50 hover:text-white'
                        }`}
                      >
                        {num}
                      </button>
                    )
                  )}
                </div>
                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-xl border transition-all duration-300 ${
                    currentPage === totalPages
                      ? 'bg-[#0a0a0a] border-[#262626] text-neutral-600 cursor-not-allowed'
                      : 'bg-[#161616] border-[#262626] text-white hover:border-orange-500/50 hover:bg-[#1a1a1a]'
                  }`}
                >
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <p className="text-center text-neutral-500 mt-4 text-sm">
                صفحة {currentPage} من {totalPages}
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-[#161616] border border-[#262626] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">لا توجد مقالات</h3>
            <p className="text-neutral-400 mb-6">حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              إعادة تعيين الفلاتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
