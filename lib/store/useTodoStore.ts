import { create } from 'zustand';
import { TodoStore, Todo } from '@/lib/types';
import { todoAPI } from '@/lib/api/todoAPI';

const INITIAL_TODOS: Todo[] = [
  {
    id: '1',
    title: 'Setup Zustand Store',
    description: 'Create and configure the Zustand store for state management',
    completed: true,
    createdAt: new Date('2025-11-20'),
    dueDate: new Date('2025-11-22'),
    priority: 'high',
  },
  {
    id: '2',
    title: 'Create Modal Components',
    description: 'Build Add, Edit, and View modal components',
    completed: true,
    createdAt: new Date('2025-11-21'),
    dueDate: new Date('2025-11-24'),
    priority: 'high',
  },
  {
    id: '3',
    title: 'Implement API Integration',
    description: 'Integrate Axios for API calls',
    completed: false,
    createdAt: new Date('2025-11-22'),
    dueDate: new Date('2025-11-25'),
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Add Styling with Tailwind',
    description: 'Style components using Tailwind CSS',
    completed: false,
    createdAt: new Date('2025-11-23'),
    dueDate: new Date('2025-11-28'),
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Write Unit Tests',
    description: 'Create comprehensive unit tests for the application',
    completed: false,
    createdAt: new Date('2025-11-23'),
    dueDate: new Date('2025-11-30'),
    priority: 'low',
  },
];

export const useTodoStore = create<TodoStore>((set, get) => ({
  // Initial state
  todos: INITIAL_TODOS,
  loading: false,
  error: null,
  selectedTodo: null,
  isAddModalOpen: false,
  isEditModalOpen: false,
  isViewModalOpen: false,

  // Fetch todos
  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      // In a real app, this would call the API:
      // const todos = await todoAPI.getAllTodos();
      // For now, we're using the initial data
      set({ todos: INITIAL_TODOS, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch todos';
      set({ error: errorMessage, loading: false });
    }
  },

  // Add todo
  addTodo: async (newTodo) => {
    set({ loading: true, error: null });
    try {
      // In a real app:
      // const createdTodo = await todoAPI.createTodo(newTodo);
      const createdTodo: Todo = {
        ...newTodo,
        id: Date.now().toString(),
        createdAt: new Date(),
      };

      set((state) => ({
        todos: [createdTodo, ...state.todos],
        loading: false,
      }));

      get().closeAddModal();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to add todo';
      set({ error: errorMessage, loading: false });
    }
  },

  // Update todo
  updateTodo: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      // In a real app:
      // const updated = await todoAPI.updateTodo(id, updatedData);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedData } : todo
        ),
        loading: false,
      }));

      get().closeEditModal();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update todo';
      set({ error: errorMessage, loading: false });
    }
  },

  // Delete todo
  deleteTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      // In a real app:
      // await todoAPI.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to delete todo';
      set({ error: errorMessage, loading: false });
    }
  },

  // Toggle todo
  toggleTodo: async (id) => {
    set({ loading: true, error: null });
    try {
      // In a real app:
      // const updated = await todoAPI.toggleTodo(id);
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to toggle todo';
      set({ error: errorMessage, loading: false });
    }
  },

  // Modal actions
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  openEditModal: (todo) =>
    set({ isEditModalOpen: true, selectedTodo: todo }),
  closeEditModal: () =>
    set({ isEditModalOpen: false, selectedTodo: null }),

  openViewModal: (todo) =>
    set({ isViewModalOpen: true, selectedTodo: todo }),
  closeViewModal: () =>
    set({ isViewModalOpen: false, selectedTodo: null }),

  // Error handling
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
