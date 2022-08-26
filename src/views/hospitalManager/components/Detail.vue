<template>
<div>
 <el-breadcrumb  style="margin-bottom:20px">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/hospital' }">医院列表</el-breadcrumb-item>
  <el-breadcrumb-item>详情</el-breadcrumb-item>
</el-breadcrumb> 
<el-card class="form-container" shadow="never">
    <div class="box">
      <span>医院名称 : {{ detail.hospitalName }}</span>
      <span>医院等级 : {{ detail.hospitalLevel }}</span>
      <span>医院类别 : {{ detail.hospitalType }}</span>
      <span>所属区域 : {{ detail.hospitalRegion }}</span>
    </div>
    <div class="box">
      <span>所在位置 : {{ detail.hospitalLocation }}</span>
      <span>设备数量 : {{ detail.equipmentQuantity }}</span>
    </div>
    <div style="padding-top:25px;padding-bottom:25px">
      <el-divider></el-divider>
    </div>
    <div class="table-container">
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#8fbcf5', color: '#606266' }"
        v-loading="listLoading"
      >
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="设备名称">
          <template slot-scope="scope">{{ scope.row.equipName }}</template>
        </el-table-column>
        <el-table-column label="所在楼宇">
          <template slot-scope="scope">{{ scope.row.building }}</template>
        </el-table-column>
        <el-table-column label="设备点位">
          <template slot-scope="scope">{{ scope.row.equipLocation }}</template>
        </el-table-column>
      </el-table>
      <div style="padding-top:30px">
        <el-button type="primary" size="medium" plain @click="back()"
          >返回</el-button>
      </div>
    </div>
  </el-card>
</div>

</template>
<script>
import { fetchListByHospitalId } from "@/api/equipment";
const defaultDetail = {
  equipmentQuantity: "",
  hospitalLevel: "",
  hospitalLocation: "",
  hospitalName: "",
  hospitalRegion: "",
  hospitalType: "",
  id: ""
};
export default {
  //   name: "Detail",
  //   props: {
  //     isEdit: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },
  data() {
    return {
      detail: Object.assign({}, defaultDetail),
      list: null,
      listLoading: true
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    handleList() {
      this.detail = this.$route.params.hospitalDetail;
      if (this.$route.params.hospitalDetail != null) {
        fetchListByHospitalId(this.detail.id).then(response => {
          this.listLoading = false
          this.list = response.data
        });
      }
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style>
.box {
  width: 100%;
  margin-bottom: 40px;
}
.box span {
  width: 25%;
  float: left;
  text-align: left;
}
</style>
