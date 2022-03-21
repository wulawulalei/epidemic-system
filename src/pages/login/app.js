import Vue from 'vue'
import App from './app.vue'
import store from '@/store'
import '@/style/index.scss'
// import 'element-ui/lib/theme-chalk/index.css'
import { toast } from '@/components'
Vue.prototype.$toast = toast

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
})
