import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import App from './App'
// import EventIntercept from "./components/EventIntercept/index"
// import EventIntercept from "../public/lib/event-intercept.es.js"
import EventIntercept from "vue3-event-intercept"


const app = createApp(App)
// app.component("EventIntercept",EventIntercept)

app.mount('#app')
