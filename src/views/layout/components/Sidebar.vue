<template>
  <div>
    <span id="title">南京市爱国卫生健康平台</span>
    <el-menu
      :default-active="this.$router.path"
      router
    >
      <el-menu-item index="/home"><i class="el-icon-s-platform"></i>首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i><span>医院管理</span></template>
        <el-menu-item index="/hospital">医院列表</el-menu-item>
        <el-menu-item index="/building">点位管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-order"></i><span>设备管理</span></template>
        <el-menu-item index="/camera">摄像机管理</el-menu-item>
        <el-menu-item index="/offline">离线设备列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-warning"></i><span>报警工单处理</span></template>
        <el-menu-item index="/home">工单推送</el-menu-item>
        <el-menu-item index="/home">工单处理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home"><i class="el-icon-s-data"></i>报警信息统计</el-menu-item>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-user-solid"></i><span>系统管理</span></template>
        <el-menu-item index="/hospitalStaff">医务人员管理</el-menu-item>
        <el-menu-item index="/department">部门管理</el-menu-item>
        <el-menu-item index="/inspector">巡查人员管理</el-menu-item>
        <el-menu-item index="/user">用户管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {

};
</script>

<style>
#title {
  padding-left: 5%;
  font-size: 20px;
  font-style: oblique;
  color: white;
}
</style>
