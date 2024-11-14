// src/components/TaskItem.js
// 导入必要的库和组件
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, setPriority, setStatus } from '../redux/taskSlice';
import TaskForm from './TaskForm';

/**
 * TaskItem 组件，用于显示单个任务的详情并提供编辑功能。
 */
const TaskItem = ({ task }) => {
  // 获取 Redux 派发器以更新应用状态
  const dispatch = useDispatch();

  // 管理是否处于编辑模式的状态
  const [isEditing, setIsEditing] = useState(false);

  /**
   * 处理删除任务的操作。
   */
  const handleDelete = () => {
    dispatch(deleteTask(task.id)); // 派发删除任务的动作
  };

  /**
   * 处理优先级更改事件。
   * @param {Event} e - 事件对象
   */
  const handlePriorityChange = (e) => {
    dispatch(setPriority({ id: task.id, priority: e.target.value })); // 更新任务的优先级
  };

  /**
   * 处理状态更改事件。
   * @param {Event} e - 事件对象
   */
  const handleStatusChange = (e) => {
    dispatch(setStatus({ id: task.id, status: e.target.value })); // 更新任务的状态
  };

  // 根据 isEditing 的值返回不同的 JSX 结构
  return (
    <div>
      {/* 如果处于编辑模式，则渲染 TaskForm */}
      {isEditing ? (
        <TaskForm existingTask={task} onClose={() => setIsEditing(false)} />
      ) : (
        <>
          {/* 显示任务标题 */}
          <h3>{task.title}</h3>

          {/* 显示和处理优先级选择 */}
          <p>优先级:
            <select value={task.priority} onChange={handlePriorityChange}>
              <option value="低">低</option>
              <option value="中">中</option>
              <option value="高">高</option>
            </select>
          </p>

          {/* 显示和处理状态选择 */}
          <p>状态:
            <select value={task.status} onChange={handleStatusChange}>
              <option value="待办">待办</option>
              <option value="进行中">进行中</option>
              <option value="已完成">已完成</option>
            </select>
          </p>

          {/* 提供编辑和删除按钮 */}
          <button onClick={() => setIsEditing(true)}>编辑</button>
          <button onClick={handleDelete}>删除</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;
