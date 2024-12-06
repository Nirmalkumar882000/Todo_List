import React from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import TodoColumn from './components/TodoColumn';
import AddTodoForm from './components/AddTodoForm';
import { useTodos } from './common/useTofos';

const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' },
];

function App() {
  const { todos, setTodos, addTodo, updateTodo, deleteTodo } = useTodos();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTodo = todos.find((todo) => todo.id === active.id);
    const overTodo = todos.find((todo) => todo.id === over.id);

    if (!activeTodo) return;

    if (overTodo) {
      const activeIndex = todos.findIndex((t) => t.id === active.id);
      const overIndex = todos.findIndex((t) => t.id === over.id);

      if (activeTodo.status === overTodo.status) {
        setTodos(arrayMove(todos, activeIndex, overIndex));
      }
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTodo = todos.find((todo) => todo.id === active.id);

    if (!activeTodo) return;

    const overId = over.id;

    if (columns.find((col) => col.id === overId)) {
      if (activeTodo.status !== overId) {
        updateTodo(activeTodo.id, { status: overId });
      }
    }
  };

  return (
    <div className="min-h-screen  from-blue-50 to-indigo-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Task Manager
        </motion.h1>

        <AddTodoForm onAdd={addTodo} />

        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-2 border-gray-200">
            {columns.map((column) => (
              <TodoColumn
                key={column.id}
                column={column}
                todos={todos.filter((todo) => todo.status === column.id)}
                onDelete={deleteTodo}
                onEdit={(id, title) => updateTodo(id, { title })}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}

export default App;
