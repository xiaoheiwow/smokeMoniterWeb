// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import store from './store/index.js'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import * as echarts from 'echarts';
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
Vue.prototype.$echarts = echarts

Vue.use(VXETable)
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
