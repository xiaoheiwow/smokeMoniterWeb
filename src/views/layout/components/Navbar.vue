<template>
  <header>
    <div />
    <div class="opt-wrapper">
      <span>
        <el-button
          type="info"
          icon="el-icon-bell"
          circle
          size="small"
          style="margin-right:-10px"
        ></el-button>
        <el-button
          style="margin-right:10px"
          type="info"
          icon="el-icon-setting"
          circle
          size="small"
        ></el-button>
      </span>
      <span>
        <el-dropdown :hide-on-click="false">
          <div class="demo-basic--circle">
            <el-avatar :size="40" :src="avatar" :class="['avatar-info']" style="margin-right:5px;margin-bottom:-15px">
            </el-avatar>
            <span>
              druid
            </span>
          </div>
          <el-dropdown-menu
            slot="dropdown"
            style="margin-top:-20px;margin-left: -20px;"
          >
            <el-dropdown-item
              ><i class="el-icon-info"></i>个人中心</el-dropdown-item
            >
            <el-dropdown-item
              ><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      avatar:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  }
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}
/*设定头像图片样式*/
.avatar-info {
  margin-top: 10px;
  margin-right: 40px;
  cursor: pointer;
}
.el-button--info {
    color: #000;
    background-color: #ffffff;
    border-color: #ffffff;
}
</style>
