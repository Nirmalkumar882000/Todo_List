// frontend/common/useTodos.js

import { useEffect, useState } from 'react';
import axios from 'axios';

export function useTodos() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('https://todo-list-backend-e01w.onrender.com/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching Todos:', error);
    }
  }

  // Add a new todo
  const addTodo = async (title, status) => {
    const newTodo = { title, status };
    try {
      const response = await axios.post('https://todo-list-backend-e01w.onrender.com/api/todos', newTodo);
      setTodos((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding Todo:', error);
    }
  };

  // Update todo status
  const updateTodo = async (id, updates) => {
    try {
      const response = await axios.put(`https://todo-list-backend-e01w.onrender.com/api/todos/${id}`, updates);
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error('Error updating Todo:', error);
    }
  };




  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-list-backend-e01w.onrender.com/api/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting Todo:', error);
    }
  };

  return { todos, addTodo, updateTodo, deleteTodo,fetchTodos };
}
