import { createVNode, render } from 'vue';
import Dialog from '../components/dialog';
import type { DialogProps } from '../components/dialog';

// 函数式调用弹窗的配置接口
export interface DialogOptions extends Omit<DialogProps, 'visible' | 'onClose'> {
  onClose?: () => void;
}

// 弹窗实例接口
interface DialogInstance {
  close: () => void;
}

/**
 * 函数式调用弹窗组件
 * @param options 弹窗配置选项
 * @returns 弹窗实例，包含close方法
 */
export function showDialog(options: DialogOptions): DialogInstance {
  // 创建一个容器元素
  const container = document.createElement('div');
  document.body.appendChild(container);

  // 处理关闭事件
  const handleClose = () => {
    if (options.onClose) {
      options.onClose();
    }
    closeDialog();
  };

  // 关闭弹窗函数
  const closeDialog = () => {
    // 从DOM中移除弹窗
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    // 清理渲染
    render(null, container);
  };

  // 创建弹窗组件的VNode
  const vnode = createVNode(Dialog, {
    visible: true,
    ...options,
    onClose: handleClose,
    // 重写取消和确认事件，执行完用户的回调后关闭弹窗
    onCancel: () => {
      if (options.onCancel) {
        options.onCancel();
      }
      handleClose();
    },
    onConfirm: () => {
      if (options.onConfirm) {
        options.onConfirm();
      }
      handleClose();
    },
  });

  // 渲染弹窗
  render(vnode, container);

  // 返回弹窗实例
  return {
    close: closeDialog,
  };
}

export default showDialog;