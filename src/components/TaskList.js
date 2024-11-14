// src/components/TaskList.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { sortTasks } from "../redux/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleSort = (criteria) => {
    dispatch(sortTasks({ criteria }));
  };

  return (
    <div>
      <h1>任务列表</h1>
      <button onClick={() => setIsAdding(true)}>添加任务</button>
      <button onClick={() => handleSort("优先级")}>按优先级排序</button>
      <button onClick={() => handleSort("状态")}>按状态排序</button>
      {isAdding && <TaskForm onClose={() => setIsAdding(false)} />}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
