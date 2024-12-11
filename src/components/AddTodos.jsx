import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';


const AddTodos = ({addTodo}) => {
  const [title, setTitle] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title, 'todo');
      setTitle('');
    }
  };
  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mb-8 bg-white p-4 rounded-xl shadow-md"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={16} />
          Add Task
        </motion.button>
      </div>
    </motion.form>
  )
}

export default AddTodos