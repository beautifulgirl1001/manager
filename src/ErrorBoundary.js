// src/ErrorBoundary.js

// 导入React模块
import React from 'react';

/**
 * 定义一个名为ErrorBoundary的类，继承自React.Component。
 */
class ErrorBoundary extends React.Component {

  /**
   * 构造函数，初始化组件的状态。
   * @param props 组件接收到的属性。
   */
  constructor(props) {
    super(props);
    
    // 初始化状态，hasError表示是否有错误发生，默认值为false。
    this.state = { hasError: false };
  }

  /**
   * 静态方法getDerivedStateFromError，当组件抛出错误时被调用，
   * 用来更新组件的状态。返回一个新的状态对象。
   * @param error 错误对象。
   * @returns 新的状态对象。
   */
  static getDerivedStateFromError(error) {
    // 如果有错误发生，将hasError设置为true。
    return { hasError: true };
  }

  /**
   * componentDidCatch生命周期方法，当组件抛出错误时被调用。
   * 可以在这里记录错误信息或发送错误报告等。
   * @param error 错误对象。
   * @param errorInfo 错误信息对象。
   */
  componentDidCatch(error, errorInfo) {
    // 在控制台打印错误信息。
    console.error('Error:', error, errorInfo);
  }

  /**
   * render方法，渲染组件。
   * 根据当前状态决定是否显示错误提示或者正常渲染子元素。
   * @returns JSX元素。
   */
  render() {
    // 如果hasError为true，显示错误提示。
    if (this.state.hasError) {
      return <h2>出现错误！</h2>;
    }

    // 如果没有错误，正常渲染子元素。
    return this.props.children;
  }
}

// 导出ErrorBoundary组件作为默认导出。
export default ErrorBoundary;