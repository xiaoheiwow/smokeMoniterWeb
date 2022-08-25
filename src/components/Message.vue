<template>
  <div>
    <el-card class="form-container" shadow="never">
      <span style="float:left;margin-top:-10px;font-weight:bold">通知中心</span>
    </el-card>
    <el-card style="height:780px">
      <div style="width:100%">
        <span style="float:left;font-weight:bold">最近收到的通知</span>
        <br />
        <span style="float:left;padding-top:20px">通知中心</span>
      </div>
      <br />
      <div
        style="width:20%;padding-top:30px"
        v-for="(item, key, i) of list"
        :key="i"
      >
        <el-card class="box-card">
          <div style="width:100%">
            <div style="width:30%;font-size:30px;float:left">
              <i class="el-icon-bell" style="float:left"> </i>
            </div>
            <div style="width:100%">
              <span style="float:left;margin-top:-10px"
                >{{ item.pusherName }} 提交警报 {{ item.createTime }}</span
              >
              <span style="float:left;margin-top:10px;color:#ff0000">{{ item.alarmType }}</span>
             <el-button
              style="float:right"
              type="text"
              size="medium"
              @click="goDetail(item)"
              >查看</el-button
            >
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchRecord ,queryOrderById} from "@/api/order";
export default {
  list: [],
  name: "message",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.handleRecord();
  },
  // mounted() {
  //   this.nowTimes();
  // },
  // beforeDestroy() {
  //   this.clear();
  // },
  methods: {
    handleRecord() {
      let id = this.$store.state.user.userId;
      fetchRecord(id).then(response => {
        let str = '';
        let time = '';
        response.data.forEach(element => {
          str = element.createTime.toString();
          time = str.substring(10,str.length);
          element.createTime = time;
          this.list.push(element);
        });
      });
    },
    goDetail(item){
      let id = item.orderId;
      queryOrderById(id).then(response =>{
      console.log(response.data)
      this.$router.push({
        name: "orderDetail",
        path: "/orderHandler/orderDetail",
        params: {orderDetail: response.data }
      });
      })
    }
  }
};
</script>

<style>
.box-card {
  height: 70px;
  margin-left: 10px;
  margin-bottom: -10px;
  background: white;
  border-radius: 10px;
}
</style>
