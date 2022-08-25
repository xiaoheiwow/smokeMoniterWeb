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
          <span
            style="float:left;padding-top:10px;padding-right:10px;font-size:15px"
            >所属医院:</span
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
          <span>工单编号:</span>
          <el-input
            v-model="orderNumber"
            style="width: 203px"
            placeholder="工单编号"
          ></el-input>
          <span style="padding-left:18px">处理情况:</span>
          <el-select
            v-model="situation"
            style="width: 200px;padding-right:20px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in situations"
              :key="item.id"
              :value="item.id"
              :label="item.label"
            >
            </el-option>
          </el-select>
          <el-button type="primary" size="medium" @click="handleQuery()">
            搜索
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
      >
        <el-table-column label="序号">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="工单编号">
          <template slot-scope="scope">{{ scope.row.orderNumber }}</template>
        </el-table-column>
        <el-table-column label="报警时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="地址" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column label="联系方式" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.handlerPhone }}</template>
        </el-table-column>
        <el-table-column label="报警类别">
          <template slot-scope="scope">{{ scope.row.alarmType }}</template>
        </el-table-column>
        <el-table-column label="处理情况">
          <template slot-scope="scope" style="background:red"
          >
          <div>
            <span v-show="scope.row.situation==0" style="color:red">
                待处理
            </span>
            <span v-show="scope.row.situation==1" style="color:blue">
                处理中
            </span>
            <span v-show="scope.row.situation==2" style="color:green">
                已处理
            </span>
          </div>


          </template>
        </el-table-column>
        <el-table-column label="优先级">
          <template slot-scope="scope">{{ scope.row.priority }}</template>
        </el-table-column>
        <el-table-column label="处理进度">
          <template slot-scope="scope">{{ scope.row.orderProgress }}</template>
        </el-table-column>
        <el-table-column label="负责人">
          <template slot-scope="scope">{{ scope.row.handlerName }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              @click="
                goDetail(scope.row)
              "
              >查看</el-button
            >
            <span>/</span>
            <el-button
              type="text"
              size="medium"
              @click="goUpdate(scope.row)"
              >编辑</el-button
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
import { fetchHandedList} from "@/api/order";
import { fetchName} from "@/api/hospital";
export default {
  name: "orderHandler",
  data() {
    return {
      hospitalId:'',
      orderNumber:'',
      handlerName:'',
      situation:'',
      situations:[
        {
          id:0,
          label:"待处理"
        },
        {
          id:1,
          label:"处理中"
        },
        {
          id:2,
          label:"已处理"
        }
      ],
      dialogData:{},
      hospital:[],
      users:[],
      list: null,
      total: 0,
      listLoading: true,
      dialogFormVisible: false,
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
      fetchName().then(response => {
        response.data.forEach(element => {
          this.hospital.push(element);
        });
      });
    }, 
  methods: {
    getList() {
      this.listLoading = true;
      fetchHandedList(this.queryParams).then(response => {
        this.listLoading = false;
        this.list = response.data.currentPageDatas;
        this.total = response.data.totalDataCount;
        this.queryParams.currentPage = response.data.totalPages;
        this.queryParams.pageSize = response.data.pageSize;
      });
    },
    handleQuery(){
      this.queryParams.data.hospitalId = this.hospitalId;
      this.queryParams.data.situation = this.situation;
      this.queryParams.data.orderNumber = this.orderNumber;
      this.getList()
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
    goUpdate(row) {
      this.$router.push({
        name: "updateOrderHandler",
        path: "/orderHandler/updateOrderHandler",
        params: {orderDetail: row }
      });
    },
    goDetail(row){
      this.$router.push({
        name: "orderDetail",
        path: "/orderHandler/orderDetail",
        params: {orderDetail: row }
      });
    }

  }
};
</script>

<style scoped></style>
