import Vue from 'vue'
import VueRouter from 'vue-router'
// import { checktoken } from '@/api/user'
const dashboard = import('../views/dashboard')
const article = import('../views/article')
const personal = import('../views/personal')
const register = import('../views/register')
const goOut = import('../views/goOut')

Vue.use(VueRouter)

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
    path: '/article/:id',
    component: () => import('../views/article'),
    meta: { title: 'article' }
  },
  {
    path: '/personal',
    component: () => import('../views/personal'),
    meta: { title: 'personal' }
  },
  {
    path: '/register',
    component: () => import('../views/register'),
    meta: { title: 'register' }
  },
  {
    path: '/goout',
    component: () => import('../views/goOut'),
    meta: { title: 'goout' }
  }
]

const router = new VueRouter({
  routes
})

export default router
