import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { Pencil, Trash2, GripVertical, X, Check } from 'lucide-react';

export default function TodoItem({ todo, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(todo.id, editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={setNodeRef}
      style={style}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <motion.button
        {...attributes}
        {...listeners}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="touch-none text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </motion.button>

      {/*  edit for task name  */}

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="text-green-600 hover:text-green-700 p-1"
          >
            <Check size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(false)}
            className="text-red-600 hover:text-red-700 p-1"
          >
            <X size={18} />
          </motion.button>
        </div>
      ) : (
        <>

        {/* edit for task name  */}
          <span className="flex-1 text-gray-700">{todo.title}</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <Pencil size={16} />
          </motion.button>

          {/* deleted for task name  */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(todo.id)}
            className="text-gray-400 hover:text-red-600 p-1"
          >
            <Trash2 size={16} />
          </motion.button>
        </>
      )}
    </motion.div>
  );
}
