import { FilterType } from '../types';

interface FilterButtonsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

function FilterButtons({ currentFilter, onFilterChange, taskCounts }: FilterButtonsProps) {
  const filters: { type: FilterType; label: string; count: number }[] = [
    { type: 'all', label: 'All', count: taskCounts.all },
    { type: 'active', label: 'Active', count: taskCounts.active },
    { type: 'completed', label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 pb-6 border-b border-white/10">
      {filters.map(({ type, label, count }) => (
        <button
          key={type}
          onClick={() => onFilterChange(type)}
          className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all text-sm sm:text-base font-light
                     active:scale-95 ${
            currentFilter === type
              ? 'bg-white/90 text-indigo-900 shadow-lg font-medium'
              : 'glass text-white/80 hover:bg-white/10 hover:text-white'
          }`}
        >
          {label} <span className="opacity-60">({count})</span>
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
