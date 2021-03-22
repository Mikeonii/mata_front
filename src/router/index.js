import Vue from 'vue'
import VueRouter from 'vue-router'
import Summary from '../views/Summary.vue'
import Profile from '../views/Profile.vue'
import SignIn from '../views/SignIn.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'SignIn'
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/payments',
    name: 'Payments',
    component: () => import(/* webpackChunkName: "Payments" */ '../views/Payments.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'SignIn'
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import(/* webpackChunkName: "Summary" */ '../views/Summary.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'SignIn'
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/profile/:service_id',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'SignIn'
        })
      }
      else {
        next();
      }
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
