// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    struct Task {
        uint256 id;
        string content;
        bool done;
    }

    uint256 public taskCount = 0;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256, string, bool);
    event TaskCompleted(uint256, bool);

    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
    }

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.done);
    }
}
