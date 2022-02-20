import Vue from 'vue'
import App from './app.vue'
import '@/style/index.scss'
import { toast } from '@/components'
Vue.prototype.$toast = toast

new Vue({
  el: '#app',
  render: (h) => h(App)
})
