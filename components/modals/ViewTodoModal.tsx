'use client';

import { useTodoStore } from '@/lib/store/useTodoStore';

export function ViewTodoModal() {
  const { isViewModalOpen, closeViewModal, selectedTodo } = useTodoStore();

  if (!isViewModalOpen || !selectedTodo) return null;

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          {selectedTodo.title}
        </h2>

        <div className="space-y-4">
          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </h3>
            <p className="mt-1 flex items-center gap-2">
              <span
                className={`h-3 w-3 rounded-full ${
                  selectedTodo.completed ? 'bg-green-500' : 'bg-gray-400'
                }`}
              />
              <span className="text-gray-900 dark:text-white">
                {selectedTodo.completed ? 'Completed' : 'Pending'}
              </span>
            </p>
          </div>

          {/* Priority */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Priority
            </h3>
            <p className="mt-1">
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                  priorityColors[selectedTodo.priority]
                }`}
              >
                {selectedTodo.priority.charAt(0).toUpperCase() +
                  selectedTodo.priority.slice(1)}
              </span>
            </p>
          </div>

          {/* Description */}
          {selectedTodo.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-400">
                {selectedTodo.description}
              </p>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Created
              </h3>
              <p className="mt-1 text-gray-700 dark:text-gray-400">
                {formatDate(selectedTodo.createdAt)}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date
              </h3>
              <p className="mt-1 text-gray-700 dark:text-gray-400">
                {formatDate(selectedTodo.dueDate)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={closeViewModal}
            className="flex-1 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
