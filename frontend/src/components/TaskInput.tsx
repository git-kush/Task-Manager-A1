import { useState } from 'react';

interface TaskInputProps {
  onAdd: (title: string) => void;
  isLoading?: boolean;
}

function TaskInput({ onAdd, isLoading = false }: TaskInputProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && !isLoading) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        disabled={isLoading}
        className="flex-1 px-4 py-3 sm:py-3.5 glass rounded-xl text-white placeholder-white/40 
                   focus:outline-none focus:ring-2 focus:ring-white/30 transition-all
                   text-sm sm:text-base font-light disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="px-6 py-3 sm:py-3.5 bg-white/90 text-indigo-900 rounded-xl 
                   hover:bg-white transition-all font-medium text-sm sm:text-base
                   shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                   flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="spinner-small"></div>
            <span>Adding...</span>
          </>
        ) : (
          'Add Task'
        )}
      </button>
    </form>
  );
}

export default TaskInput;
