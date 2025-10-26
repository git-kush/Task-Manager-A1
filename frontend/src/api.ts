import axios from 'axios';
import { Task } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

export const api = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  },

  createTask: async (title: string): Promise<Task> => {
    const response = await axios.post<Task>(API_URL, { title });
    return response.data;
  },

  updateTask: async (id: number, isCompleted: boolean): Promise<Task> => {
    const response = await axios.put<Task>(`${API_URL}/${id}`, { isCompleted });
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
};
