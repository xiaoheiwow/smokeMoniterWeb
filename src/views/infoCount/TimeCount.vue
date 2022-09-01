<template>
  <div>
    <el-card class="form-container" shadow="never">
      <span style="float:left;margin-top:-10px;font-weight:bold"
        >报警时间统计</span
      >
      <el-button
        style="float:right;color:black;margin-top:-15px"
        type="text"
        size="medium"
        @click="back()"
      >
        返回
      </el-button>
    </el-card>

    <el-card style="height:270px">
      <div style="width:100%;height:100%">
        <div style="width:50%;float:left;height:250px">
          <span class="spanTitle">日报警统计</span>
          <br />
          <div class="div1">
            <el-card class="box-card">
              <span class="box-topSpan">报警数量(条)</span>
              <br />
              <span class="box-bottomSpan">300</span>
              <br />
              <br />
              <span style="float:left;"
                >日环比<i style="color:red" class="el-icon-top-right"
                  >+0%</i
                ></span
              >
            </el-card>
          </div>
          <div class="div2">
            <el-card class="box-card">
              <span class="box-topSpan">报警处理时间(分钟)</span>
              <br />
              <span class="box-bottomSpan">1000</span>
              <br />
              <br />
              <span style="float:left"
                >日环比<i style="color:red" class="el-icon-top-right"
                  >+5%</i
                ></span
              >
            </el-card>
          </div>
          <div class="div3">
            <el-card class="box-card">
              <span class="box-topSpan">平均处理时间(分钟)</span>
              <br />
              <span class="box-bottomSpan">2</span>
              <br />
              <br />
              <span style="float:left;"
                >日环比<i style="color:red" class="el-icon-top-right"
                  >+20%</i
                ></span
              >
            </el-card>
          </div>
        </div>

        <div style="width:50%;float:right;height:250px">
          <span class="spanTitle">周报警统计</span>
          <br />
          <div class="div1">
            <el-card class="box-card">
              <span class="box-topSpan">报警数量(条)</span>
              <br />
              <span class="box-bottomSpan">54</span>
              <br />
              <br />
              <span style="float:left;"
                >日环比<i style="color:red" class="el-icon-top-right"
                  >+0%</i
                ></span
              >
            </el-card>
          </div>
          <div class="div2">
            <el-card class="box-card">
              <span class="box-topSpan">报警处理时间(分钟)</span>
              <br />
              <span class="box-bottomSpan">5412</span>
              <br />
              <br />
              <span style="float:left"
                >日环比<i style="color:red" class="el-icon-top-right"
                  >+5%</i
                ></span
              >
            </el-card>
          </div>
          <div class="div3">
            <el-card class="box-card">
              <span class="box-topSpan">平均处理时间(分钟)</span>
              <br />
              <span class="box-bottomSpan">1.5</span>
              <br />
              <br />
              <span style="float:left;"
                >日环比<i style="color:green" class="el-icon-bottom-right"
                  >+20%</i
                ></span
              >
            </el-card>
          </div>
        </div>
      </div>
    </el-card>

    <el-card style="height:500px">
      <div>
        <span style="float:left;font-weight:bold">实时数据统计</span>
        <histogram></histogram>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchRecord, queryOrderById } from "@/api/order";
import Histogram from "../../components/Histogram.vue";
export default {
  name: "timeCount",
  components: {
    Histogram
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.handleRecord();
  },
  methods: {
    handleRecord() {
      let id = this.$store.state.user.userId;
      fetchRecord(id).then(response => {
        let str = "";
        let time = "";
        response.data.forEach(element => {
          str = element.createTime.toString();
          time = str.substring(10, str.length);
          element.createTime = time;
          this.list.push(element);
        });
      });
    },
    goDetail(item) {
      let id = item.orderId;
      queryOrderById(id).then(response => {
        this.$router.push({
          name: "orderDetail",
          path: "/orderHandler/orderDetail",
          params: { orderDetail: response.data }
        });
      });
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 130px;
  background: white;
}
.spanTitle {
  float: left;
  background: blue;
  color: white;
  width: 100px;
  border-radius: 0 45px 45px 0;
}

.box-topSpan {
  font-size: 10px;
  float: left;
  color: #85899f;
}
.box-bottomSpan {
  float: left;
  margin-bottom: -10px;
  font-size: 20px;
}
.div1 {
  float: left;
  width: 25%;
  padding-top: 30px;
  padding-right: 30px;
}
.div2 {
  float: left;
  width: 25%;
  padding-top: 30px;
  padding-right: 30px;
}
.div3 {
  float: left;
  width: 25%;
  padding-top: 30px;
  padding-right: 30px;
}
</style>
