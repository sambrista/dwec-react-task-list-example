import axios from 'axios';
import type { Task } from '../types/Task';

const API_URL = 'http://localhost:3000/tasks';

export const taskService = {
  getAll(): Promise<Task[]> {
    return axios.get<Task[]>(API_URL).then(res => res.data);
  },

  create(task: Omit<Task, 'id'>): Promise<Task> {
    return axios.post<Task>(API_URL, task).then(res => res.data);
  },

  update(task: Task): Promise<Task> {
    return axios.put<Task>(`${API_URL}/${task.id}`, task).then(res => res.data);
  },

  delete(id: number): Promise<void> {
    return axios.delete(`${API_URL}/${id}`).then(() => {});
  }
};