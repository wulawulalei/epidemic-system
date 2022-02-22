<template>
  <div id="dashboard" class="body-common">
    <div class="village">
      <div class="item">
        <h5 class="title">hhhh</h5>
        <h3 class="number">789789</h3>
      </div>
      <div class="item">
        <h5 class="title">hhhh</h5>
        <h3 class="number">789789</h3>
      </div>
      <div class="item">
        <h5 class="title">hhhh</h5>
        <h3 class="number">789789</h3>
      </div>
      <div class="item">
        <h5 class="title">hhhh</h5>
        <h3 class="number">789789</h3>
      </div>
    </div>
    <div class="row">
      <div class="chart" ref="chart" style="width:calc(100% - 330px);height:430px"></div>
      <div class="performance"></div>
    </div>
  </div>
</template>
<script>
import Echarts from 'echarts'
import { epidemic } from '@/api/question'
export default {
  name: 'dashboard',
  data() {
    return {
      epidList: [
        {
          title: '境外输入',
          num: 0,
          added: 0,
          color: '#ffa352'
        },
        {
          title: '无症状感染者',
          num: 0,
          added: 0,
          color: '#791618'
        },
        {
          title: '现有确诊',
          num: 0,
          added: 0,
          color: '#e44a3d'
        },
        {
          title: '累计确诊',
          num: 0,
          added: 0,
          color: '#a31d13'
        },
        {
          title: '累计死亡',
          num: 0,
          added: 0,
          color: '#333'
        },
        {
          title: '累计治愈',
          num: 0,
          added: 0,
          color: '#34aa70'
        }
      ]
    }
  },
  mounted() {
    this.getEpidMessage()
  },
  computed: {
    options() {
      const xData = this.epidList.map(item => {
        return item.title
      })
      const yData1 = this.epidList.map(item => {
        return item.num
      })
      const yData2 = this.epidList.map(item => {
        return item.added
      })
      let option = {
        title: {
          text: '国内疫情数据',
          left: '0',
          textStyle: {
            color: '#333333',
            fontSize: 16
          }
        },
        xAxis: {
          position: 'bottom',
          offset: 0,
          name: '类型',
          //坐标轴
          axisLine: {
            show: false
          },
          data: xData
        },
        yAxis: {
          offset: 0,
          name: '人数',
          //坐标轴
          axisLine: {
            show: false
          },
          //坐标轴的刻度
          axisTick: {
            show: false
          }
        },
        //echarts的位置
        grid: {
          width: '85%',
          height: '80%',
          top: '20%',
          left: '5%',
          containLabel: true
        },
        series: [
          {
            data: yData1,
            type: 'bar',
            smooth: true,
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#3195ff',
                lineStyle: {
                  color: '#3195ff' //折线颜色
                }
              }
            },
            textStyle: {
              fontSize: 14,
              color: '#999999'
            },
            label: {
              show: true,
              position: 'top',
              color: '#999999'
            },
            barWidth: '20%',
            barCategoryGap: '10%'
          },
          {
            data: yData2,
            type: 'bar',
            smooth: true,
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#3195ff',
                lineStyle: {
                  color: '#3195ff' //折线颜色
                }
              }
            },
            textStyle: {
              fontSize: 14,
              color: '#999999'
            },
            label: {
              show: true,
              position: 'top',
              color: '#999999'
            },
            barWidth: '20%',
            barCategoryGap: '10%'
          }
        ],
        tooltip: {
          backgroundColor: '#FFFFFF',
          textStyle: {
            color: '#666666' //设置文字颜色
          },
          extraCssText: 'box-shadow:0px 3px 6px rgba(49, 149, 255, 0.16)',
          formatter: function (params) {
            const name = params.seriesIndex == 0 ? params.name : '较昨日'
            const value = params.seriesIndex == 0 ? params.value : params.value > 0 ? '+' + params.value : params.value
            return `${name}：${value}人`
          }
        }
      }
      return option
    }
  },
  methods: {
    // 获取疫情信息
    getEpidMessage() {
      epidemic().then((res) => {
        const input = res.data.chinaTotal.total.input
        const noSymptom = res.data.chinaTotal.extData.noSymptom
        const confirm = res.data.chinaTotal.total.confirm
        const dead = res.data.chinaTotal.total.dead
        const heal = res.data.chinaTotal.total.heal
        const now = confirm - dead - heal
        const inputAdded = res.data.chinaTotal.today.input
        const noSymptomAdded = res.data.chinaTotal.extData.incrNoSymptom
        const confirmAdded = res.data.chinaTotal.today.confirm
        const deadAdded = res.data.chinaTotal.today.dead
        const healAdded = res.data.chinaTotal.today.heal
        const nowAdded = res.data.chinaTotal.today.storeConfirm
        const list = [
          {
            num: input,
            added: inputAdded
          },
          {
            num: noSymptom,
            added: noSymptomAdded
          },
          {
            num: now,
            added: nowAdded
          },
          {
            num: confirm,
            added: confirmAdded
          },
          {
            num: dead,
            added: deadAdded
          },
          {
            num: heal,
            added: healAdded
          }
        ]
        this.epidList = this.epidList.map((item, index) => {
          item = { ...item, ...list[index] }
          return item
        })
        this.initEcharts()
      })
    },
    //曲线图初始化
    initEcharts() {
      let myChart = Echarts.init(this.$refs.chart)
      myChart.setOption(this.options)
    },
  }
}
</script>
<style lang='scss' scoped>
#dashboard {
  padding-top: 20px;
  background-color: #fafbfe;
  .village {
    display: flex;
    flex-wrap: wrap;
    .item {
      flex: 1;
      min-width: 230px;
      padding: 24px;
      margin: 0 15px 30px 15px;
      box-shadow: 0 0 35px 0 rgba(154, 161, 171, 0.15);
      transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      .number {
        margin: 24px 0;
      }
    }
  }
  .row {
    display: flex;
    width: 100%;
    .chart {
      margin-left: 30px;
    }
    .performance {
      width: 300px;
    }
  }
}
</style>
