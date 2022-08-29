<template>
  <div class="app-container">
  <el-breadcrumb style="margin-bottom:5px">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>离线设备</el-breadcrumb-item>
</el-breadcrumb>
    <el-card class="filter-container" shadow="never">
      <div style="padding-bottom:30px">
        <h1 style="float:left;margin:0;font-size:20px"></h1>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          size="medium"
          label-width="100px"
          style="float: left;height:80px"
        >
          <span>摄像机编号:</span>
          <el-input
            v-model="simpleQuery.equipName"
            style="width: 160px"
            placeholder="请输入编号搜索"
          ></el-input>
          <span>所属医院:</span>
          <el-select
            v-model="simpleQuery.hospitalName"
            style="width: 170px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in hospitals"
              :key="item.hospitalId"
              :value="item.hospitalName"
              :label="item.hospitalName"
            >
            </el-option>
          </el-select>
          <span>设备点位:</span>
          <el-input
            v-model="simpleQuery.equipLocation"
            style="width: 170px"
            placeholder="请输入所在点位"
          ></el-input>
          <span>所在楼宇:</span>
          <el-input
            v-model="simpleQuery.building"
            style="width: 170px"
            placeholder="请输入所在楼宇"
          ></el-input>
          <el-button type="primary" size="medium" @click="handleQuery()">
            查询
          </el-button>
          <el-button type="primary" size="medium" plain @click="clearQuery()">
            重置
          </el-button>
        </el-form>
      </div>
    </el-card>

    <div class="table-container">
      <el-table
        id="table"
        :data="list"
        tooltip-effect="dark"
        v-loading="listLoading"
      >
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="摄像机ID编号">
          <template slot-scope="scope">{{ scope.row.equipName }}</template>
        </el-table-column>
        <el-table-column label="所属医院" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.hospitalName }}</template>
        </el-table-column>
        <el-table-column label="摄像头定位" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.position }}</template>
        </el-table-column>
        <el-table-column label="所在楼宇" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.building }}</template>
        </el-table-column>
        <el-table-column label="设备点位" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.equipLocation }}</template>
        </el-table-column>
        <el-table-column label="访问地址" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.ipLocation }}</template>
        </el-table-column>
        <el-table-column label="账号" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </el-table-column>
        <el-table-column label="密码" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.password }}</template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.equipStatus"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <!-- 删除属性:current-page.sync="queryParams.currentPage" -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="queryParams.pageSize"
        :page-sizes="[5, 10, 15]"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList,updateStatusById} from "@/api/equipment";
import { fetchName } from "@/api/hospital";
export default {
  name: "offline",
  data() {
    return {
      hospitals: [],
      simpleQuery: {
        equipName: "",
        equipStatus: "",
        hospitalName: "",
        equipLocation: "",
        building: ""
      },
      value: "",
      list: null,
      total: 0,
      listLoading: true,
      dialogBoxVisible: false,
      dialogFormVisible: false,
      queryParams: {
        currentPage: 1,
        data: {},
        groupColumn: "",
        orderColumn: "",
        pageSize: 10
      }
    };
  },
  created() {
    fetchName().then(response => {
      response.data.forEach(element => {
        this.hospitals.push(element);
      });
    });
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.queryParams.data.equipStatus = 0;
      fetchList(this.queryParams).then(response => {
        this.listLoading = false;
        this.list = response.data.currentPageDatas;
        this.total = response.data.totalDataCount;
        this.queryParams.currentPage = response.data.totalPages;
        this.queryParams.pageSize = response.data.pageSize;
      });
    },
    handleSizeChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.queryParams.currentPage = val;
      this.getList();
    },
    clearQuery() {
      this.simpleQuery.equipName = "";
      this.simpleQuery.equipStatus = "";
      this.simpleQuery.hospitalName = "";
      this.simpleQuery.equipLocation = "";
      this.simpleQuery.building = "";
    },
    handleQuery() {
      this.listLoading = true;
      this.queryParams.data = this.simpleQuery;
      this.queryParams.data.equipStatus = "0";
      fetchList(this.queryParams).then(response => {
        this.listLoading = false;
        if (null === response.data) {
          this.list = null;
          this.total = 0;
          this.queryParams.pageSize = 10;
        } else {
          this.list = response.data.currentPageDatas;
          this.total = response.data.totalDataCount;
          this.queryParams.currentPage = response.data.totalPages;
          this.queryParams.pageSize = response.data.pageSize;
        }
      });
    },
     handleStatusChange(row) {
      updateStatusById(row.id)
        .then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        })
        .catch(error => {
          row.equipStatus ^= 1
        });
    },
  }
};
</script>

<style scoped></style>
