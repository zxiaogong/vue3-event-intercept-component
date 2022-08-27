/**事件捕获 */
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch
} from 'vue'
export default defineComponent({
  props: {
    ignoreRef: {
      type: Array<HTMLElement | undefined>,
      default: undefined,
    },
    /**事件名 */
    bindingEvents: {
      type: Array<Array<String | Function>>,
      default: undefined,
    },
    bindingRef: {
      type: HTMLElement,
      default: undefined,
    }
  },



  setup(props) {
    const eventName = ref<string[]>([])
    const eventFunc = ref<Function[]>([])
    const bindDomEvent = () => {
      const dom = props.bindingRef
      if (dom) {
        const bindingEvents = props.bindingEvents || []
        const evLength = bindingEvents?.length || 0
        const tempEventName: string[] = []
        const tempEventFunc: Function[] = []
        for (let i = 0; i < evLength; i++) {
          if (bindingEvents[i][0] && bindingEvents[i][1]) {
            tempEventName.push(bindingEvents[i][0] as string)
            tempEventFunc.push(bindingEvents[i][1] as Function)
            dom.addEventListener(bindingEvents[i][0] as string, handleBodyEvent);
          }
        }
        if (tempEventFunc.length > 0 && tempEventName.length > 0 && tempEventName.length === tempEventFunc.length) {
          eventName.value = tempEventName
          eventFunc.value = tempEventFunc
        }
      }
    }

    watch(
      () => props.bindingRef,
      /**通过最小宽/高计算预加载样式（大小） */
      (newSize, preSize) => {
        /**onMounted 时要绑定事件的ref还未传入，所以无法顺利绑定事件，只有两种解决办法：
         * 1. onMounted 时设置延迟时间再进行绑定
         * 2. 监听props变化进行绑定
         */
        if (!preSize && newSize) {
          bindDomEvent()
        }
      }
    );
    /**组件挂载 */
    onMounted(() => {
      // setTimeout(() => {
      // bindDomEvent()
      // }, 100);
    })

    /**组件卸载前,先解绑事件 */
    onBeforeUnmount(() => {
      const dom = props.bindingRef
      if (dom) {
        const bindingEvents = props.bindingEvents || []
        const evLength = bindingEvents?.length || 0
        for (let i = 0; i < evLength; i++) {
          if (bindingEvents[i][0] && bindingEvents[i][1]) {
            dom.removeEventListener(bindingEvents[i][0] as string, handleBodyEvent);
          }
        }
      }
    })

    const handleBodyEvent = (e: any) => {
      const subscript = eventName.value.indexOf(e.type)
      const ignoreRef = props.ignoreRef
      if (subscript > -1 && ignoreRef) {
        let node = e.target;
        while (node) {
          if (ignoreRef.findIndex((item) => item === node) >= 0) {
            return;
          }
          node = node.parentNode;
        }
        return eventFunc.value[subscript](e)
      }
    }

    return () => {
      return (
        null
      )
    }
  }
})
