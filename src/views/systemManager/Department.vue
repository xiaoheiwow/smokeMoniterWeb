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
          <span style="float:left;font-size:20px;color:blue">部门</span>
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

          <!-- 部门更新对话框 -->
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
              <span>部门名称:</span>
              <el-input v-model="deptName"></el-input>
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button
                @click="
                  dialogBoxVisible = false;
                  deptName = '';
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
            :data="departmentList"
            tooltip-effect="dark"
            style="width: 100%;padding-top:30px"
            v-loading="listLoading"
            :header-cell-style="{ background: '#c8e0f5', color: '#606266' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="150px"> </el-table-column>
            <el-table-column label="部门名称">
              <template slot-scope="scope">{{
                scope.row.deptName
              }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="medium"
                  @click="
                    deptName = scope.row.deptName;
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
          <span style="float:left;font-size:20px;color:blue">科室</span>
          <el-button
            style="float:right;margin-left:20px"
            type="danger"
            size="medium"
            plain
            @click="handleOfficeBatchDelete()"
            >删除</el-button
          >
          <el-button style="float:right" type="primary" size="medium"
          @click="isEdit=false;dialogOfficeVisible=true"
            >新增</el-button
          >
        </div>

        <!-- 科室更新对话框 -->
        <el-dialog
          width="350px"
          style="float:left"
          :visible.sync="dialogOfficeVisible"
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
            <span>科室名称:</span>
            <el-input v-model="officeName"></el-input>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button
              @click="
                dialogOfficeVisible = false;
                officeName = '';
              "
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="
                dialogOfficeVisible = false;
                handleOfiiceUpdate();
              "
              >确 定</el-button
            >
          </div>
        </el-dialog>

        <div style="padding-top:20px">
          <el-table
            :data="officeList"
            tooltip-effect="dark"
            style="width: 100%;padding-top:30px"
            v-loading="listLoading2"
            :header-cell-style="{ background: '#c8e0f5', color: '#606266' }"
            @selection-change="handleSelectionChange2"
          >
            <el-table-column type="selection" width="150px"> </el-table-column>
            <el-table-column label="科室名称">
              <template slot-scope="scope">{{
                scope.row.officeName
              }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="medium"
                  @click="
                    officeName = scope.row.officeName;
                    id = scope.row.id;
                    isEdit = true;
                    dialogOfficeVisible = true;
                  "
                  >编辑</el-button
                >
                <span>/</span>
                <el-button style="color:red" type="text" size="medium" @click="handleOfficeDeleteById(scope.row)">
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
  fetchDepartmentList,
  addDepartment,
  updateDepartment,
  deleteById,
  deleteByIds
} from "@/api/department";
import {
  fetchOfficeList,
  deleteOfficeById,
  deleteOfficeByIds,
  addOffice,
  updateOffice
} from "@/api/office";
import { fetchName } from "@/api/hospital";
export default {
  name: "department",
  data() {
    return {
      hospital: [],
      value: "",
      hospitalId: "",
      deptName: "",
      officeName: "",
      departmentList: null,
      officeList: null,
      id: "",
      dialogBoxVisible: false,
      dialogOfficeVisible: false,
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
      fetchDepartmentList(this.queryParams).then(response => {
        this.listLoading = false;
        this.departmentList = response.data;
      });
      fetchOfficeList(this.queryParams).then(response => {
        this.listLoading2 = false;
        this.officeList = response.data;
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
        update.deptName = this.deptName;
        updateDepartment(update).then(response => {
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
          add.deptName = this.deptName;
          addDepartment(add).then(response => {
            this.getList();
            this.$message({
              message: "新增成功",
              type: "success",
              duration: 1000
            });
          });
        }
      }
      this.deptName = "";
    },
    handleOfiiceUpdate() {
      if (this.isEdit) {
        let update = {};
        update.hospitalId = this.hospitalId;
        update.id = this.id;
        update.officeName = this.officeName;
        updateOffice(update).then(response => {
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
          add.officeName = this.officeName;
          addOffice(add).then(response => {
            this.getList();
            this.$message({
              message: "新增成功",
              type: "success",
              duration: 1000
            });
          });
        }
      }
      this.officeName = "";
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

    handleOfficeDeleteById(row) {
      this.$confirm("是否要删除所选项", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteOfficeById(row.id).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleOfficeBatchDelete() {
      let ids = [];
      this.$confirm("是否要删除所选项", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        for (let item of this.multipleSelection2) {
          ids.push(item.id);
        }
        deleteOfficeByIds(ids).then(response => {
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
