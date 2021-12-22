import React, { useState } from "react";

const TaskList = (props) => {
  const [taskContent, setTaskContent] = useState("");

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setTaskContent(event.target.value);
  };

  return (
    <div id="content">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.createTask(taskContent);
        }}
      >
        <input
          id="newTask"
          type="text"
          placeholder="Add task..."
          onChange={inputChangeHandler}
          value={taskContent}
        />
      </form>
      <ul id="taskList" className="list-unstyled">
        {props.tasks.map((task, key) => {
          return (
            <div className="taskTemplate" className="checkbox" key={key}>
              <label>
                <input
                  type="checkbox"
                  name={task.id}
                  defaultChecked={task.done}
                  onClick={(event) => {
                      props.toggleCompleted(task.id);
                  }}
                />
                <span className="content">{task.content}</span>
              </label>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
