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
            <el-form-item label="姓名:">
              <el-input
                v-model="inspector.realName"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="巡查范围:">
              <el-input
                v-model="inspector.scope"
                placeholder="请输入巡查范围"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职务:">
              <el-input
                v-model="inspector.postName"
                placeholder="请输入职务"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="联系方式:">
              <el-input
                v-model="inspector.phone"
                placeholder="请输入联系方式"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="ID:">
              <el-input
                v-model="inspector.account"
                placeholder="请输入ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="巡查时间:">
              <el-input
                v-model="inspector.costTime"
                placeholder="请输入巡查时间"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="拉黑时间:" v-show="inspector.isBanned == '1'">
              <el-date-picker
                style="width:200px"
                v-model="inspector.bannedTime"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
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
import { modifyFillById, insertFill } from "@/api/inspector";
export default {
  data() {
    return {
      isEdit: true,
      inspector: {},
      listLoading: true
    };
  },
  created() {
    this.initList();
  },
  methods: {
    initList() {
      if (this.$route.params.inspectorDetail != null) {
        this.inspector = this.$route.params.inspectorDetail;
      }
      this.isEdit = this.$route.params.isEdit;
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
        if (this.isEdit) {
          modifyFillById(this.inspector).then(response => {
            this.$message({
              message: "更新成功",
              type: "success",
              duration: 1000
            });
            this.$router.go(-1);
          });
        } else {
          insertFill(this.inspector).then(response => {
            let detail = {
              id:response.data,
              realName:this.inspector.realName,
              phone:this.inspector.phone,
              account:this.inspector.account
            }
            this.$router.push({
              name: "updateUser",
              path: "/user/updateUser",
              params: { isEdit: false, userDetail: detail }
            });
            this.$alert("请完善用户信息", "提示", {
              confirmButtonText: "确定",
            });
          });
        }
      });
    }
  }
};
</script>

<style></style>
