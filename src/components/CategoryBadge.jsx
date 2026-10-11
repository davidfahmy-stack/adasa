import { getCategoryStyle } from '../utils/categoryColors';

export default function CategoryBadge({ category, size = 'sm', className = '' }) {
  const style = getCategoryStyle(category);
  const sizeClass = size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-lg border transition-colors ${style.bg} ${sizeClass} ${className}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: style.accent }}
      />
      {category}
    </span>
  );
}
