import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {
      path: '',
      component: Layout,
      redirect: '/home',
      children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/hospital',
        name: 'hospital',
        component: () => import('@/views/hospitalManager/hospital')
      },
      {
        path: '/hospital/detail',
        name: 'detail',
        component: () => import('@/views/hospitalManager/components/detail')
      },
      {
        path: '/hospital/update',
        name: 'update',
        component: () => import('@/views/hospitalManager/components/update')
      },
      {
        path: '/hospital/add',
        name: 'add',
        component: () => import('@/views/hospitalManager/components/add')
      },
      {
        path: '/building',
        name: 'building',
        component: () => import('@/views/hospitalManager/building')
      }
    ]
    }
  ]
})
