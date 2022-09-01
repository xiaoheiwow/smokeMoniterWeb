<template>
    <div id="content">
        <dv-full-screen-container class="demo1" style="height: 880px; width: 1558px; margin-left: 0px;">
            <dv-border-box-11 title="云端展示" class="demo2">
                <dv-loading v-if="loading===true ? true:false">Loading...</dv-loading>
                <div v-if="loading === false ? true : false">
 
                    <dv-decoration-1 class="dv-decoration-1" style="width:300px;height:80px;" />
                    <dv-decoration-2 class="dv-decoration-2" :reverse="true" style="width:3px;height:680px;" />
                    <dv-decoration-2 class="dv-decoration-2-reverse" :reverse="true" style="width:5px;height:680px;" />
                    <dv-decoration-5 class="dv-decoration-5" :dur="6" style="width:300px;height:40px;" />"
                    <dv-decoration-6 class="dv-decoration-6" style="width:300px;height:30px;" />
                    <dv-decoration-9 class="dv-decoration-9 " style="width:200px;height:200px;">
                        50%
                    </dv-decoration-9>
                    <dv-decoration-8 class="dv-decoration-8" style="width:300px;height:50px;" />
                    <dv-decoration-8 class="dv-decoration-8-reverse" :reverse="true" style="width:300px;height:50px;" />
                    <dv-decoration-10 class="dv-decoration-10" style="width:96%;height:5px;" />
                    <dv-decoration-11 class="dv-decoration-11" style="width:200px;height:60px; color: #fff;">医院数据大屏
                    </dv-decoration-11>
                    <dv-decoration-12 class="dv-decoration-12" style="width:130px;height:130px;" />
                    <dv-active-ring-chart class="dv-active-ring-chart" :config="config"
                        style="width:210px;height:210px" />
                    <dv-capsule-chart class="dv-capsule-chart" :config="config" style="width:400px;height:300px" />
                    <dv-conical-column-chart class="dv-conical-column-chart" :config="config5"
                        style="width:400px;height:200px;" />
                    <dv-water-level-pond class="dv-water-level-pond" :config="config4"
                        style="width:150px;height:200px" />
                    <dv-scroll-board class="dv-scroll-board" :config="config1" style="width:450px;height:250px" />
                    <dv-scroll-ranking-board class="dv-scroll-ranking-board" :config="config"
                        style="width:450px;height:300px" />
                    <dv-percent-pond class="dv-percent-pond" :config="config2" style="width:200px;height:100px;" />
                    <div style="float:right;padding-right:30px;padding-top:30px">
                      <el-button style="color:white" type="text" @click="goHome()">
                      返回主页
                      </el-button>
                      </div>
                </div>
            </dv-border-box-11>
        </dv-full-screen-container>
    </div>
</template>
 
<script>
import Charts from '@jiaminghi/charts'
export default {
    name: 'home',
    data() {
        return {
            loading: true,
            config: {
                radius: '80%',
                activeRadius: '90%',
                data: [
                    {
                        name: '南京市中心医院',
                        value: 120
                    },
                    {
                        name: '南京市中心医院2',
                        value: 45
                    },
                    {
                        name: '江苏省人民医院',
                        value: 78
                    },
                    {
                        name: '江苏省人民医院2',
                        value: 66
                    },
                    {
                        name: '南京市中心医院3',
                        value: 80
                    }
                ],
                digitalFlopStyle: {
                    fontSize: 20
                },
                showOriginValue: true,
                colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                unit: '报警次数',
                showValue: true
            },
            config5: {
                radius: '80%',
                activeRadius: '90%',
                data: [
                    {
                        name: '玄武区',
                        value: 13
                    },
                    {
                        name: '鼓楼区',
                        value: 27
                    },
                    {
                        name: '江宁区',
                        value: 30
                    },
                    {
                        name: '建邺区',
                        value: 15
                    },
                    {
                        name: '雨花台区',
                        value: 15
                    }
                ],
                digitalFlopStyle: {
                    fontSize: 20
                },
                showOriginValue: true,
                colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
                showValue: true
            },

            config1: {
                header: ['一周报警次数','待处理', '处理中', '已处理'],
                data: [
                    ['3000', '1000', '700','1000'],
                    ['1616', '100', '600','1000'],
                    ['2600', '1300', '1300','0'],
                    ['3000', '1300', '1300','400'],
                    ['3000', '400', '1000','500'],
                    ['1800', '1000', '400','700'],
                    ['3000', '400', '800','1000'],
                    ['3000', '1300', '400','700'],
                    ['4000', '400', '2600','1200'],
                    ['3000', '1300', '400','1860']
                ],
                carousel: 'page',
                waitTime: 3000,
            },
            config2: {
                value: 66,
                borderWidth: 5,
                borderRadius: 10,
                borderGap: 5,
                lineDash: [10, 2],
                localGradient: true
            },
            config4: {
                data: [66, 45],
                shape: 'roundRect'
            }
 
        }
    },
    methods: {
        goHome(){
          this.$router.push({path:"/hospital"})
        },
        showview() {
            setTimeout(this.setloading, 3000)
        },
        setloading(){
            this.loading=false
        },
        data() {
            const option1 = {
                title: {
                    text: '周销售额趋势'
                },
                xAxis: {
                    name: '第一周',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    name: '销售额',
                    data: 'value'
                },
                series: [
                    {
                        data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
                        type: 'line'
                    }
                ]
            }
 
            const option2 = {
                title: {
                    text: '周销售额趋势'
                },
                xAxis: {
                    name: '第二周',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    name: '销售额',
                    data: 'value'
                },
                series: [
                    {
                        data: [2339, 1899, 2118, 1790, 3265, 4465, 3996],
                        type: 'line'
                    }
                ]
            }
            const container = document.getElementById('container')
 
            const myChart = new Charts(container)
 
            myChart.setOption({
                title: 'My Chart',
                option1,
                option2
 
            })
        }
    },
    mounted() {
        this.showview()
    }
 
}
 
 
</script>
 
<style lang="less" scoped>
.demo1 {
    color: rgb(18, 128, 77);
    font-size: 30px;
    font-weight: 1000;
    padding: 0;
    background-color: rgb(14, 14, 14);
    width: 100%;
    height: 100%;
 
}
 
.demo2 {
    display: flex;
    position: absolute;
    background-image: url('../../assets/bg3.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    -moz-background-size: 100% 100%;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
 
    .dv-decoration-1 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 40%;
        top: 60%;
    }
 
    .dv-decoration-2 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 33%;
        top: 10%;
    }
    .dv-decoration-2-reverse{
         position: absolute;
        padding: 0;
        margin: 1px;
        left: 66%;
        top: 10%;
    }
    .dv-decoration-5 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 40.3%;
        top: 6%;
    }
 
    .dv-decoration-6 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 40.3%;
        top: 45%;
    }
 
    .dv-decoration-9 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 5%;
        top: 6%;
    }
 
    .dv-decoration-8 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 1%;
        top: 90%;
    }
 
    .dv-decoration-8-reverse {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 79.5%;
        top: 90%;
    }
 
    .dv-decoration-10 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 2%;
        top: 96%;
    }
 
    .dv-decoration-11 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 43%;
        top: 50%;
    }
 
    .dv-decoration-12 {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 85%;
        top: 7%;
    }
 
    .dv-active-ring-chart {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 4%;
        top: 31%;
    }
 
    .dv-capsule-chart {
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 5%;
        top: 57%;
    }
 
    .dv-conical-column-chart {
        font-size: 20px !important;
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 36%;
        top: 65%;
    }
 
    .dv-scroll-board {
        font-size: 20px !important;
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 69%;
        top: 23%;
        opacity: 0.8;
    }
 
    .dv-scroll-ranking-board {
        font-size: 20px !important;
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 69%;
        top: 55%;
        opacity: 0.8;
    }
 
    .dv-percent-pond {
        font-size: 20px !important;
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 69%;
        top: 9%;
        opacity: 0.8;
    }
 
    .dv-water-level-pond {
        font-size: 20px !important;
        position: absolute;
        padding: 0;
        margin: 1px;
        left: 20%;
        top: 31%;
        opacity: 0.8;
    }
}
</style>