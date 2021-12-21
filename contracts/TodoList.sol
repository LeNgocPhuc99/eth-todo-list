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

    uint256 lastTaskId;
    mapping(uint256 => Task) tasks;
    uint256[] taskIds;

    event TaskCreated(uint256, uint256, string, string, bool);

    constructor() {
        lastTaskId = 0;
    }

    modifier taskExist(uint256 _id) {
        require(_id >= 0 && _id <= lastTaskId, "Task don't exist!!");
        _;
    }

    function createTask(string memory _content, string memory _author) public {
        lastTaskId++;
        tasks[lastTaskId] = Task(
            lastTaskId,
            block.timestamp,
            _content,
            _author,
            false
        );
        taskIds.push(lastTaskId);
        emit TaskCreated(lastTaskId, block.timestamp, _content, _author, false);
    }

    function getTask(uint256 _id)
        public
        view
        taskExist(_id)
        returns (
            uint256,
            uint256,
            string memory,
            string memory,
            bool
        )
    {
        return (
            _id,
            tasks[_id].date,
            tasks[_id].content,
            tasks[_id].author,
            tasks[_id].done
        );
    }

    function getTaskIds() public view returns (uint256[] memory) {
        return taskIds;
    }
}
