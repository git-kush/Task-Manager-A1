import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 glass rounded-xl 
                    hover:bg-white/10 transition-all group">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg cursor-pointer accent-white/90 
                   focus:ring-2 focus:ring-white/30 transition-all flex-shrink-0"
      />
      <span
        className={`flex-1 text-sm sm:text-base font-light transition-all ${
          task.isCompleted
            ? 'line-through text-white/40'
            : 'text-white'
        }`}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-300 
                   hover:bg-red-500/20 rounded-lg transition-all font-light
                   opacity-70 group-hover:opacity-100 active:scale-95 flex-shrink-0"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
