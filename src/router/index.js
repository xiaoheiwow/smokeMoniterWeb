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
    },
    {
      path: '',
      component: Layout,
      redirect: '/home',
      children: [
      {
        path: '/camera',
        name: 'camera',
        component: () => import('@/views/equipManager/camera')
      }, 
      {
        path: '/offline',
        name: 'offline',
        component: () => import('@/views/equipManager/offline')
      }, 
      {
        path: '/camera/updateEquip',
        name: 'updateEquip',
        component: () => import('@/views/equipManager/components/updateEquip')
      }, 
      {
        path: '/camera/addEquip',
        name: 'addEquip',
        component: () => import('@/views/equipManager/components/addEquip')
      },
    ]
    },
    {
      path: '',
      component: Layout,
      redirect: '/home',
      children: [
      {
        path: '/department',
        name: 'department',
        component: () => import('@/views/systemManager/department')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/systemManager/role')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/systemManager/user')
      },
      {
        path: '/user/updateUser',
        name: 'updateUser',
        component: () => import('@/views/systemManager/components/updateUser')
      },
      {
        path: '/inspector',
        name: 'inspector',
        component: () => import('@/views/systemManager/inspector')
      },
      {
        path: '/inspector/updateInspector',
        name: 'updateInspector',
        component: () => import('@/views/systemManager/components/updateInspector')
      },
      {
        path: '/hospitalStaff',
        name: 'hospitalStaff',
        component: () => import('@/views/systemManager/hospitalStaff.vue')
      },
      {
        path: '/hospitalStaff/updateStaff',
        name: 'updateStaff',
        component: () => import('@/views/systemManager/components/updateStaff')
      },
    ]
    },
    {
      path: '',
      component: Layout,
      redirect: '/home',
      children: [
      {
        path: '/orderPush',
        name: 'orderPush',
        component: () => import('@/views/orderHandler/orderPush')
      },
      {
        path: '/orderHandler',
        name: 'orderHandler',
        component: () => import('@/views/orderHandler/orderHandler.vue')
      },
      {
        path: '/orderHandler/updateOrderHandler',
        name: 'updateOrderHandler',
        component: () => import('@/views/orderHandler/components/updateOrderHandler')
      },
      {
        path: '/orderHandler/orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/orderHandler/components/orderDetail')
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('@/components/message')
      },

    ]
    },
  ]
})
