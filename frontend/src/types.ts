export interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';
