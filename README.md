
# vue3-event-intercept

```
这是一个基于vue3开发的dom事件拦截器。
作用是屏蔽dom子节点触发父节点的dom事件。
```


## 使用方法/示例


Vue
```javascript
<script setup lang="ts">
/*直接引入*/
import EventIntercept from "vue3-event-intercept"
import { ref } from "vue"
const box1Ref = ref(undefined)
const box2Ref = ref(undefined)
const testClick = (e: any) => {
  alert("触发点击事件")
}
</script>

<template>
  <div class="root">
    <div class="box1" ref="box1Ref">
      会触发点击事件的区域
      <div class="box2" ref="box2Ref">
        不会触发的区域
        <div></div>
      </div>
      <div class="box3">
        会触发点击事件的区域
      </div>
    </div>
    <EventIntercept :bindingEvents="[['click', testClick]]" :bindingRef="box1Ref" :ignoreRef="[box2Ref]">
    </EventIntercept>
  </div>
</template>

<style scoped>
.box1 {
  width: 800px;
  height: 800px;
  background-color: brown;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.box2 {
  width: 500px;
  height: 500px;
  background-color: coral;
}
.box3 {
  width: 800px;
  height: 100px;
  background-color: blueviolet;
}
.root {
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #fff;
}
</style>

```

main.ts
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import EventIntercept from "vue3-event-intercept"
const app = createApp(App)
/*全局注册*/
app.component("EventIntercept",EventIntercept)
app.mount('#app')
```


## API 

| key |   describe   | type               |
| :-------- | :------- | :------- |
| `bindingEvents` | Event name and calling function. Multiple can be bound and summarized in an array. example: [['eventName1','eventFun1],['eventName1','eventFun1]] | `Array<[string,function]>` |
| `bindingRef` | DOM node of binding event | `HTMLElement` |
| `bindingRef` | Node of the event to intercept | `Array<HTMLElement>` |



