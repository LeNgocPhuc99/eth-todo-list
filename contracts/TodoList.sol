// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    struct Task {
        uint256 id;
        uint256 date;
        string content;
        string author;
        bool done;
    }

    uint256 public taskCount = 0;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256, uint256, string, string, bool);

    function createTask(string memory _content, string memory _author) public {
        taskCount++;
        tasks[taskCount] = Task(
            taskCount,
            block.timestamp,
            _content,
            _author,
            false
        );
        emit TaskCreated(taskCount, block.timestamp, _content, _author, false);
    }
}
