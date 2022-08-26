<template>
  <div class="app-container">
  <el-breadcrumb style="margin-bottom:5px">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>医疗人员管理</el-breadcrumb-item>
</el-breadcrumb>
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
                @change="handleDeptList()"
              >
                <el-option
                  v-for="item in hospital"
                  :key="item.id"
                  :value="item.id"
                  :label="item.hospitalName"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5">
              <span>人员姓名:</span>
              <el-input
                v-model="realName"
                placeholder="请输入人员姓名"
                style="width:170px"
              ></el-input>
            </el-col>
            <el-col :span="5">
              <span>角色类型:</span>
              <el-select
                v-model="roleName"
                placeholder="请选择"
                style="width:170px"
              >
                <el-option
                  v-for="item in role"
                  :key="item.id"
                  :value="item.roleName"
                  :label="item.roleName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:20px">
            <el-col :span="5">
              <span>所属部门:</span>
              <el-select
                v-model="deptName"
                placeholder="请选择"
                style="width:170px"
              >
                <el-option
                  v-for="item in department"
                  :key="item.id"
                  :value="item.deptName"
                  :label="item.deptName"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="5" style="padding-left:29px">
              <span>职务:</span>
              <el-input v-model="postName" placeholder="请输入职务" style="width:170px"></el-input>
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
            @click="goAdd()"
          >
            <i class="el-icon-plus"></i>新增
          </el-button>

          <el-button type="danger" size="medium" plain @click="handleBatchDelete()">
            <i class="el-icon-delete"></i>批量删除
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
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="人员姓名">
          <template slot-scope="scope">{{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="所属部门">
          <template slot-scope="scope">{{ scope.row.deptName }}</template>
        </el-table-column>
        <el-table-column label="所属科室">
          <template slot-scope="scope">{{ scope.row.officeName }}</template>
        </el-table-column>
        <el-table-column label="职务">
          <template slot-scope="scope">{{ scope.row.postName }}</template>
        </el-table-column>
        <el-table-column label="角色类型">
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="goUpdate(scope.row)"
              >编辑</el-button
            >
            <span>/</span>
            <el-button
              type="text"
              size="medium"
              @click="goDialog(scope.row)"
              >分配权限</el-button
            >

         <!-- 分配权限对话框 -->
          <el-dialog style="float:left" :visible.sync="dialogFormVisible" append-to-body width="550px">
            <template slot="title">
              <div style="float:left;font-weight:bold">
                分配权限
              </div>
            </template>
            <el-form style="padding-top:50px" >
              <el-form-item label="人员名称:">
                <el-input :disabled='true' v-model="realName" style="width:60%"></el-input>
              </el-form-item>
              <el-form-item label="角色名称:">
              <el-select
                v-model="roleId"
                placeholder="请选择"
                style="width:60%"
              >
                <el-option
                  v-for="item in role"
                  :key="item.id"
                  :value="item.id"
                  :label="item.roleName"
                >
                </el-option>
              </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="
                  HandlePermission();
                  dialogFormVisible = false;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>

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
import { fetchList,deleteById,deleteByIds,updateStaff } from "@/api/hospitalStaff";
import { fetchName } from "@/api/hospital";
import { fetchDeptName } from "@/api/department";
import { fetchRoleName } from "@/api/role";
export default {
  name: "hospitalStaff",
  data() {
    return {
      id:'',
      hospitalId: "",
      roleId:"",
      postName:'',
      realName:'',
      deptName:'',
      roleName:'',
      hospital: [],
      department: [],
      role:[],
      list: null,
      total: 0,
      listLoading: true,
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
    this.initList();
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
    initList() {
      this.getList();
      fetchName().then(response => {
        response.data.forEach(element => {
          this.hospital.push(element);
        });
      });
      fetchRoleName().then(response => {
        response.data.forEach(element => {
          this.role.push(element);
        });
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
    handleQuery() {
      this.listLoading = true;
      this.queryParams.data.hospitalId = this.hospitalId;
      this.queryParams.data.realName = this.realName;
      this.queryParams.data.postName = this.postName;
      this.queryParams.data.roleName = this.roleName;
      this.queryParams.data.deptName = this.deptName;
      fetchList(this.queryParams).then(response => {
        this.listLoading = false;
        this.list = response.data.currentPageDatas;
        this.total = response.data.totalDataCount;
        this.queryParams.currentPage = response.data.totalPages;
        this.queryParams.pageSize = response.data.pageSize;
      });
    },
    handleDeptList() {
      this.department = [];
      fetchDeptName(this.hospitalId).then(response => {
        response.data.forEach(element => {
          this.department.push(element);
        });
      });
    },
    goUpdate(row) {
      this.$router.push({
        name: "updateStaff",
        path: "/hospitalStaff/updateStaff",
        params: { isEdit: true, staffDetail: row }
      });
    },
    goAdd() {
      this.$router.push({
        name: "updateStaff",
        path: "/hospitalStaff/updateStaff",
        params: { isEdit: false }
      });
    },
    HandlePermission(){
       let param = {};
       param.id = this.id;
       param.roleId = this.roleId;
       updateStaff(param).then(response =>{
          this.$message({
            message: "分配成功",
            type: "success",
            duration: 1000
          });
          this.getList();
       })
    },
    goDialog(row){
      this.id=row.id;
      this.role.forEach(element => {
          if(row.roleName===element.roleName){
            this.roleId=element.id;
          }
      });
      this.realName=row.realName;
      this.dialogFormVisible=true
    }
    
  }
};
</script>

<style scoped></style>
