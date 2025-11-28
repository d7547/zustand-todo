'use client';

import { useEffect } from 'react';
import { useTodoStore } from '@/lib/store/useTodoStore';
import { TodoList } from './TodoList';
import { AddTodoModal } from './modals/AddTodoModal';
import { EditTodoModal } from './modals/EditTodoModal';
import { ViewTodoModal } from './modals/ViewTodoModal';

export function TodoApp() {
  const { fetchTodos, openAddModal, error, clearError } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              My Todos
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your tasks efficiently with Modal View Architecture
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            + Add Todo
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {/* Todo List */}
        <TodoList />

        {/* Modals */}
        <AddTodoModal />
        <EditTodoModal />
        <ViewTodoModal />
      </div>
    </div>
  );
}
