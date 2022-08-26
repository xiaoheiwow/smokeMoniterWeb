<template>
<div>
<el-breadcrumb style="margin-top:-5px">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>编辑</el-breadcrumb-item>
</el-breadcrumb>  
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
            <el-form-item label="用户名:">
              <el-input
                v-model="user.realName"
                placeholder="请输入用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式:">
              <el-input
                v-model="user.phone"
                placeholder="请输入联系方式"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="ID:">
              <el-input
                v-model="user.account"
                placeholder="请输入ID"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="密码:">
              <el-input
                v-model="user.realPass"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属角色:">
              <el-select
                style="width:200px"
                v-model="user.roleName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :value="item.roleName"
                  :label="item.roleName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号:">
              <el-input
                v-model="user.identificationNumber"
                placeholder="请输入身份证号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所属医院:" v-show="!isEdit">
              <el-select
                style="width:200px"
                v-model="user.hospitalId"
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
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否禁用" v-show="isEdit">
              <el-switch
                v-model="user.isEnable"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
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
</div>
</template>
<script>
import { modifyFillById ,insertFill} from "@/api/user";
import { fetchName } from "@/api/hospital";
import { fetchRoleName } from "@/api/role";
export default {
  data() {
    return {
      isEdit: true,
      hospital: [],
      roles: [],
      user: {
      },
      listLoading: true
    };
  },
  created() {
    this.initList();
  },
  methods: {
    initList() {
      if (this.$route.params.userDetail != null) {
        this.user = this.$route.params.userDetail;
      }
      fetchName().then(response => {
        response.data.forEach(element => {
          this.hospital.push(element);
        });
      });
      fetchRoleName().then(response => {
        response.data.forEach(element => {
          this.roles.push(element);
        });
      });
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
          modifyFillById(this.user).then(response => {
            this.$message({
              message: "更新成功",
              type: "success",
              duration: 1000
            });
          });
        } else {
          insertFill(this.user).then(response => {
            this.$message({
              message: "更新成功",
              type: "success",
              duration: 1000
            });
          });
        }
        this.$router.push({path:"/user"});
      });
    }
  }
};
</script>

<style></style>
