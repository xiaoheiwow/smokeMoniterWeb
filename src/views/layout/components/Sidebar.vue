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
        <template slot="title"><i class="el-icon-user-solid"></i><span>设备管理</span></template>
        <el-menu-item index="/userManager/user">摄像机管理</el-menu-item>
        <el-menu-item index="/userManager/role">离线设备列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-user-solid"></i><span>报警工单处理</span></template>
        <el-menu-item index="/userManager/user">工单推送</el-menu-item>
        <el-menu-item index="/userManager/role">工单处理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home"><i class="el-icon-s-platform"></i>报警信息统计</el-menu-item>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-user-solid"></i><span>系统管理</span></template>
        <el-menu-item index="/userManager/user">医务人员管理</el-menu-item>
        <el-menu-item index="/userManager/user">部门管理</el-menu-item>
        <el-menu-item index="/userManager/role">巡查人员管理</el-menu-item>
        <el-menu-item index="/">用户管理</el-menu-item>
        <el-menu-item index="/">角色管理</el-menu-item>
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
