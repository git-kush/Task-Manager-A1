import { useState, useEffect } from 'react';
import { Task, FilterType } from './types';
import { api } from './api';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';
import FilterButtons from './components/FilterButtons';
import Toast from './components/Toast';

const STORAGE_KEY = 'tasks';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadTasks = async () => {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        const fetchedTasks = await api.getTasks();
        setTasks(fetchedTasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
      showToast('Failed to load tasks from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string) => {
    setIsAdding(true);
    try {
      const newTask = await api.createTask(title);
      setTasks([...tasks, newTask]);
      showToast('Task added successfully', 'success');
    } catch (error) {
      console.error('Failed to create task:', error);
      const newTask: Task = {
        id: Date.now(),
        title,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      showToast('Task added (offline mode)', 'success');
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Optimistic update
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    ));

    try {
      await api.updateTask(id, !task.isCompleted);
    } catch (error) {
      console.error('Failed to update task:', error);
      // Revert on error
      setTasks(tasks.map(t => 
        t.id === id ? { ...t, isCompleted: task.isCompleted } : t
      ));
      showToast('Failed to update task', 'error');
    }
  };

  const deleteTask = async (id: number) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete) return;

    // Optimistic update
    setTasks(tasks.filter(t => t.id !== id));

    try {
      await api.deleteTask(id);
      showToast('Task deleted', 'success');
    } catch (error) {
      console.error('Failed to delete task:', error);
      // Revert on error
      setTasks([...tasks]);
      showToast('Failed to delete task', 'error');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="glass-strong rounded-2xl px-8 py-6 flex items-center gap-4">
          <div className="spinner"></div>
          <div className="text-white text-lg font-light">Loading tasks...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-6 px-4 sm:py-8 sm:px-6 lg:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-2 tracking-tight">
            Task Manager
          </h1>
          <p className="text-white/60 text-sm sm:text-base font-light">
            Organize your day with elegance
          </p>
        </div>
        
        <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 shadow-2xl">
          <TaskInput onAdd={addTask} isLoading={isAdding} />
        </div>

        <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          <FilterButtons 
            currentFilter={filter} 
            onFilterChange={setFilter}
            taskCounts={{
              all: tasks.length,
              active: tasks.filter(t => !t.isCompleted).length,
              completed: tasks.filter(t => t.isCompleted).length,
            }}
          />
          
          <TaskList 
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;
