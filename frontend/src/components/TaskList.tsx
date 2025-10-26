import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="text-white/40 text-base sm:text-lg font-light">
          No tasks found
        </div>
        <div className="text-white/20 text-xs sm:text-sm font-light mt-2">
          Add a task to get started
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
