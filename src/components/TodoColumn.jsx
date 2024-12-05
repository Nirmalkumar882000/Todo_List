import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import TodoItem from './TodoItem';

export default function TodoColumn({ column, todos, onDelete, onEdit }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col w-full bg-gray-50 rounded-xl p-4 min-h-[400px]"
    >
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-semibold mb-4 text-gray-800"
      >
        {column.title}
      </motion.h2>
      <div
        ref={setNodeRef}
        className="flex flex-col gap-3 flex-1"
      >
        <SortableContext
          items={todos.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </SortableContext>
      </div>
    </motion.div>
  );
}
