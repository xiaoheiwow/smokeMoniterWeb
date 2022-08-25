<template>
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
            <el-form-item label="工单编号:">
              <el-input
                disabled
                v-model="order.orderNumber"
                placeholder="请输入工单编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报警时间:">
              <el-date-picker
                disabled
                style="width:200px"
                v-model="order.createTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="提交人:">
              <el-input
                disabled
                v-model="order.handlerName"
                placeholder="请输入提交人"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系方式:">
               <el-input
                disabled
                v-model="order.handlerPhone"
                placeholder="请输入联系方式"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="报警类别:">
              <el-input
                v-model="order.alarmType"
                placeholder="请输入报警类别"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="优先级:">
              <el-input
                v-model="order.priority"
                placeholder="请输入优先级"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="处理情况:">
              <el-select
                style="width:200px"
                v-model="order.situation"
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
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工单进度:">
              <el-input
                v-model="order.orderProgress"
                placeholder="请输入姓名"
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
import { modifyFillById } from "@/api/order";
export default {
  data() {
    return {
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
      isEdit: true,
      order: {},
      listLoading: true
    };
  },
  created() {
    this.initList();
  },
  methods: {
    initList() {
      this.order = this.$route.params.orderDetail;
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
          modifyFillById(this.order).then(response => {
            this.$message({
              message: "更新成功",
              type: "success",
              duration: 1000
            });
            this.$router.go(-1);
          });
      });
    },
   

  }
};
</script>

<style></style>
