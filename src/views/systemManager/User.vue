<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="padding-bottom:30px">
        <h1 style="float:left;margin:0;font-size:20px">用户管理</h1>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          size="medium"
          label-width="140px"
          style="float: left;height:80px"
        >
          <i class="el-icon-search"></i>
          <span>用户名称</span>
          <el-input
            v-model="realName"
            style="width: 203px"
            placeholder="请输入用户名称"
          ></el-input>
          <el-button type="primary" size="medium" @click="handleQuery()">
            查询
          </el-button>
          <el-button type="primary" size="medium" plain @click="realName = ''">
            重置
          </el-button>
        </el-form>
        <el-form
          :inline="true"
          :model="queryParams"
          size="medium"
          label-width="140px"
          style="float: right;height:80px"
        >
          <el-button type="warning" size="medium" plain>
            <i class="el-icon-document-add"></i>导出数据
          </el-button>

          <el-button
            type="primary"
            size="medium"
            @click="
              goAdd()
            "
          >
            <i class="el-icon-plus"></i>新增
          </el-button>

          <el-button
            type="danger"
            size="medium"
            plain
          >
            <i class="el-icon-delete"></i>删除
          </el-button>
        </el-form>
      </div>
    </el-card>

    <div class="table-container">
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
        <el-table-column label="用户名" width="200">
          <template slot-scope="scope">{{ scope.row.realName }}</template>
        </el-table-column>
        <el-table-column label="ID" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column label="密码" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.realPass }}</template>
        </el-table-column>
        <el-table-column label="联系方式" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column label="所属角色" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.roleName }}</template>
        </el-table-column>
        <el-table-column label="身份证" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.identificationNumber }}</template>
        </el-table-column>
        <el-table-column label="是否禁用" show-overflow-tooltip>
            <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isEnable"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="
                goUpdate(scope.row)
              "
              >编辑</el-button
            >
            <span>/</span>
            <el-button
              style="color:red"
              type="text"
              size="medium"
              @click="
                handleDeleteById(scope.row)
              "
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
import { fetchList,updateStatusById,deleteById,deleteByIds} from "@/api/user";
export default {
  name: "user",
  data() {
    return {
      realName:'',
      value: "",
      list: null,
      total: 0,
      listLoading: true,
      multipleSelection: [],
      queryParams: {
        currentPage: 1,
        data: {
        },
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
      this.$confirm("是否要删除该用户?", "提示", {
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
      this.$confirm("是否要删除已选用户?", "提示", {
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
    handleStatusChange(row) {
      updateStatusById(row.id)
        .then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
        })
        .catch(error => {
          row.equipStatus ^= 1
        });
    },
    goUpdate(row){
      if(null===row.roleName){
        row.roleName=""
      }
      this.$router.push(
        {
          name:'updateUser',
          path: '/user/updateUser',
          params:{isEdit:true,userDetail:row}
        }
      )
    },
    goAdd(){
      this.$router.push(
        {
          name:'updateUser',
          path: '/user/updateUser',
          params:{isEdit:false}
        }
      )
    }
  }
};
</script>

<style scoped></style>
