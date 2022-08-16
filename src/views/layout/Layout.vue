<template>
  <div>
    <el-container>
      <el-aside width="250px">
        <Sidebar></Sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <Navbar></Navbar>
        </el-header>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

 
<script>
import { Navbar, Sidebar, AppMain } from './components'

 
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
}
</script>

<style>
.el-header {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-card{
   margin-bottom:15px;
}

.el-aside {
  background-color: black;
  text-align: left;
  line-height: 200px;
  height: 100vh;
}

.el-main {
  background-color: #dee5ed;
  color: #333;
  text-align: center;
}

body > .el-container {
  height: 100%;
}
body,
html {
  height: 100%;
  margin: 0px;
}

</style>