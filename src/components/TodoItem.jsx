import { useDrag } from 'react-dnd';
import { motion } from 'framer-motion';
import { Check, GripVertical, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

function TodoItem({ todo, index, deleteTodo,fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TODO',
    item: { id: todo._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleEdit = async () => {
    try {
      const response = await axios.put(`https://todo-list-backend-e01w.onrender.com/api/todos/${todo._id}`, { title });
      setIsEditing(false)
      fetchTodos()
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo.');
    }
  };

  return (
    <motion.div
      ref={drag}
      className={`p-4 mb-2 border rounded-md cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="touch-none text-gray-400 hover:text-gray-600"
        >
          <GripVertical size={20} />
        </motion.button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEdit}
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
            <span className="flex-1 text-gray-700">{todo.title}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <Pencil size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteTodo(todo._id)}
              className="text-gray-400 hover:text-red-600 p-1"
            >
              <Trash2 size={16} />
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default TodoItem;