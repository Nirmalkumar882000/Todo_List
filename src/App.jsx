import React, { useEffect, useState } from "react";
import { useTodos } from "./common/useTodos";
import TodoColumn from "./components/TodoColumn";
import { DndProvider } from "react-dnd";
import { motion } from "framer-motion";
import { HTML5Backend } from "react-dnd-html5-backend";

import AddTodos from "./components/AddTodos";

function App() {
  const { todos, addTodo, fetchTodos,updateTodo, deleteTodo } = useTodos();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery)
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen from-blue-50 to-indigo-50 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-8 text-center"
          >
            Task Manager
          </motion.h1>
        </div>

        <AddTodos addTodo={addTodo} />

              {/* Add Search Bar */}
        <div className="w-full mx-auto mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-1/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-2 border-gray-200">
          <TodoColumn
            title="To Do"
            status="todo"
            todos={filteredTodos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            fetchTodos={fetchTodos}
          />
          <TodoColumn
            title="In Progress"
            status="in-progress"
            todos={filteredTodos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            fetchTodos={fetchTodos}
          />
          <TodoColumn
            title="Completed"
            status="completed"
            todos={filteredTodos}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            fetchTodos={fetchTodos}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
