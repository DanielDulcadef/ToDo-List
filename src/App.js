import React from 'react';
import './App.css';




export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "HTML", done: false },
    { id: 2, text: "CSS", done: false },
    { id: 3, text: "JavaScript", done: false },
    { id: 4, text: "React JS", done: false }
  ]);


  return (
    <div className="App">
      <h1>ToDo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}



function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((clickedTodo) =>
      clickedTodo.id === todo.id ? { ...clickedTodo, done: !clickedTodo.done } : clickedTodo
    );
    setTodos(updatedTodos)

  }
  if (!todos.length) {
    return <p>¡No hay mas tareas!</p>
  }
  return (
    <ul>
      {todos.map((todo) => (
        <li
        key={todo.id}
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}




function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("¿Quieres borrar esta tarea?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      })
    }
  }
  return (
    <span onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "green",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      🗸
    </span>
  );
}




function AddTodo({ setTodos }) {
  const inputRef = React.useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    
    const text = event.target.elements.addTodo.value;
   
    setTodos((prevTodos) => {
     
      const todo = {
        id:  prevTodos.length+1,
        text,
        done: false
      };
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }
  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" placeholder="Add..." ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}



