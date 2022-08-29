<template>
  <div class="app-container">
    <el-breadcrumb style="margin-bottom:5px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="filter-container" shadow="never">
      <div style="padding-bottom:30px">
        <h1 style="float:left;margin:0;font-size:20px">角色管理</h1>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          size="medium"
          label-width="140px"
          style="float: left;height:80px"
        >
          <i class="el-icon-search"></i>
          <span>角色名称</span>
          <el-input
            v-model="value"
            style="width: 203px"
            placeholder="请输入角色名称"
          ></el-input>
          <el-button type="primary" size="medium" @click="handleQuery()">
            查询
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

          <el-button
            type="primary"
            size="medium"
            @click="
              dialogFormVisible = true;
              handlePermissionList();
            "
          >
            <i class="el-icon-plus"></i>新增
          </el-button>

          <!-- 新增对话框 -->
          <el-dialog
            style="float:left;width:1000px;margin-left:500px"
            :visible.sync="dialogFormVisible"
          >
            <template slot="title">
              <div style="float:left;font-weight:bold">
                新增
              </div>
            </template>
            <el-form :model="role" style="padding-top:50px">
              <el-form-item label="角色名称">
                <el-input
                  v-model="addParam.roleName"
                  autocomplete="off"
                  aria-required="true"
                ></el-input>
              </el-form-item>
              <el-tree
                style="padding-left:70px"
                :data="permissions"
                show-checkbox
                node-key="id"
                :props="roleProps"
                ref="tree"
                highlight-current
              >
              </el-tree>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="
                  dialogFormVisible = false;
                  handleAddRole();
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>

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
              @click="
                dialogUpdateVisible = true;
                checkRole(scope.row);
              "
              >编辑</el-button
            >

            <!-- 编辑对话框 -->
            <el-dialog
              width="550px"
              style="float:left"
              :visible.sync="dialogUpdateVisible"
              append-to-body
            >
              <template slot="title">
                <div style="font-weight:bold">
                  编辑
                </div>
              </template>
              <el-form :model="role">
                <el-form-item label="角色名称:" style="padding-left:90px">
                  <el-input
                    v-model="role.roleName"
                    autocomplete="off"
                    style="width:200px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="角色描述:" style="padding-left:90px">
                  <el-input
                    v-model="role.comments"
                    autocomplete="off"
                    style="width:200px"
                  ></el-input>
                </el-form-item>
                <el-form-item label="备注:" style="padding-left:90px">
                  <el-input
                    v-model="role.remarks"
                    autocomplete="off"
                    style="width:200px;padding-left:28px"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogUpdateVisible = false"
                  >取 消</el-button
                >
                <el-button
                  type="primary"
                  @click="
                    handleUpdateRole();
                    dialogUpdateVisible = false;
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
import {
  fetchList,
  deleteById,
  deleteByIds,
  modifyFillById,
  getPermissionList,
  insertRoleAndPermission
} from "@/api/role";
export default {
  name: "role",
  data() {
    return {
      roleProps: {
        label: "permissionName",
        children: "children"
      },
      addParam: {
        roleName: "",
        permissions: []
      },
      permissions: [],
      value: "",
      role: {
        id: "",
        roleName: "",
        remarks: "",
        comments: ""
      },
      list: null,
      total: 0,
      listLoading: true,
      dialogUpdateVisible: false,
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
    handleUpdateRole() {
      modifyFillById(this.role).then(response => {
        this.$message({
          message: "编辑成功",
          type: "success",
          duration: 1000
        });
        this.getList();
      });
    },
    handleQuery() {
      this.listLoading = true;
      this.queryParams.data.roleName = this.value;
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
    checkRole(row) {
      this.role.id = row.id;
      this.role.roleName = row.roleName;
      this.role.comments = row.comments;
      this.role.remarks = row.remarks;
    },
    handlePermissionList() {
      getPermissionList().then(response => {
        this.permissions = response.data;
      });
    },
    handleAddRole() {
      this.addParam.permissions = this.$refs.tree.getCheckedKeys();   
      insertRoleAndPermission(this.addParam).then(response => {
        if (response.data == 1) {
          this.$message({
            message: "新增成功",
            type: "success",
            duration: 1000
          });
        }
        this.addParam.roleName='';
        this.addParam.permissions=[];
      });
    },
  }
};
</script>

<style scoped></style>
