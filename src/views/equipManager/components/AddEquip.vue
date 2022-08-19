<template>
  <el-card class="form-container" shadow="never">
    <el-form
      :inline="true"
      size="medium"
      label-width="140px"
      style="float: left;padding-top:30px"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="摄像机编号:">
            <el-input
              v-model="equipment.equipName"
              placeholder="请输入摄像机编号"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="所在楼宇:">
            <el-input
              v-model="equipment.building"
              placeholder="请输入所在楼宇"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备点位:">
            <el-input
              v-model="equipment.equipLocation"
              placeholder="请输入设备点位"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="账号:">
            <el-input
              v-model="equipment.userName"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码:">
            <el-input
              v-model="equipment.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="访问地址:">
            <el-input
              v-model="equipment.ipLocation"
              placeholder="请输入访问地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属医院:">
            <el-select
              v-model="equipment.hospitalId"
              style="width: 200px;"
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
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="在线状态:">
            <el-select
              v-model="equipment.equipStatus"
              style="width: 200px;padding-left:-20px"
              placeholder="请选择"
            >
              <el-option value="1" label="在线" key="1"></el-option>
              <el-option value="0" label="离线" key="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="padding-top:250px;padding-right:200px">
      <el-button type="primary" size="medium" plain @click="back()"
        >返回</el-button
      >
      <span>/</span>
      <el-button type="primary" size="medium" @click="handleUpdate()"
        >保存</el-button
      >
    </div>
  </el-card>
</template>
<script>
import { fetchName } from "@/api/hospital";
import { insertFill } from "@/api/equipment";
const defaultEquipment = {
  equipName: "",
  hospitalName: "",
  building: "",
  equipLocation: "",
  ipLocation: "",
  equipStatus: "",
  password: "",
  userName: ""
};
export default {
  data() {
    return {
      hospital: [],
      hidden: true,
      equipment: Object.assign({}, defaultEquipment),
      list: null,
      listLoading: true
    };
  },
  created() {
    this.handleList();
    fetchName().then(response => {
      this.hospital = response.data;
    });
  },
  methods: {
    handleList() {
      if (this.$route.params.equipmentDetail != null) {
        this.equipment = this.$route.params.equipmentDetail;
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
        insertFill(this.equipment).then(response => {
          this.$message({
            message: "新增成功",
            type: "success",
            duration: 1000
          });
          this.$router.go(-1);
        });
      });
    }
  }
};
</script>

<style></style>
