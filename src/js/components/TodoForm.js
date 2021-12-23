import React, { useRef } from "react";
import "../../css/TodoForm.css";

function TodoForm(props) {
  const inputValue = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createTask(inputValue.current.value);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        id="newTask"
        ref={inputValue}
        type="text"
        placeholder="Add task..."
        required
        className="todo-input"
      />
      <button onClick={handleSubmit} className="todo-button">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
