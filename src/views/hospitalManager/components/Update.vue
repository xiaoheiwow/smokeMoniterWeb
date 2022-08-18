<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :inline="true"
      size="medium"
      label-width="140px"
      style="float: left;padding-top:30px"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item label="医院名称:">
            <el-input
              v-model="detail.hospitalName"
              placeholder="请输入医院名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="医院等级">
            <el-input
              v-model="detail.hospitalLevel"
              placeholder="请输入医院等级"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="医院类别">
            <el-input
              v-model="detail.hospitalType"
              placeholder="请输入医院类别"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属区域">
            <el-input
              v-model="detail.hospitalRegion"
              placeholder="请输入所在位置"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="所在位置">
            <el-input
              v-model="detail.hospitalLocation"
              placeholder="请输入所在位置"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="设备数量">
            <el-input
              v-model="detail.equipmentQuantity"
              placeholder="请输入设备数量"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div></div>

    <div>
      <vxe-table
        :data="list"
        tooltip-effect="dark"
        ref="xTable"
        style="margin-top:230px"
        :header-cell-style="{ background: '#8fbcf5', color: '#606266' }"
        v-loading="listLoading"
        :edit-config="{ trigger: 'click', mode: 'cell', showIcon: false }"
      >
        <vxe-column field="id" title="序号">
          <template #edit="{ row }">
            <vxe-input v-model="row.id" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="equipName" title="设备名称" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.equipName" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="building" title="所在楼宇" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.building" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column field="equipLocation" title="设备点位" :edit-render="{}">
          <template #edit="{ row }">
            <vxe-input v-model="row.equipLocation" type="text"></vxe-input>
          </template>
        </vxe-column>
        <vxe-column title="操作">
          <template slot-scope="scope">
            <vxe-button
              style="color:red"
              icon="el-icon-minus"
              @click="removeEvent(scope.row)"
            ></vxe-button>
            <vxe-button icon="el-icon-plus" @click="insertEvent(-1)"></vxe-button>
          </template>
        </vxe-column>
      </vxe-table>
      <div style="padding-top:30px">
        <el-button type="primary" size="medium" plain @click="back()"
          >返回</el-button
        >
        <span>/</span>
        <el-button type="primary" size="medium" @click="handleUpdate()"
          >保存</el-button
        >
      </div>
    </div>
  </el-card>
</template>
<script>
import VXETable from "vxe-table";
import { fetchListByHospitalId,batchUpdate} from "@/api/equipment";
import { modifyFillById } from "@/api/hospital";
const defaultDetail = {
  equipmentQuantity: "",
  hospitalLevel: "",
  hospitalLocation: "",
  hospitalName: "",
  hospitalRegion: "",
  hospitalType: "",
  id: ""
};
export default {
  data() {
    return {
      equipList:[],
      detail: Object.assign({}, defaultDetail),
      list: null,
      listLoading: true
    };
  },
  created() {
    this.handleList();
  },
  methods: {
    handleList() {
      if (this.$route.params.hospitalDetail != null) {
        this.detail = this.$route.params.hospitalDetail;
        fetchListByHospitalId(this.detail.id).then(response => {
          this.listLoading = false;
          this.list = response.data;
        });
      }
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    handleUpdate() {
      this.$confirm("是否要保存信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        modifyFillById(this.detail);
        batchUpdate(this.list).then(response => {
          this.$message({
            message: "更新成功",
            type: "success",
            duration: 1000
          });
          this.$router.go(-1);
        });
      });
    },
    async insertEvent(row) {
      const $table = this.$refs.xTable;
      const record = {
        equipName: ""
      };
      const { row: newRow } = await $table.insertAt(record, row);
      await $table.setActiveCell(newRow, "equipName");
    },
    async removeEvent(row) {
      const type = await VXETable.modal.confirm("您确定要删除该数据?");
      const $table = this.$refs.xTable;
      if (type === "confirm") {
        $table.remove(row);
      }
    }
  }
};
</script>

<style>
.box {
  width: 100%;
  margin-bottom: 40px;
}
.box span {
  width: 25%;
  float: left;
  text-align: left;
}
</style>
