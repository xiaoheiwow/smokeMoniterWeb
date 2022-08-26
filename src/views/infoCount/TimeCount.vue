<template>
  <div>
    <el-card class="form-container" shadow="never">
      <span style="float:left;margin-top:-10px;font-weight:bold">报警时间统计</span>
      <el-button   
        style="float:right;color:black;margin-top:-15px"
        type="text"
        size="medium"
        @click="back()">
        返回
      </el-button>
    </el-card>
    <el-card style="height:270px">
      <div style="width:100%">

      </div>
    </el-card>
    <el-card style="height:500px">
      <div>
        <span style="float:left;font-weight:bold">实时数据统计</span>

      </div>

    </el-card>
  </div>
</template>

<script>
import { fetchRecord ,queryOrderById} from "@/api/order";
export default {
  list: [],
  name: "timeCount",
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

<style>
.box-card {
  height: 70px;
  margin-left: 10px;
  margin-bottom: -10px;
  background: white;
  border-radius: 10px;
}
</style>
