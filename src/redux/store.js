// src/redux/store.js
// 导入 Redux 工具库
import { configureStore } from "@reduxjs/toolkit";
// 导入任务切片的 reducer
import taskReducer from "./taskSlice";

// 创建 Redux store 实例
export const store = configureStore({
  // 配置 store 的 reducer 对象
  reducer: {
    // 将任务切片的 reducer 赋予 tasks 属性
    tasks: taskReducer,
  },
});