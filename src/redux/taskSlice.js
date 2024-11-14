// src/redux/taskSlice.js

// 导入createSlice和createAsyncThunk工具函数
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// 导入axios库
import axios from "axios";

// 定义异步操作：获取任务数据
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks", // action类型字符串
  async () => { // 异步操作函数
    try {
      // 发起GET请求获取任务数据
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10");
      // 处理响应数据
      return response.data.map(task => ({
        ...task, // 扩展原始任务数据
        priority: "低", // 初始化优先级为低
        status: "待办" // 初始化状态为待办
      }));
    } catch (error) {
      // 错误处理
      console.error("获取任务失败:", error); // 输出错误日志
      throw error; // 抛出错误
    }
  }
);

// 创建任务切片
const taskSlice = createSlice({
  name: "tasks", // 切片名称
  initialState: { // 初始状态
    tasks: [], // 任务列表
    status: "idle", // 当前状态
    error: null // 错误信息
  },
  reducers: { // 自定义reducer
    addTask: (state, action) => { // 添加任务
      state.tasks.push({ ...action.payload, date: Date.now() }); // 添加任务到列表
    },
    updateTask: (state, action) => { // 更新任务
      const index = state.tasks.findIndex(task => task.id === action.payload.id); // 查找任务索引
      if (index !== -1) { // 如果找到了任务
        state.tasks[index] = action.payload; // 更新任务
      }
    },
    deleteTask: (state, action) => { // 删除任务
      state.tasks = state.tasks.filter(task => task.id !== action.payload); // 过滤掉要删除的任务
    },
    setPriority: (state, action) => { // 设置任务优先级
      const { id, priority } = action.payload; // 解构payload
      const task = state.tasks.find(task => task.id === id); // 查找任务
      if (task) { // 如果找到了任务
        task.priority = priority; // 更新任务优先级
      }
    },
    setStatus: (state, action) => { // 设置任务状态
      const { id, status } = action.payload; // 解构payload
      const task = state.tasks.find(task => task.id === id); // 查找任务
      if (task) { // 如果找到了任务
        task.status = status; // 更新任务状态
      }
    },
    sortTasks: (state, action) => { // 排序任务
      const { criteria } = action.payload; // 解构payload
      state.tasks.sort((a, b) => { // 排序任务列表
        if (criteria === "优先级") { // 如果按照优先级排序
          if (a.priority === b.priority) { // 如果优先级相同
            return 0; // 相同
          } else if (a.priority === "高") { // 如果A的优先级更高
            return -1; // A排在B前面
          } else { // 如果B的优先级更高
            return 1; // B排在A前面
          }
        } else if (criteria === "状态") { // 如果按照状态排序
          return a.status.localeCompare(b.status); // 比较状态字符串
        }
        return 0; // 默认情况
      });
    }
  },
  extraReducers: builder => { // 额外的reducers
    builder.addCase(fetchTasks.pending, state => { // 待定状态
      state.status = "pending"; // 设置状态为pending
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => { // 成功状态
      state.status = "succeeded"; // 设置状态为succeeded
      state.tasks = action.payload; // 更新任务列表
    });
    builder.addCase(fetchTasks.rejected, (state, action) => { // 失败状态
      state.status = "rejected"; // 设置状态为rejected
      state.error = action.error.message; // 更新错误信息
    });
  }
});

// 导出自定义actions
export const {
  addTask,
  updateTask,
  deleteTask,
  setPriority,
  setStatus,
  sortTasks
} = taskSlice.actions;

// 导出任务切片的reducer
export default taskSlice.reducer;