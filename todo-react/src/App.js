import React, { useState } from 'react';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const handleUpdateTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: editingTodoText } : todo
      )
    );
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleUpdateTodo(id);
    }
  };

  return (
    <body>
      <h1>Your <span> TO-DO </span> List </h1>
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          placeholder='add a task...'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          //imp . add when enter//
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>
          <RiEdit2Line size={20} />
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <div className="todo-item" key={todo.id}>
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTodoText}
                  onChange={(e) => setEditingTodoText(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, todo.id)}
                />
                <button onClick={() => handleUpdateTodo(todo.id)}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => handleEditTodo(todo.id, todo.text)}>
                  <RiEdit2Line size={16} />
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  <RiDeleteBin5Line size={16} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    </body>
  );
};

export default App;
