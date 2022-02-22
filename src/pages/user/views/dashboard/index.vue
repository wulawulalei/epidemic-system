<template>
  <div id="dashboard">
    <div class="header">
      <div class="details">
        <div class="item" v-for="(item, index) in epidList" :key="index">
          <h4>{{ item.title }}</h4>
          <div class="number" :style="{color:item.color}">{{ item.num }}</div>
          <p class="added">
            较昨日<span :style="{color:item.color}">{{
              item.added > 0 ? "+" + item.added : item.added
            }}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="wave">
      <div class="banner_wave_1"></div>
      <div class="banner_wave_2"></div>
    </div>
    <div class="main">
      <div class="item" @click="toArticle(1)">
        <div class="time"><i></i>发布于2021-12-1</div>
        <div class="title">
          <i></i>
          <span>Web前端面试题：写一个mul函数</span>
        </div>
        <div class="meta">
          作者：
          <span class="author">的风格</span>
        </div>
        <div class="content">
          摘要：问题：写一个mul函数调用时将生成以下输出:
          console.log(mul(2)(3)(4)); // output : 24 console.log(mul(4)(3)(4));
          // output : 48 回答：时允
          这个应该是题主想要的答案，支持任意次数调用。主要是考察了对递归的理解，和
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { epidemic } from '@/api/question'
export default {
  name: 'App',
  data () {
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
  mounted () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      this.getEpidMessage()
    },
    // 获取疫情信息
    getEpidMessage () {
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
      })
    },
    // 跳转到文章页面
    toArticle (params) {
      this.$router.push({
        path: `/article/${params}`,
        params
      })
    }
  }
}
</script>
<style lang='scss' scoped>
#dashboard {
  .header {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("../../../../assets/user/dashboard.png") no-repeat;
    background-size: cover;
    .details {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 688px;
      padding-top: 34px;
      background-color: rgba(255,255,255,.4);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      .item {
        position: relative;
        width: 229px;
        min-height: 116px;
        margin-bottom: 34px;
        text-align: center;
        h4 {
          margin: 0;
          font-size: 20px;
        }
        .number {
          font-size: 44px;
          line-height: 74px;
        }
        .addrd {
          color: #999;
        }
        &:not(:nth-of-type(3n))::before {
          content: "";
          position: absolute;
          right: 0;
          top: 46px;
          width: 1px;
          height: 30px;
          background: #e8e8e8;
        }
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: url("../../../../assets/user/cover.png");
    }
  }
  .wave {
    position: absolute;
    height: 110px;
    width: 100%;
    overflow: hidden;
    bottom: 0;
    z-index: 99;
    .banner_wave_1 {
      position: absolute;
      width: 200%;
      height: 100%;
      left: 0;
      background: url("../../../../assets/user/wave1.png") bottom repeat-x;
      animation: water-left 30s infinite;
    }
    .banner_wave_2 {
      position: absolute;
      width: 200%;
      height: 100%;
      left: -100%;
      background: url("../../../../assets/user/wave2.png") bottom repeat-x;
      animation: water-right 20s infinite;
    }
    @keyframes water-left {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
    @keyframes water-right {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(50%);
      }
    }
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 70px 10px 0 10px;
    z-index: 999999;
    .item {
      width: 60%;
      max-width: 600px;
      height: 300px;
      position: relative;
      margin: 20px 0 20px;
      padding: 20px 30px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0);
      box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
      transition: box-shadow 0.3s;
      .time {
        color: #888;
        font-size: 12px;
      }
      .title {
        width: 100%;
        margin: 15px 0;
        font-size: 22px;
        color: #000;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        span {
          cursor: pointer;
          transition: color 0.5s;
          &:hover {
            color: #ccc;
          }
        }
      }
      .content {
        margin: 15px 0;
        color: #4a4a4a;
      }
      &:hover {
        box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
      }
    }
  }
}
</style>
