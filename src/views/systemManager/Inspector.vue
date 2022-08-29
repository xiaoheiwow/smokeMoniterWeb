<template>
  <div class="app-container">
  <el-breadcrumb style="margin-bottom:5px">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>巡查人员管理</el-breadcrumb-item>
</el-breadcrumb>
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          size="medium"
          label-width="140px"
          style="float: left;height:80px"
        >
          <span
            style="float:left;padding-top:10px;padding-right:10px;font-size:15px"
            >医院名称:</span
          >
          <el-select
            v-model="hospitalId"
            style="float:left;width: 200px;padding-right:20px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in hospital"
              :key="item.id"
              :value="item.id"
              :label="item.hospitalName"
            >
            </el-option>
          </el-select>
          <span>人员姓名</span>
          <el-input
            v-model="realName"
            style="width: 203px"
            placeholder="请输入角色名称"
          ></el-input>
          <span style="padding-left:10px">巡查范围</span>
          <el-input
            v-model="seachScope"
            style="width: 203px"
            placeholder="请输入巡查范围"
          ></el-input>
          <el-button type="primary" size="medium" @click="handleQuery()">
            查询
          </el-button>
          <el-button
            type="success"
            size="medium"
            plain
            @click="fetchBanedList()"
          >
            {{flag==0?"黑名单":"白名单"}}
          </el-button>
        </el-form>
        <el-form
          :inline="true"
          :model="queryParams"
          size="medium"
          label-width="140px"
          style="float: right;height:80px"
        >
          <el-button type="warning" size="medium" plain @click="this.$utils.exportExcel">
            <i class="el-icon-document-add"></i>导出数据
          </el-button>

          <el-button type="primary" size="medium" @click="goAdd()">
            <i class="el-icon-plus"></i>新增
          </el-button>

          <el-button
            type="danger"
            size="medium"
            plain
            @click="handleBatchDelete()"
          >
            <i class="el-icon-delete"></i>批量删除
          </el-button>
        </el-form>
      </div>
    </el-card>

    <div class="table-container">
      <el-table
        id="table"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">{{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="巡查范围" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.scope }}</template>
        </el-table-column>
        <el-table-column label="职务" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.postName }}</template>
        </el-table-column>
        <el-table-column label="巡查时间(小时)" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.costTime }}</template>
        </el-table-column>
        <el-table-column label="最后登录时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.lastTime }}</template>
        </el-table-column>
        <el-table-column label="登录IP" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.ipLocation }}</template>
        </el-table-column>
        <el-table-column label="登录次数">
          <template slot-scope="scope">{{ scope.row.loginTimes }}</template>
        </el-table-column>
        <el-table-column label="联系方式" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="goUpdate(scope.row)"
              >编辑</el-button
            >
            <span>/</span>
            <el-button
              style="color:red"
              type="text"
              size="medium"
              @click="handleDeleteById(scope.row)"
              >删除</el-button
            >
            <span>/</span>
            <el-button
              type="text"
              size="medium"
              @click="handleBanStatus(scope.row)"
              >{{
                scope.row.isBanned === 0 ? "加入黑名单" : "移出黑名单"
              }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
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
import {
  fetchList,
  deleteById,
  deleteByIds,
  banInspectorById
} from "@/api/inspector";
import { fetchName } from "@/api/hospital";
export default {
  name: "inspector",
  data() {
    return {
      flag: 0,
      hospitalId: "",
      hospital: [],
      realName: "",
      seachScope: "",
      list: null,
      total: 0,
      listLoading: true,
      multipleSelection: [],
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
    this.getList();
    fetchName().then(response => {
      response.data.forEach(element => {
        this.hospital.push(element);
      });
    });
  },
  methods: {
    handleList() {
      fetchList(this.queryParams).then(response => {
        this.listLoading = false;
        this.list = response.data.currentPageDatas;
        this.total = response.data.totalDataCount;
        this.queryParams.currentPage = response.data.totalPages;
        this.queryParams.pageSize = response.data.pageSize;
      });
    },
    getList() {
      this.listLoading = true;
      this.queryParams.data.isBanned = 0;
      this.handleList();
    },
    fetchBanedList() {
      if (this.flag === 0) {
        this.flag = 1;
        this.handleQuery();
      } else {
        this.flag = 0;
        this.handleQuery();
      }
    },
    handleQuery() {
      this.listLoading = true;
      this.queryParams.data.isBanned = this.flag;
      this.queryParams.data.realName = this.realName;
      this.queryParams.data.scope = this.seachScope;
      this.queryParams.data.hospitalId = this.hospitalId;
      fetchList(this.queryParams).then(response => {
        this.listLoading = false;
        this.list = response.data.currentPageDatas;
        this.total = response.data.totalDataCount;
        this.queryParams.currentPage = response.data.totalPages;
        this.queryParams.pageSize = response.data.pageSize;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    handleDeleteById(row) {
      this.$confirm("是否要删除所选项", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteById(row.id).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleBatchDelete() {
      let ids = [];
      this.$confirm("是否要删除所选项", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        for (let item of this.multipleSelection) {
          ids.push(item.id);
        }
        deleteByIds(ids).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    goUpdate(row) {
      this.$router.push({
        name: "updateInspector",
        path: "/inspector/updateInspector",
        params: { isEdit: true, inspectorDetail: row }
      });
    },
    goAdd() {
      this.$router.push({
        name: "updateInspector",
        path: "/inspector/updateInspector",
        params: { isEdit: false }
      });
    },
    handleBanStatus(row) {
      if (row.isBanned === 0) {
        this.$confirm("是否将该用户加入黑名单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          banInspectorById(row.id).then(response => {
            this.$message({
              message: "禁用成功",
              type: "success",
              duration: 1000
            });
            this.getList();
          });
        });
      } else {
        this.$confirm("是否将该用户移出黑名单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          banInspectorById(row.id).then(response => {
            this.$message({
              message: "禁用成功",
              type: "success",
              duration: 1000
            });
            this.fetchBandList();
          });
        });
      }
    }
  }
};
</script>

<style scoped></style>
