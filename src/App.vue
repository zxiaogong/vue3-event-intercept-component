<script setup lang="ts">
// import EventIntercept from "./components/export"
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
