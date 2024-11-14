// src/App.js
// 导入React库
import React, { useEffect } from 'react';
// 导入React Router DOM相关组件
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// 导入自定义组件
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
// 导入fetchTasks函数
import { fetchTasks } from './redux/taskSlice';
// 导入useDispatch hook
import { useDispatch } from 'react-redux';
// 导入ErrorBoundary组件
import ErrorBoundary from './ErrorBoundary';

function App() {
  // 使用useDispatch hook创建dispatch函数
  const dispatch = useDispatch();

  // 使用useEffect hook，在组件挂载时执行fetchTasks函数
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    // 渲染ErrorBoundary组件包裹整个应用
    <ErrorBoundary>
      {/* 使用Router组件 */}
      <Router>
        {/* 使用Routes组件 */}
        <Routes>
          {/* 定义根路径对应的组件 */}
          <Route path="/" element={<TaskList />} />
          {/* 定义带有动态参数/:id的路径对应的组件 */}
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;