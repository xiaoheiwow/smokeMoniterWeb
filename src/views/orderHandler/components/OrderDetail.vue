<template>
  <div>
    <el-card style="margin-top:20px">
      <span style="float:left;margin-top:-10px;font-weight:bold">工单详情</span>
      <el-button   
        style="float:right;color:black;margin-top:-15px"
        type="text"
        size="medium"
        @click="back()">
        返回
      </el-button>
    </el-card>
    <div style="width:100%">
      <div style="width:49%;float:left;">
        <el-card style="height: 100%;height:250px">
          <div style="width:30%;float:left;height:250">
            <!-- 左上角card -->
            <el-card class="box-card">
              <span class="box-topSpan">所属医院</span>
              <span class="box-bottomSpan">{{ hospitalName }}</span>
            </el-card>
            <el-card class="box-card">
              <span class="box-topSpan">所在位置</span>
              <span class="box-bottomSpan">{{ location }}</span>
            </el-card>
            <el-card class="box-card">
              <span class="box-topSpan">报警类别</span>
              <span class="box-bottomSpan">{{ order.alarmType }}</span>
            </el-card>
          </div>
          <div style="width:60%;float:right;height:250">
            <div style="width:100%">
              <span style="float:left;padding-top:5px">{{
                order.orderNumber
              }}</span>
              <span style="float:right">
                <el-tag v-show="order.situation == 0" type="danger"
                  >待处理</el-tag
                >
                <el-tag v-show="order.situation == 1">处理中</el-tag>
                <el-tag v-show="order.situation == 2" type="success"
                  >已处理</el-tag
                >
              </span>
            </div>
            <div style="margin-top:45px;width:100%">
              <el-divider></el-divider>
            </div>
            <div style="width:100%">
              <span style="float:left">提交人:{{ order.pusherName }}</span>
              <br />
              <span style="padding-top:10px;float:left">补充说明:</span>
            </div>
            <div style="width:100%;float:left;padding-top:30px">
              <span style="float:left">优先级别:</span>
              <br />
              <el-image
                :src="require('@/assets/priority.png')"
                style="width:70%;float:left;padding-top:3px"
              >
              </el-image>
              <span style="float:left;padding-left:10px;color:#ff0099">{{
                order.priority
              }}</span>
            </div>
          </div>
        </el-card>

        <!-- 左下角card -->
        <el-card style="height:500px">
          <div style="width:30%;float:left;height:250">
            <el-card class="box-card">
              <span class="box-topSpan">报警时间</span>
              <span class="box-bottomSpan">{{ order.createTime }}</span>
            </el-card>
            <el-card class="box-card">
              <span class="box-topSpan">处理人</span>
              <span class="box-bottomSpan">{{ order.handlerName }}</span>
            </el-card>
            <el-card class="box-card">
              <span class="box-topSpan">联系方式</span>
              <span class="box-bottomSpan">{{ order.handlerPhone }}</span>
            </el-card>
          </div>
          <div style="width:70%;float:right;height:250">
            <span style="float:left;padding-left:50px;margin-left:100px"
              >处理进度:</span
            >
            <el-progress
              type="circle"
              :percentage="orderProgress"
              :width="240"
            ></el-progress>
          </div>

          <!-- 图片 -->
          <div style="height:250">
            <div style="width:49%;float:left;height:250">
              <el-image
                :src="require('@/assets/smoke.png')"
                fit
                style="height:220px"
              ></el-image>
            </div>
            <div style="width:49%;float:right;height:250">
              <el-image
                :src="require('@/assets/smoke2.png')"
                fit
                style="height:220px"
              ></el-image>
            </div>
          </div>
        </el-card>
      </div>

      <div style="width:49%;float:right;">
        <!-- 右侧card -->
        <el-card style="height: 100%;height:767px">
          <div style="width:100%;height:200px">
            <span style="float:left;font-weight:bold;">实时监控视频:</span>
            <br />
            <span style="float:left;padding-top:20px">{{ nowTime }}</span>
          </div>

          <div >
            <el-image
                :src="require('@/assets/video.png')"
                fit
                style="height:400px"
            ></el-image>           
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchName } from "@/api/hospital";
export default {
  name: "orderDetail",
  data() {
    return {
      nowTime: "",
      orderProgress: "",
      hospitalName: "",
      location: "",
      order: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.order = this.$route.params.orderDetail;
      this.handleProgress();
      fetchName().then(response => {
        response.data.forEach(element => {
          if (this.order.hospitalId === element.id) {
            this.hospitalName = element.hospitalName;
          }
        });
        let str = this.order.address;
        this.location = str.substring(this.hospitalName.length, str.length);
      });
    },

    handleProgress() {
      let param = this.order.orderProgress;
      this.orderProgress = parseInt(param.substring(0, param.length - 1), 10);
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      this.nowTime =
        year + "-" + month + "-" + date + "-" + " " + hh + ":" + mm + ":" + ss;
    }, // 实时刷新当前时间，格式化
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
  }
};
</script>
<style scoped>
.box-card {
  height: 50px;
  margin-left: 10px;
  margin-bottom:17px;
  padding-top: 10px;
  background: #c7dff3;
  border-radius: 10px;
}
.box-topSpan {
  font-size: 10px;
  float: left;
  margin-top: -25px;
  color: #85899f;
}
.box-bottomSpan {
  float: left;
  margin-bottom: 50px;
  padding-bottom: 50px;
}
</style>
