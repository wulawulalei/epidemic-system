import { beforeEnter } from '@/api/login'
export const intercept = {
  beforeCreate () {
    const token = localStorage.getItem('token') || undefined
    if (token) {
      beforeEnter().then((res) => {
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
        }
      })
    } else if (!token && window.location.pathname != '/login.html') {
      window.location.pathname = '/login.html'
    }
  }
}
