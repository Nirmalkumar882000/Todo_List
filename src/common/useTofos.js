import { useState, useEffect } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, status) => {
    setTodos((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title,
        status,
      },
    ]);
  };

  const updateTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
