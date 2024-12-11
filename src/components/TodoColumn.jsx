import { useDrop } from 'react-dnd';
import TodoItem from './TodoItem';

function TodoColumn({ title, status, todos, updateTodo, deleteTodo, fetchTodos }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TODO',
    drop: (item) => {
      if (item.status !== status) {
        updateTodo(item.id, { status });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  

  return (
    <div
      ref={drop} 
      className={`flex flex-col w-full bg-gray-50 rounded-xl p-4 min-h-[400px] ${
        isOver ? 'bg-green-100' : ''
      } transition-all duration-300 space-y-4`}
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="flex flex-col gap-3 flex-1 border-2 p-3 border-gray-200">
        {todos
          .filter((todo) => todo.status === status)
          .map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              deleteTodo={deleteTodo}
              fetchTodos={fetchTodos}
            />
          ))}
      </div>
    </div>
  );
}

export default TodoColumn;
