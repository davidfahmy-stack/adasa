export const categoryColorMap = {
  'إضاءة': {
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    badge: 'bg-emerald-500 text-white',
    accent: '#10b981',
    pill: 'bg-emerald-100 text-emerald-800'
  },
  'بورتريه': {
    bg: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
    badge: 'bg-purple-500 text-white',
    accent: '#a855f7',
    pill: 'bg-purple-100 text-purple-800'
  },
  'مناظر طبيعية': {
    bg: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
    badge: 'bg-blue-500 text-white',
    accent: '#3b82f6',
    pill: 'bg-blue-100 text-blue-800'
  },
  'تقنيات': {
    bg: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    badge: 'bg-amber-500 text-white',
    accent: '#f59e0b',
    pill: 'bg-amber-100 text-amber-800'
  },
  'معدات': {
    bg: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
    badge: 'bg-teal-500 text-white',
    accent: '#14b8a6',
    pill: 'bg-teal-100 text-teal-800'
  },
};

export function getCategoryStyle(category) {
  return categoryColorMap[category] || {
    bg: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
    badge: 'bg-gray-700 text-white',
    accent: '#6b7280',
    pill: 'bg-gray-100 text-gray-800'
  };
}
