// src/components/TaskDetail.js

// 引入React模块
import React from "react";

// 引入useSelector钩子，用于访问Redux中的store数据
import { useSelector } from "react-redux";

// 引入 useParams 钩子，用于获取路由参数
import { useParams } from "react-router-dom";

// 定义TaskDetail组件
const TaskDetail = () => {

  // 使用useParams获取路由参数id
  const { id } = useParams();

  // 使用useSelector从Redux store中获取与id匹配的任务信息
  const task = useSelector(state =>
    state.tasks.find(task => task.id === parseInt(id))
  );

  // 如果没有找到对应的任务，返回提示信息
  if (!task) return <div>任务未找到</div>;

  // 返回任务详情页面的JSX结构
  return (
    <div>
      <h1>{task.title}</h1>
      <p>状态: {task.completed ? "已完成" : "未完成"}</p>
    </div>
  );
};

// 导出TaskDetail组件
export default TaskDetail;