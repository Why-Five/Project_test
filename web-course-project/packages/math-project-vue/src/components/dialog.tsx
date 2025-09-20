import { defineComponent } from 'vue';

// 弹窗组件属性接口
export interface DialogProps {
  visible: boolean;
  title?: string;
  content?: string;
  closable?: boolean;
  showCancel?: boolean;
  showConfirm?: boolean;
  cancelText?: string;
  confirmText?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Dialog = defineComponent<DialogProps>({
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
    content: {
      type: String,
      default: '',
    },
    closable: {
      type: Boolean,
      default: true,
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    onClose: {
      type: Function,
    },
    onCancel: {
      type: Function,
    },
    onConfirm: {
      type: Function,
    },
  },
  setup(props) {
    // 处理遮罩层点击
    const handleOverlayClick = (e: MouseEvent) => {
      if (e.target === e.currentTarget && props.onClose) {
        props.onClose();
      }
    };

    // 阻止事件冒泡
    const stopPropagation = (e: Event) => {
      e.stopPropagation();
    };

    return () => {
      if (!props.visible) return null;

      return (
        <div
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300"
          onClick={handleOverlayClick}
        >
          <div
            class="w-full max-w-md rounded-lg shadow-2xl bg-white text-gray-900 dark:bg-gray-800 dark:text-white transition-all duration-300"
            onClick={stopPropagation}
          >
            {/* 弹窗头部 */}
            <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold">{props.title}</h3>
              {props.closable && (
                <button
                  class="p-1 rounded-full hover:bg-gray-200 hover:bg-opacity-20 transition-colors"
                  onClick={props.onClose}
                  aria-label="关闭"
                >
                  <div class="i-carbon-close w-5 h-5" />
                </button>
              )}
            </div>

            {/* 弹窗内容 */}
            <div class="p-4">
              <p class="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{props.content}</p>
            </div>

            {/* 弹窗底部 */}
            {(props.showCancel || props.showConfirm) && (
              <div class="flex justify-end p-4 gap-3 border-t border-gray-200 dark:border-gray-700">
                {props.showCancel && (
                  <button
                    class="px-4 py-2 rounded transition-colors bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    onClick={props.onCancel}
                  >
                    {props.cancelText}
                  </button>
                )}
                {props.showConfirm && (
                  <button
                    class="px-4 py-2 rounded transition-colors text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={props.onConfirm}
                  >
                    {props.confirmText}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    };
  },
});

export default Dialog;