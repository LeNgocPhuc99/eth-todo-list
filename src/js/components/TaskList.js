import React, { useState } from "react";

const TaskList = (props) => {
  const [taskContent, setTaskContent] = useState();
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
          ref={(input) => {
            setTaskContent(input);
          }}
          type="text"
        ></input>
        <input type="submit" hidden={true} />
      </form>

    </div>
  );
};

export default TaskList;
