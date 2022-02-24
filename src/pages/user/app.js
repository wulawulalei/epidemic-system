import Vue from 'vue'
import App from './app.vue'
import router from './router'
import '@/style/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import { Button, toast } from '@/components'

Vue.use(Button)
Vue.prototype.$toast = toast

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
