import axios from 'axios';
import { Todo } from '@/lib/types';

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any authentication tokens here if needed
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const todoAPI = {
  // Fetch all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get<Todo[]>('/todos');
    return response.data;
  },

  // Fetch single todo
  getTodo: async (id: string): Promise<Todo> => {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  createTodo: async (todo: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todos', todo);
    return response.data;
  },

  // Update todo
  updateTodo: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const response = await apiClient.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  },

  // Delete todo
  deleteTodo: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },

  // Toggle todo completion
  toggleTodo: async (id: string): Promise<Todo> => {
    const response = await apiClient.patch<Todo>(`/todos/${id}/toggle`);
    return response.data;
  },
};

export default apiClient;
