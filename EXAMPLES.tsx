// Example usage of useTodoStore hook in custom components
// This file is for reference and can be deleted

import { useTodoStore } from '@/lib/store/useTodoStore';
import { Todo } from '@/lib/types';

// ============================================
// Example 1: Simple Todo Counter Component
// ============================================
export function TodoCounter() {
  const { todos } = useTodoStore();
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
      <p className="text-sm text-blue-800 dark:text-blue-200">
        {completedCount} of {todos.length} todos completed
      </p>
    </div>
  );
}

// ============================================
// Example 2: Todo Statistics Component
// ============================================
export function TodoStats() {
  const { todos } = useTodoStore();

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
    high: todos.filter((t) => t.priority === 'high').length,
    medium: todos.filter((t) => t.priority === 'medium').length,
    low: todos.filter((t) => t.priority === 'low').length,
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.total}
        </p>
      </div>

      <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900">
        <p className="text-sm text-green-600 dark:text-green-400">Completed</p>
        <p className="text-2xl font-bold text-green-900 dark:text-green-200">
          {stats.completed}
        </p>
      </div>

      <div className="rounded-lg bg-yellow-100 p-4 dark:bg-yellow-900">
        <p className="text-sm text-yellow-600 dark:text-yellow-400">Pending</p>
        <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">
          {stats.pending}
        </p>
      </div>

      <div className="rounded-lg bg-red-100 p-4 dark:bg-red-900">
        <p className="text-sm text-red-600 dark:text-red-400">High Priority</p>
        <p className="text-2xl font-bold text-red-900 dark:text-red-200">
          {stats.high}
        </p>
      </div>

      <div className="rounded-lg bg-orange-100 p-4 dark:bg-orange-900">
        <p className="text-sm text-orange-600 dark:text-orange-400">
          Medium Priority
        </p>
        <p className="text-2xl font-bold text-orange-900 dark:text-orange-200">
          {stats.medium}
        </p>
      </div>

      <div className="rounded-lg bg-blue-100 p-4 dark:bg-blue-900">
        <p className="text-sm text-blue-600 dark:text-blue-400">Low Priority</p>
        <p className="text-2xl font-bold text-blue-900 dark:text-blue-200">
          {stats.low}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Example 3: Priority Filter Component
// ============================================
interface PriorityFilterProps {
  onFilterChange: (priority: 'all' | 'low' | 'medium' | 'high') => void;
}

export function PriorityFilter({ onFilterChange }: PriorityFilterProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onFilterChange('all')}
        className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium dark:bg-gray-700"
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('high')}
        className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium dark:bg-red-900"
      >
        High
      </button>
      <button
        onClick={() => onFilterChange('medium')}
        className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium dark:bg-yellow-900"
      >
        Medium
      </button>
      <button
        onClick={() => onFilterChange('low')}
        className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium dark:bg-green-900"
      >
        Low
      </button>
    </div>
  );
}

// ============================================
// Example 4: Search Component
// ============================================
interface SearchComponentProps {
  onSearch: (query: string) => void;
}

export function TodoSearch({ onSearch }: SearchComponentProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search todos..."
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    />
  );
}

// ============================================
// Example 5: Export Todo to JSON
// ============================================
export function ExportButton() {
  const { todos } = useTodoStore();

  const handleExport = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  return (
    <button
      onClick={handleExport}
      className="rounded-lg bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-600"
    >
      Export Todos
    </button>
  );
}

// ============================================
// Example 6: Custom Hook - useFilteredTodos
// ============================================
export function useFilteredTodos(
  searchQuery: string = '',
  priorityFilter: 'all' | 'low' | 'medium' | 'high' = 'all'
) {
  const { todos } = useTodoStore();

  return todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === 'all' || todo.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });
}

// Usage of custom hook:
// const filteredTodos = useFilteredTodos('shopping', 'high');

// ============================================
// Example 7: Todo Quick Actions
// ============================================
export function TodoQuickActions() {
  const { todos, deleteTodo, toggleTodo } = useTodoStore();
  const overdueTodos = todos.filter((todo) => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  });

  return (
    <div className="space-y-2 rounded-lg border border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-900">
      <h3 className="font-semibold text-orange-900 dark:text-orange-100">
        {overdueTodos.length} Overdue Tasks
      </h3>
      {overdueTodos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between rounded bg-white p-2 dark:bg-gray-800"
        >
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {todo.title}
          </span>
          <button
            onClick={() => toggleTodo(todo.id)}
            className="text-xs font-medium text-blue-500 hover:text-blue-700"
          >
            Mark Done
          </button>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Example 8: Batch Operations
// ============================================
export function BatchOperations() {
  const { todos, deleteTodo } = useTodoStore();

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter((t) => t.completed);
    for (const todo of completedTodos) {
      await deleteTodo(todo.id);
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <button
      onClick={handleClearCompleted}
      disabled={completedCount === 0}
      className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600 disabled:bg-gray-400"
    >
      Clear {completedCount} Completed
    </button>
  );
}
