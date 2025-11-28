export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface TodoStore {
  // State
  todos: Todo[];
  loading: boolean;
  error: string | null;
  selectedTodo: Todo | null;

  // Modal states
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isViewModalOpen: boolean;

  // Actions
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => Promise<void>;
  updateTodo: (id: string, todo: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;

  // Modal actions
  openAddModal: () => void;
  closeAddModal: () => void;
  openEditModal: (todo: Todo) => void;
  closeEditModal: () => void;
  openViewModal: (todo: Todo) => void;
  closeViewModal: () => void;

  // Error handling
  setError: (error: string | null) => void;
  clearError: () => void;
}
