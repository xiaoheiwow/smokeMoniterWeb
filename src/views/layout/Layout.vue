<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />    <!-- 侧边栏部分 -->
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />    <!-- 头部部分 -->
      </div>
      <app-main />   <!-- 主体部分 -->
    </div>
  </div>
</template>
 
<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
 
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
}
</script>