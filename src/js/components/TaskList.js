import React, { useState, useRef } from "react";

const TaskList = (props) => {
  const [taskContent, setTaskContent] = useState("");

  const inputValue = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createTask(inputValue.current.value);
  };

  const handleClick = (taskId) => {
    props.toggleCompleted(taskId);
  };

  return (
    <div id="content">
      <form onSubmit={handleSubmit}>
        <input
          id="newTask"
          ref={inputValue}
          type="text"
          placeholder="Add task..."
          required
        />
      </form>

      <ul className="list-unstyled">
        {props.tasks.map((task, key) => (
          <li
            id={task.done ? "completedTaskList" : "taskList"}
            className="taskTemplate checkbox"
            key={key}
          >
            <label>
              <input
                type="checkbox"
                name={task.id}
                defaultChecked={task.done}
                onClick={() => handleClick(task.id)}
              />{" "}
              <span className="content">{task.content}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
