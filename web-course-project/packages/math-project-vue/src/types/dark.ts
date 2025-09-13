import { useDark, useToggle } from "@vueuse/core"

export const isDark = useDark({
  selector: 'html',          // 选择html元素
  attribute: 'class',        // 操作class属性
  valueDark: 'dark',         // 暗色模式时的类名
  valueLight: 'light',       // 亮色模式时的类名
})

export const toggleDark = useToggle(isDark)

// 实现主题切换功能
export const toggleTheme = (event: MouseEvent) => {
  // 获取点击位置坐标
  const x = event.clientX
  const y = event.clientY
  
  // 计算最大半径（从点击点到页面最远角的距离）
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // 兼容性检查：如果浏览器不支持View Transition API
  if (!document.startViewTransition) {
    toggleDark()
    return
  }
  
  // 保存切换前的主题状态
  const wasDark = isDark.value
  
  // 启动视图过渡动画
  const transition = document.startViewTransition(async () => {
    toggleDark()  // 切换主题
  })
  
  // 当过渡准备就绪时执行动画
  transition.ready.then(() => {
    // 定义裁剪路径动画：从点击点开始的圆形扩散效果
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    
    // 在document元素上执行动画
    document.documentElement.animate(
      {
        // 使用切换前的主题状态决定动画方向，确保动画方向正确
        clipPath: wasDark ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 2000,           // 动画持续时间2秒
        easing: 'ease-in',        // 缓动函数
        pseudoElement: wasDark 
          ? '::view-transition-new(root)' 
          : '::view-transition-old(root)'
      }
    )
  })
}