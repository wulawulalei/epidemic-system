import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: () => import('../views/dashboard'),
    meta: { title: 'Dashboard' }
  },
  {
    path: '/users',
    component: () => import('../views/users'),
    meta: { title: 'users' }
  },
  {
    path: '/details',
    component: () => import('../views/details'),
    meta: { title: 'details' }
  },
  {
    path: '/outofmanager',
    component: () => import('../views/outofmanager'),
    meta: { title: 'outofmanager' }
  },
  {
    path: '/notice',
    component: () => import('../views/notice'),
    meta: { title: '公告' }
  },
  {
    path: '/editannount',
    component: () => import('../views/editannount'),
    meta: { title: 'editannount' }
  },
  {
    path: '/personal',
    component: () => import('../views/personal'),
    meta: { title: '个人中心' }
  }
]

const router = new Router({
  routes
})

export default router
