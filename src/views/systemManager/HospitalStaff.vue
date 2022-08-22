<template>
  <div class="app-container">
    <el-card shadow="never" style="height:150px">
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          size="medium"
          label-width="130px"
          style="float: left;height:50px;width:80%"
        >
          <el-row style="padding-bottom:20px">
            <el-col :span="5">
              <span>医院名称:</span>
              <el-select
                v-model="hospitalId"
                placeholder="请选择"
                style="width:170px"
              >
                <el-option
                  v-for="item in deptId"
                  :key="item.id"
                  :value="item.id"
                  :label="item.hospitalName"
                  @change="handleDeptList()"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <span>人员姓名:</span>
              <el-input
                placeholder="请输入人员姓名"
                style="width:170px"
              ></el-input>
            </el-col>
            <el-col :span="5">
              <span>角色类型:</span>
              <el-input
                placeholder="请输入角色类型"
                style="width:170px"
              ></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:20px">
            <el-col :span="5">
              <span>所属部门:</span>
              <el-select
                v-model="deptId"
                placeholder="请选择"
                style="width:170px"
              >
                <el-option
                  v-for="item in department"
                  :key="item.id"
                  :value="item.id"
                  :label="item.deptName"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" style="padding-left:29px">
              <span>职务:</span>
              <el-input placeholder="请输入职务" style="width:170px"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" size="medium" @click="handleQuery()">
                搜索
              </el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-form
          :inline="true"
          :model="queryParams"
          size="small"
          label-width="140px"
          style="float: right;height:80px"
        >
          <el-button type="warning" size="medium" plain>
            <i class="el-icon-document-add"></i>导出数据
          </el-button>

          <el-button
            type="primary"
            size="medium"
            @click="dialogFormVisible = true"
          >
            <i class="el-icon-plus"></i>新增
          </el-button>

          <el-button type="danger" size="medium" plain>
            <i class="el-icon-delete"></i>删除
          </el-button>
        </el-form>
      </div>
    </el-card>

    <div class="table-container" style="margin-top:30px">
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="listLoading"
        @selection-change="handleSelectionChange"
        border
      >
        <el-table-column type="selection" width="80"> </el-table-column>
        <el-table-column label="序号" width="200">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="角色名称" width="200">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column label="角色描述" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.comments }}</template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.remarks }}</template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="dialogFormVisible = true"
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
import { fetchList } from "@/api/hospitalStaff";
import { fetchName } from "@/api/hospital";
import { fetchDeptName } from "@/api/department";
export default {
  name: "hospitalStaff",
  data() {
    return {
      hospitalId: "",
      deptId: "",
      hospital: [],
      department: [],
      list: null,
      total: 0,
      listLoading: true,
      dialogBoxVisible: false,
      dialogFormVisible: false,
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
    getList() {
      this.listLoading = true;
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
    handleDeptList() {
      fetchDeptName(this.hospitalId).then(response => {
        response.data.forEach(element => {
          this.department.push(element);
        });
      });
    }
  }
};
</script>

<style scoped></style>
