import { beforeEnter } from '@/api/login'
import store from '@/store'
export const intercept = {
  created () {
    const token = store.getters.token
    if (token) {
      beforeEnter().then((res) => {
        console.log(res)
        res.username && this.$store.commit('app/changeUsername', res.username)
        res.avatar && this.$store.commit('app/changeAvatar', res.avatar)
        res.account && this.$store.commit('app/changeAccount', res.account)
        if (res.identity == 0 && window.location.pathname != '/user.html') {
          window.location.pathname = '/user.html'
        } else if (
          res.identity == 1 &&
          window.location.pathname != '/admin.html'
        ) {
          window.location.pathname = '/admin.html'
        } else if (
          res.identity != 0 &&
          res.identity != 1 &&
          window.location.pathname != '/login.html'
        ) {
          window.location.pathname = '/login.html'
        } else {
          this.loading = false
        }
      })
      // console.log(2);
    } else if (!token && window.location.pathname != '/login.html') {
      window.location.pathname = '/login.html'
      // console.log(1);
    }
  }
}
