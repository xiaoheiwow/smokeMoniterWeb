<template>
  <div>
    <div class="divCard">
      <el-card style="height: 100%;">
        <div style="float:left;width: 100%;">
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
          <el-button
            style="float:left;margin-top:2px"
            type="primary"
            size="medium"
            @click="getList()"
          >
            搜索
          </el-button>
        </div>
        <div style="padding-top:60px">
          <span style="float:left;font-size:20px;color:blue">楼宇</span>
          <el-button
            style="float:right;margin-left:20px"
            type="danger"
            size="medium"
            plain
            @click="handleBatchDelete()"
            >删除</el-button
          >
          <el-button
            style="float:right"
            type="primary"
            size="medium"
            @click="isEdit=false;dialogBoxVisible = true"
            >新增</el-button
          >

          <!-- 楼宇更新对话框 -->
          <el-dialog
            width="350px"
            style="float:left"
            :visible.sync="dialogBoxVisible"
            append-to-body
          >
            <template slot="title">
              <div v-if="isEdit" style="float:left;font-weight:bold">
                编辑
              </div>
              <div v-else style="float:left;font-weight:bold">
                新增
              </div>
            </template>

            <div>
              <span>楼宇名称:</span>
              <el-input v-model="buildingName"></el-input>
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button
                @click="
                  dialogBoxVisible = false;
                  buildingName = '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  dialogBoxVisible = false;
                  handleUpdate();
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>
        <div style="padding-top:20px">
          <el-table
            :data="buildingList"
            tooltip-effect="dark"
            style="width: 100%;padding-top:30px"
            v-loading="listLoading"
            :header-cell-style="{ background: '#c8e0f5', color: '#606266' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="150px"> </el-table-column>
            <el-table-column label="楼宇名称">
              <template slot-scope="scope">{{
                scope.row.buildingName
              }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="medium"
                  @click="
                    buildingName = scope.row.buildingName;
                    id = scope.row.id;
                    isEdit = true;
                    dialogBoxVisible = true;
                  "
                  >编辑</el-button
                >
                <span>/</span>
                <el-button
                  style="color:red"
                  type="text"
                  size="medium"
                  @click="handleDeleteById(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <div class="divCard">
      <el-card style="height: 100%;">
        <div style="float:left;width: 100%;" hidden>
          <span
            style="float:left;padding-top:5px;padding-right:10px;font-size:15px"
            >点位名称:</span
          >
          <el-input
            size="small"
            style="float:left;width: 200px;padding-right:20px"
            placeholder="请点位医院名称"
          ></el-input>
          <el-button style="float:left" type="primary" size="small">
            搜索
          </el-button>
        </div>
        <div style="padding-top:60px">
          <span style="float:left;font-size:20px;color:blue">点位</span>
          <el-button
            style="float:right;margin-left:20px"
            type="danger"
            size="medium"
            plain
            @click="handleLocationBatchDelete()"
            >删除</el-button
          >
          <el-button style="float:right" type="primary" size="medium"
          @click="isEdit=false;dialogLocationVisible=true"
            >新增</el-button
          >
        </div>

        <!-- 点位更新对话框 -->
        <el-dialog
          width="350px"
          style="float:left"
          :visible.sync="dialogLocationVisible"
          append-to-body
        >
          <template slot="title">
            <div v-if="isEdit" style="float:left;font-weight:bold">
              编辑
            </div>
            <div v-else style="float:left;font-weight:bold">
              新增
            </div>
          </template>

          <div>
            <span>点位名称:</span>
            <el-input v-model="locationName"></el-input>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button
              @click="
                dialogLocationVisible = false;
                locationName = '';
              "
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="
                dialogLocationVisible = false;
                handleLocationUpdate();
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <div style="padding-top:20px">
          <el-table
            :data="equipLoactionList"
            tooltip-effect="dark"
            style="width: 100%;padding-top:30px"
            v-loading="listLoading2"
            :header-cell-style="{ background: '#c8e0f5', color: '#606266' }"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="150px"> </el-table-column>
            <el-table-column label="点位名称">
              <template slot-scope="scope">{{
                scope.row.locationName
              }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="medium"
                  @click="
                    locationName = scope.row.locationName;
                    id = scope.row.id;
                    isEdit = true;
                    dialogLocationVisible = true;
                  "
                  >编辑</el-button
                >
                <span>/</span>
                <el-button style="color:red" type="text" size="medium" @click="handleLocationDeleteById(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {
  fetchBuildingList,
  addBuilding,
  updateBuilding,
  deleteById,
  deleteByIds
} from "@/api/building";
import {
  fetchEquipLoactionList,
  addLocation,
  updateLocation,
  deleteLocationById,
  deleteLocationByIds
} from "@/api/equipLocation";
import { fetchName } from "@/api/hospital";
export default {
  name: "builidng",
  data() {
    return {
      hospital: [],
      value: "",
      hospitalId: "",
      buildingName: "",
      locationName: "",
      buildingList: null,
      equipLoactionList: null,
      id: "",
      dialogBoxVisible: false,
      dialogLocationVisible: false,
      listLoading: true,
      listLoading2: true,
      isEdit: false,
      multipleSelection: [],
      multipleSelection2: [],
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
      this.listLoading2 = true;
      this.queryParams.data.hospitalId = this.hospitalId;
      fetchBuildingList(this.queryParams).then(response => {
        this.listLoading = false;
        this.buildingList = response.data;
      });
      fetchEquipLoactionList(this.queryParams).then(response => {
        this.listLoading2 = false;
        this.equipLoactionList = response.data;
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange2(val) {
      this.multipleSelection2 = val;
    },
    handleUpdate() {
      if (this.isEdit) {
        let update = {};
        update.hospitalId = this.hospitalId;
        update.id = this.id;
        update.buildingName = this.buildingName;
        updateBuilding(update).then(response => {
          this.getList();
          this.$message({
            message: "编辑成功",
            type: "success",
            duration: 1000
          });
        });
      } else {
        if (this.hospitalId === "" || null === this.hospitalId) {
          this.$message({
            message: "请选择医院",
            type: "error",
            duration: 1000
          });
        } else {
          let add = {};
          add.hospitalId = this.hospitalId;
          add.buildingName = this.buildingName;
          addBuilding(add).then(response => {
            this.getList();
            this.$message({
              message: "新增成功",
              type: "success",
              duration: 1000
            });
          });
        }
      }
      this.buildingName = "";
    },
    handleLocationUpdate() {
      if (this.isEdit) {
        let update = {};
        update.hospitalId = this.hospitalId;
        update.id = this.id;
        update.locationName = this.locationName;
        updateLocation(update).then(response => {
          this.getList();
          this.$message({
            message: "编辑成功",
            type: "success",
            duration: 1000
          });
        });
      } else {
        if (this.hospitalId === "" || null === this.hospitalId) {
          this.$message({
            message: "请选择医院",
            type: "error",
            duration: 1000
          });
        } else {
          let add = {};
          add.hospitalId = this.hospitalId;
          add.locationName = this.locationName;
          addLocation(add).then(response => {
            this.getList();
            this.$message({
              message: "新增成功",
              type: "success",
              duration: 1000
            });
          });
        }
      }
      this.locationName = "";
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

    handleLocationDeleteById(row) {
      this.$confirm("是否要删除所选项", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteLocationById(row.id).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleLocationBatchDelete() {
      let ids = [];
      this.$confirm("是否要删除所选项", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        for (let item of this.multipleSelection2) {
          ids.push(item.id);
        }
        deleteLocationByIds(ids).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    }
  }
};
</script>

<style scoped>
.divCard {
  width: 45%;
  float: left;
  padding-left: 3%;
  padding-top: 10px;
  padding-bottom: 5%;
  height: 770px;
}
</style>
