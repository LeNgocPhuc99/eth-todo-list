import React from "react";
import "../../css/Tasks.css";

function TodoTasks(props) {
  const handleClick = (taskId) => {
    props.toggleCompleted(taskId);
  };

  return props.tasks.map((task, key) => (
    <div className={task.done ? "todo-row complete" : "todo-row"} key={key}>
      <div>
        <input
          type="checkbox"
          name={task.id}
          defaultChecked={task.done}
          onClick={() => handleClick(task.id)}
        />
        <span className="content">{task.content}</span>
      </div>
    </div>
  ));
}

export default TodoTasks;
