# Todo App - Modal View Architecture with Zustand & Axios

A modern, scalable Todo application built with Next.js, React, Zustand for state management, and Axios for HTTP requests. This project demonstrates a clean Modal View Architecture pattern.

## 📋 Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page (uses TodoApp)
│   └── globals.css         # Global styles
├── components/
│   ├── TodoApp.tsx         # Main app orchestrator
│   ├── TodoList.tsx        # Todo list display component
│   └── modals/
│       ├── AddTodoModal.tsx      # Create new todo
│       ├── EditTodoModal.tsx     # Edit existing todo
│       └── ViewTodoModal.tsx     # View todo details
├── lib/
│   ├── api/
│   │   └── todoAPI.ts      # Axios API client
│   ├── store/
│   │   └── useTodoStore.ts # Zustand store
│   └── types/
│       └── index.ts        # TypeScript types
├── package.json
└── tsconfig.json
```

## 🏗️ Architecture Pattern: Modal View Architecture

### What is Modal View Architecture?

Modal View Architecture (MVA) is a state management pattern that separates:

1. **Modal States**: Track which modals are open/closed
2. **Data State**: Manage the application data (todos)
3. **UI State**: Handle loading, error states
4. **Actions**: Functions to manipulate state

### Architecture Benefits

- ✅ **Separation of Concerns**: UI logic separated from business logic
- ✅ **Predictable State**: Single source of truth with Zustand
- ✅ **Reusability**: Modals can be reused across different views
- ✅ **Testability**: Easy to test state and actions independently
- ✅ **Scalability**: Easy to add new features and modals

## 🔧 Technology Stack

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Zustand**: Lightweight state management
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `zustand`: State management
- `axios`: HTTP client
- All other required dependencies

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Features

### State Management (Zustand Store)

The `useTodoStore` hook provides:

```typescript
// State
- todos: Todo[]           # Array of todos
- loading: boolean        # Loading state
- error: string | null    # Error messages
- selectedTodo: Todo | null  # Currently selected todo

// Modal States
- isAddModalOpen: boolean
- isEditModalOpen: boolean
- isViewModalOpen: boolean

// Actions
- fetchTodos()           # Fetch todos from API
- addTodo(todo)          # Create new todo
- updateTodo(id, data)   # Update existing todo
- deleteTodo(id)         # Delete todo
- toggleTodo(id)         # Toggle completion status

// Modal Actions
- openAddModal()
- closeAddModal()
- openEditModal(todo)
- closeEditModal()
- openViewModal(todo)
- closeViewModal()
```

### Components

#### TodoApp (`components/TodoApp.tsx`)

The main orchestrator component that:
- Manages side effects (data fetching)
- Renders the header and "Add Todo" button
- Displays error notifications
- Renders all modals and the todo list

#### TodoList (`components/TodoList.tsx`)

Displays all todos with:
- Checkbox to toggle completion
- Title and description
- Priority badges
- Due date
- Edit and Delete buttons
- Click to view details

#### Modal Components

**AddTodoModal** (`components/modals/AddTodoModal.tsx`)
- Form to create a new todo
- Fields: title, description, priority, due date
- Validation and error handling

**EditTodoModal** (`components/modals/EditTodoModal.tsx`)
- Form to update an existing todo
- Pre-fills with current todo data
- Same fields as add modal

**ViewTodoModal** (`components/modals/ViewTodoModal.tsx`)
- Read-only view of todo details
- Shows status, priority, dates
- Close button to dismiss

### API Client (Axios)

`lib/api/todoAPI.ts` provides:

```typescript
todoAPI.getAllTodos()     # GET /todos
todoAPI.getTodo(id)       # GET /todos/:id
todoAPI.createTodo(data)  # POST /todos
todoAPI.updateTodo(id, data)  # PUT /todos/:id
todoAPI.deleteTodo(id)    # DELETE /todos/:id
todoAPI.toggleTodo(id)    # PATCH /todos/:id/toggle
```

### Types

`lib/types/index.ts` defines:

```typescript
interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  dueDate?: Date
  priority: 'low' | 'medium' | 'high'
}

interface TodoStore {
  // See store documentation above
}
```

## 📊 Example Todos

The app comes with 5 example todos:

1. **Setup Zustand Store** (Completed) - High Priority
2. **Create Modal Components** (Completed) - High Priority
3. **Implement API Integration** (Pending) - Medium Priority
4. **Add Styling with Tailwind** (Pending) - Medium Priority
5. **Write Unit Tests** (Pending) - Low Priority

## 🔌 Connecting to a Real API

To connect to a real backend API:

1. Update `lib/api/todoAPI.ts` and uncomment the actual API calls:

```typescript
// Example: in fetchTodos
const todos = await todoAPI.getAllTodos();
set({ todos, loading: false });
```

2. Set your API base URL in environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3. The Axios interceptors are ready for:
   - Adding authentication tokens
   - Handling 401 responses
   - Custom error handling

## 🎨 Styling

All components use Tailwind CSS with:
- Dark mode support (`dark:` prefix)
- Responsive design (`sm:`, `md:` breakpoints)
- Consistent color scheme
- Accessibility features

## 🧪 Usage Examples

### Using the Store

```typescript
'use client';

import { useTodoStore } from '@/lib/store/useTodoStore';

function MyComponent() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodoStore();

  const handleAddTodo = async () => {
    await addTodo({
      title: 'New Todo',
      description: 'Description',
      priority: 'high',
      completed: false,
    });
  };

  return (
    // Your JSX
  );
}
```

### Adding a New Modal

1. Create modal component in `components/modals/`
2. Add state to store in `lib/store/useTodoStore.ts`
3. Add open/close actions
4. Render in `components/TodoApp.tsx`

## 📱 Responsive Design

- Mobile-first approach
- Optimized for:
  - Small screens (< 640px)
  - Medium screens (640px - 1024px)
  - Large screens (> 1024px)
- Touch-friendly button sizes

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Focus states for interactive elements
- Color contrast compliance

## 📝 Environment Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Add other environment variables as needed
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel will auto-deploy on push
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com/docs/intro)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 🤝 Contributing

This is a demo project. Feel free to:
- Add more features
- Create additional modals
- Improve styling
- Add tests
- Optimize performance

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Next Steps

1. ✅ Connect to a real backend API
2. ✅ Add authentication with JWT
3. ✅ Add form validation library (React Hook Form)
4. ✅ Add notifications (Toast)
5. ✅ Write unit and integration tests
6. ✅ Add pagination for large todo lists
7. ✅ Add filters and search functionality
8. ✅ Deploy to production

---

**Happy coding! 🚀**
