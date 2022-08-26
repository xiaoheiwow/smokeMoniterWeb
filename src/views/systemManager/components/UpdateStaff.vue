<template>
<div>
  <el-breadcrumb style="margin-top:-5px">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/hospitalStaff' }">医务人员管理</el-breadcrumb-item>
  <el-breadcrumb-item>编辑</el-breadcrumb-item>
</el-breadcrumb>  
 <el-card class="form-container" shadow="never" style="height:770px">
    <div>
      <el-form
        :inline="true"
        size="medium"
        label-width="100px"
        style="padding-top:30px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="人员姓名:">
              <el-input
                v-model="staff.realName"
                placeholder="请输入姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属医院:">
              <el-select
                style="width:200px"
                v-model="staff.hospitalId"
                placeholder="请选择"
                @change="handleDataList()"
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
          <el-col :span="6">
            <el-form-item label="所属部门:">
              <el-select
                style="width:200px"
                v-model="deptName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in department"
                  :key="item.id"
                  :value="item.deptName"
                  :label="item.deptName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属科室:">
              <el-select
                style="width:200px"
                v-model="officeName"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in office"
                  :key="item.id"
                  :value="item.officeName"
                  :label="item.officeName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="职务:">
              <el-input
                v-model="staff.postName"
                placeholder="请输入联系方式"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色类型:">
              <el-select
                style="width:200px"
                v-model="staff.roleName"
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
          <el-col :span="6">
            <el-form-item label="创建时间:">
              <el-date-picker
                style="width:200px"
                v-model="staff.createTime"
                value-format="yyyy-MM-dd HH:mm:ss"
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
</div>
 
</template>
<script>
import { updateStaff,insertFill} from "@/api/hospitalStaff";
import { fetchName } from "@/api/hospital";
import { fetchRoleName } from "@/api/role";
import { fetchDeptName } from "@/api/department";
import { fetchOfficeName } from "@/api/office";
export default {
  data() {
    return {
      deptName:'',
      officeName:'',
      isEdit: true,
      staff: {

      },
      roles: [],
      department: [],
      office: [],
      hospital: [],
      listLoading: true
    };
  },
  created() {
    this.initList();
  },
  methods: {
    initList() {
      if (this.$route.params.staffDetail != null) {
        this.staff = this.$route.params.staffDetail;
        this.deptName = this.staff.deptName;
        this.officeName = this.staff.officeName;
      }else{
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
      if (this.staff.hospitalId != undefined) {
        fetchDeptName(this.staff.hospitalId).then(response => {
          response.data.forEach(element => {
            this.department.push(element);
          });
        });
        fetchOfficeName(this.staff.hospitalId).then(response => {
          response.data.forEach(element => {
            this.office.push(element);
          });
        });
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
      this.staff.officeName = this.officeName;
      this.staff.deptName = this.deptName;
      this.department.forEach(element => {
        if (element.deptName === this.staff.deptName) {
          this.staff.deptId = element.id;
        }
      });
      this.office.forEach(element => {
        if (element.officeName === this.staff.officeName) {
          this.staff.officeId = element.id;
        }
      });
      this.roles.forEach(element => {
        if (element.roleName === this.staff.roleName) {
          this.staff.roleId = element.id;
        }
      });
      this.$confirm("是否要保存信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.isEdit) {
          updateStaff(this.staff).then(response => {
            this.$message({
              message: "更新成功",
              type: "success",
              duration: 1000
            });
            this.$router.go(-1);
          });
        } else {
          insertFill(this.staff).then(response => {
            let detail = {
              id: response.data,
              realName: this.staff.realName,
              roleName: this.staff.roleName,
              hospitalId: this.staff.hospitalId
            };
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
    },
    handleDataList() {
      (this.office = []), (this.department = []);
      fetchDeptName(this.staff.hospitalId).then(response => {
        response.data.forEach(element => {
          this.department.push(element);
        });
        this.deptName = "";
      });
      fetchOfficeName(this.staff.hospitalId).then(response => {
        response.data.forEach(element => {
          this.office.push(element);
        });
        this.officeName = "";
      });
    }
  }
};
</script>

<style></style>
