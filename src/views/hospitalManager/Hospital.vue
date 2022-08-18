<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          size="medium"
          label-width="140px"
          style="float: left;height:80px"
        >
          <span>医院名称:</span>
          <el-input
            v-model="simpleQuery.hospitalName"
            style="width: 203px"
            placeholder="请输入医院名称"
          ></el-input>
          <span>所属级别:</span>
          <el-select v-model="simpleQuery.hospitalLevel" placeholder="请选择">
            <el-option v-for="item in levels" :key="item" :value="item">
            </el-option>
          </el-select>
          <span>所属区域:</span>
          <el-select v-model="simpleQuery.hospitalRegion" placeholder="请选择">
            <el-option v-for="item in regions" :key="item" :value="item">
            </el-option>
          </el-select>

          <el-button type="primary" size="medium" @click="handleQuery()">
            搜索
          </el-button>
          <el-button type="primary" size="medium" @click="clearSearch()" plain>
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
              isEdit=false;
              addOrUpdate();
            "
          >
            <i class="el-icon-plus"></i>新增医院
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
        <el-table-column label="医院名称" width="200">
          <template slot-scope="scope">{{ scope.row.hospitalName }}</template>
        </el-table-column>
        <el-table-column label="医院等级" width="200">
          <template slot-scope="scope">{{ scope.row.hospitalLevel }}</template>
        </el-table-column>
        <el-table-column label="医院类别" width="200">
          <template slot-scope="scope">{{ scope.row.hospitalType }}</template>
        </el-table-column>
        <el-table-column label="所属区域">
          <template slot-scope="scope">{{ scope.row.hospitalRegion }}</template>
        </el-table-column>
        <el-table-column label="所在位置">
          <template slot-scope="scope">{{ scope.row.hospitalLocation }}</template>
        </el-table-column>
        <el-table-column label="设备数量">
          <template slot-scope="scope">{{ scope.row.equipmentQuantity }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="
                handleDetail(scope.row)
              "
              >详情</el-button
            >
            <span>/</span>
            <el-button
              type="text"
              size="medium"
              @click="
                isEdit=true
                addOrUpdate(scope.row)
              "
              >编辑</el-button
            >
            <span>/</span>
             <el-button
              style="color:red"
              type="text"
              size="medium"
              @click="
                handleDelete(scope.row);
              "
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
import {fetchListPage ,deleteHospital,deleteHospitalByIds,fetchLevel,fetchRegion} from '@/api/hospital'
export default {

  data() {
    return {
      simpleQuery:{
        hospitalName: "",
        hospitalLevel: "",
        hospitalRegion: ""
      },
      isEdit:true,
      list: null,
      total: 0,
      listLoading: true,
      multipleSelection: [],
      levels:[],
      regions:[],
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
      fetchListPage(this.queryParams).then(response => {
        this.listLoading = false;
        this.list = response.data.currentPageDatas;
        this.total = response.data.totalDataCount;
        this.queryParams.currentPage = response.data.totalPages;
        this.queryParams.pageSize = response.data.pageSize;
      });
      fetchLevel().then(response => {
        this.levels = response.data
      });
      fetchRegion().then(response => {
        this.regions = response.data
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
    handleDelete(row){
       this.$confirm("是否要删除该角色", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteHospital(row.id).then(response => {
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
        deleteHospitalByIds(ids).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleQuery(){
        this.listLoading = true;
        this.queryParams.data = this.simpleQuery;
      fetchListPage(this.queryParams).then(response => {
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
    handleDetail(row){
      this.$router.push({name:'detail',path: '/hospital/detail',params:{hospitalDetail:row}})
    },
    addOrUpdate(row){
      if(this.isEdit===true){
        this.$router.push({name:'update',path: '/hospital/update',params:{hospitalDetail:row}})
      }else{
        this.$router.push({name:'add',path: '/hospital/add',params:{hospitalDetail:null}})
    }
    },     
    clearSearch(){
      this.simpleQuery.hospitalName="",
      this.simpleQuery.hospitalLevel="",
      this.simpleQuery.hospitalRegion=""
    }

  }
};
</script>

<style scoped>
</style>
