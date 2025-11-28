# Modal View Architecture - Quick Start Guide

## 🎯 What You've Just Set Up

A complete Todo application with a **Modal View Architecture** pattern featuring:
- ✅ Zustand for state management
- ✅ Axios for HTTP requests
- ✅ 3 Modal components (Add, Edit, View)
- ✅ 5 Example todos
- ✅ Full TypeScript support
- ✅ Tailwind CSS styling with dark mode

## 🚀 Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Explore the Features

- **View Todos**: See the list of 5 example todos
- **Add Todo**: Click "+ Add Todo" button to open the add modal
- **View Details**: Click on a todo to view its full details
- **Edit Todo**: Click "Edit" button to open the edit modal
- **Delete Todo**: Click "Delete" button to remove a todo
- **Toggle Status**: Click the checkbox to mark as complete/incomplete

## 📁 Key Files Explained

### Store: `lib/store/useTodoStore.ts`

This is the heart of your application state:

```typescript
// Access state and actions
const { todos, loading, error, addTodo, deleteTodo } = useTodoStore();

// Call actions
await addTodo({ title: 'New Todo', ... });
```

**State:**
- `todos`: Array of all todos
- `loading`: Loading indicator
- `error`: Error messages
- `isAddModalOpen`, `isEditModalOpen`, `isViewModalOpen`: Modal visibility

**Actions:**
- `fetchTodos()`: Load todos
- `addTodo(data)`: Create new todo
- `updateTodo(id, data)`: Update todo
- `deleteTodo(id)`: Remove todo
- `toggleTodo(id)`: Mark complete/incomplete

### Modals: `components/modals/`

Three modal components handle different operations:

**AddTodoModal.tsx**
- Opens when user clicks "Add Todo"
- Form with validation
- Calls `addTodo` action

**EditTodoModal.tsx**
- Opens when user clicks "Edit"
- Pre-fills with current todo data
- Calls `updateTodo` action

**ViewTodoModal.tsx**
- Opens when clicking on a todo
- Read-only display
- Shows all todo details

### API: `lib/api/todoAPI.ts`

Axios client configured for your API:

```typescript
// Ready to call backend endpoints
todoAPI.getAllTodos()
todoAPI.createTodo(data)
todoAPI.updateTodo(id, data)
// ... etc
```

## 🔄 Understanding the Modal View Architecture

### What Happens When You Add a Todo

1. **User clicks "+ Add Todo"**
   - `openAddModal()` action sets `isAddModalOpen = true`
   - AddTodoModal component renders

2. **User fills form and submits**
   - Form calls `addTodo(data)` action
   - Store updates `todos` array
   - `closeAddModal()` hides the modal
   - List re-renders with new todo

3. **State flows through the app**
   ```
   Store Update → Components Re-render → UI Updates
   ```

### State Flow Diagram

```
┌─────────────────────┐
│   Zustand Store     │ (Single Source of Truth)
├─────────────────────┤
│ - todos: Todo[]     │
│ - loading: boolean  │
│ - error: string     │
│ - Modal states      │
├─────────────────────┤
│ - Actions           │
│ - Modals            │
└─────────────────────┘
          ↓
   Components Subscribe
          ↓
┌──────────────────────────────────┐
│ Components                       │
├──────────────────────────────────┤
│ - TodoApp                        │
│ - TodoList                       │
│ - AddTodoModal                   │
│ - EditTodoModal                  │
│ - ViewTodoModal                  │
└──────────────────────────────────┘
```

## 🔌 Connecting to Your Backend API

Currently, the app uses **mock data** (5 example todos). To connect to a real API:

### Step 1: Update `.env.local`

```env
NEXT_PUBLIC_API_URL=http://your-api.com/api
```

### Step 2: Uncomment API calls in `lib/store/useTodoStore.ts`

Replace mock implementations with actual API calls:

```typescript
// FROM THIS:
set({ todos: INITIAL_TODOS, loading: false });

// TO THIS:
const todos = await todoAPI.getAllTodos();
set({ todos, loading: false });
```

### Step 3: Backend API Endpoints Required

Your backend should provide these endpoints:

```
GET    /api/todos              - Get all todos
POST   /api/todos              - Create todo
GET    /api/todos/:id          - Get single todo
PUT    /api/todos/:id          - Update todo
DELETE /api/todos/:id          - Delete todo
PATCH  /api/todos/:id/toggle   - Toggle completion
```

Each endpoint should return a `Todo` object:

```json
{
  "id": "1",
  "title": "Example Todo",
  "description": "Description here",
  "completed": false,
  "createdAt": "2025-11-28T00:00:00Z",
  "dueDate": "2025-11-30T00:00:00Z",
  "priority": "high"
}
```

## 🧩 Component Architecture

### TodoApp (Orchestrator)

```
TodoApp
├── Header + "Add Todo" Button
├── Error Notification
├── TodoList
│   └── TodoItem (multiple)
│       ├── Checkbox
│       ├── Title + Description
│       └── Edit/Delete Buttons
├── AddTodoModal
├── EditTodoModal
└── ViewTodoModal
```

## 📝 Adding a New Feature

### Example: Add Priority Filter

1. **Add to store** (`lib/store/useTodoStore.ts`):
```typescript
selectedPriority: 'all' | 'low' | 'medium' | 'high' = 'all',
setSelectedPriority: (priority) => set({ selectedPriority: priority })
```

2. **Create filter UI** in `components/TodoApp.tsx`:
```tsx
<select onChange={(e) => setSelectedPriority(e.target.value)}>
  <option value="all">All Priorities</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
```

3. **Filter in TodoList** (`components/TodoList.tsx`):
```tsx
const filtered = selectedPriority === 'all' 
  ? todos 
  : todos.filter(t => t.priority === selectedPriority);
```

## 🎨 Customizing Styles

All components use Tailwind CSS. Modify styles by:

1. **Changing colors**: Update color classes (e.g., `bg-blue-500` → `bg-purple-500`)
2. **Adjusting spacing**: Modify padding/margin classes
3. **Dark mode**: Styles already support dark mode with `dark:` prefix

## 🧪 Testing Your App

### Check Modal Interactions

- [x] Click "Add Todo" - modal appears
- [x] Fill form and submit - todo added to list
- [x] Click "Edit" - edit modal shows with current data
- [x] Modify and save - todo updates
- [x] Click todo item - view modal opens
- [x] Click "Delete" - todo removed

### Check Error Handling

- [x] Leave title empty in form - validation error
- [x] Error message auto-dismisses after 5 seconds

## 📚 Related Files

- **Types**: `lib/types/index.ts` - All TypeScript interfaces
- **Store**: `lib/store/useTodoStore.ts` - State management
- **API**: `lib/api/todoAPI.ts` - HTTP client
- **Components**: `components/` - All UI components

## 🚀 Next Steps

### Phase 1: Polish
- [ ] Add form validation with React Hook Form
- [ ] Add toast notifications
- [ ] Add loading spinners

### Phase 2: Features
- [ ] Add search/filter functionality
- [ ] Add sorting options
- [ ] Add pagination

### Phase 3: Production
- [ ] Add authentication
- [ ] Add error boundaries
- [ ] Add analytics

## 🆘 Troubleshooting

### "Module not found" errors
```bash
npm install
```

### Port 3000 already in use
```bash
PORT=3001 npm run dev
```

### Types not working
Check that TypeScript is installed:
```bash
npm install --save-dev typescript
```

## 📖 Further Learning

- [Zustand Docs](https://github.com/pmndrs/zustand#readme)
- [Axios Docs](https://axios-http.com/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)

---

**You're all set! Start coding! 🎉**
