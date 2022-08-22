<template>
  <el-card class="form-container" shadow="never" style="height:770px">
    <div>
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
            <el-form-item label="所属医院">
              <el-input
                disabled
                v-model="equipment.hospitalName"
                placeholder="请输入所属医院"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在楼宇">
              <el-input
                v-model="equipment.building"
                placeholder="请输入所在楼宇"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="设备点位">
              <el-input
                v-model="equipment.equipLocation"
                placeholder="请输入设备点位"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账号">
              <el-input
                v-model="equipment.userName"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="密码">
              <el-input
                v-model="equipment.password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="访问地址">
              <el-input
                v-model="equipment.ipLocation"
                placeholder="请输入访问地址"
              ></el-input>
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
    </div>
  </el-card>
</template>
<script>
import { modifyFillById } from "@/api/equipment";
const defaultEquipment = {
  id:"",
  equipName: "",
  hospitalName: "",
  building: "",
  equipLocation: "",
  ipLocation: "",
  equipStatus: 0,
  password: "",
  userName: ""
};
export default {
  data() {
    return {
      hidden: true,
      equipment: Object.assign({}, defaultEquipment),
      list: null,
      listLoading: true
    };
  },
  created() {
    this.handleList();
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
      console.log(this.equipment)
      this.$confirm("是否要保存信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        modifyFillById(this.equipment).then(response => {
          this.$message({
            message: "更新成功",
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
