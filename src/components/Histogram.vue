<template>
<div id="main" style="width: 1500px; height: 400px;padding-top:60px"></div>
</template>
<script>
export default {

  data() {
    return {

    }
  },
  mounted() {
    this.drawChart();
  },
  methods:{
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      let option = {
        title: {
        },
        tooltip: {},
        legend: {
          data: ["报警数量","报警时间"],
        },
        xAxis: {
          data: ["0","1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12","13", "14", "15", "16", "17", "18","19", "20", "21", "22", "23"],
        },
        yAxis: {},
        series: [
          {
            name: "报警数量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20,5, 20, 38, 10, 10, 20,5, 20, 15, 10, 10, 20,5, 20, 36, 10, 10, 20],
          },
          {
            name: "报警时间",
            type: "bar",
            data: [0, 0, 1, 0, 0, 0,5, 3, 0, 4, 10, 0,5, 0, 0, 11, 6, 7,5, 8, 14, 13, 3, 2],
          },
        ],
      };
      myChart.setOption(option);
    },

  }
  }
</script>

<style scoped></style>
