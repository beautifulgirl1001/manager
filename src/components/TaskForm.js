// src/components/TaskForm.js

// 导入React库

// 导入useDispatch和useState钩子
import { useDispatch } from "react-redux";
import { useState } from "react";

// 导入addTask和updateTask动作
import { addTask, updateTask } from "../redux/taskSlice";

// 定义TaskForm组件
const TaskForm = ({ existingTask, onClose }) => {
  // 初始化任务标题状态
  const [title, setTitle] = useState(existingTask ? existingTask.title : "");
  // 初始化任务优先级状态
  const [priority, setPriority] = useState(
    existingTask ? existingTask.priority : "低"
  );
  // 初始化任务状态状态
  const [status, setStatus] = useState(existingTask ? existingTask.status : "待办");

  // 创建dispatch方法
  const dispatch = useDispatch();

  // 定义提交表单的方法
  const handleSubmit = (e) => {
    // 阻止表单默认行为
    e.preventDefault();
    // 创建任务对象
    const task = {
      id: existingTask ? existingTask.id : Date.now(),
      title,
      priority,
      status
    };
    // 如果存在现有任务，则调用updateTask
    if (existingTask) {
      dispatch(updateTask(task));
    }
    // 否则，调用addTask
    else {
      dispatch(addTask(task));
    }
    // 关闭表单
    onClose();
  };

  // 返回表单组件
  return (
    <form onSubmit={handleSubmit}>
      <label>
        任务标题：
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        优先级：
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="低">低</option>
          <option value="中">中</option>
          <option value="高">高</option>
        </select>
      </label>
      <br />
      <label>
        状态：
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="待办">待办</option>
          <option value="进行中">进行中</option>
          <option value="已完成">已完成</option>
        </select>
      </label>
      <br />
      <button type="submit">保存</button>
    </form>
  );
};

// 导出TaskForm组件
export default TaskForm;