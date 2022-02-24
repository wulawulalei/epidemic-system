<template>
  <div class="outgoing-card">
    <div class="title">临时通行证</div>
    <div class="card" ref="card">
      <img
        :src="avatar ? avatar : require('@/assets/common/default-avatar.png')"
        alt=""
      />
      <div class="info">
        <div class="status">
          <i class="el-icon-success"></i>
        </div>
        <div class="name">{{name}}</div>
        <div class="result">{{result}}</div>
        <div class="time">剩余时长：<span :class="dateformat(this.time)==='已过期'?'expire':''">{{dateformat(this.time)}}</span></div>
      </div>
    </div>
    <ep-button @click.native="downloadCard">点此下载临时通行证</ep-button>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
export default {
  data () {
    return {
      // 头像
      avatar: '',
      // 名称
      name: 'hhh',
      // 外出原因
      result: '有事斤斤计较急急急急急急急急急急急急急急急',
      // 返区时间
      time: '2022/2/24 17:00'
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    downloadCard () {
      const canvas = document.createElement('canvas')
      canvas.width = this.$refs.card.offsetWidth
      canvas.height = this.$refs.card.offsetHeight
      html2canvas(this.$refs.card).then(canvas => {
        // canvas为转换后的Canvas对象
        const a = document.createElement('a')
        a.setAttribute('href', canvas.toDataURL())
        a.setAttribute('download', `临时通行证-${this.name}.png`)
        a.click()
      })
    },
    dateformat (time) {
      const expire = new Date(time).getTime()
      const now = new Date().getTime()
      if (expire > now) {
        const lastTime = expire - now
        let hours = Math.floor(lastTime / 3600000)
        hours = hours > 9 ? hours : '0' + hours
        let minutes = Math.floor(Math.floor(lastTime % 3600000) / 60000)
        minutes = minutes > 9 ? minutes : '0' + minutes
        return `${hours}:${minutes}`
      } else {
        return '已过期'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.outgoing-card {
  flex: 1;
  padding: 20px;
  text-align: center;
  .title {
    margin-bottom: 20px;
    font-size: 25px;
    text-align: center;
    color: #000;
  }
  .card {
    max-width: 400px;
    margin: 0 auto;
    border-radius: $radius;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgb(49 149 255 / 6%);
    img {
      width: 100%;
      border-radius: $radius $radius 0 0;
    }
    .info {
      position: relative;
      padding: 40px;
      .status {
        position: absolute;
        top: -26px;
        right: 25px;
        font-size: 50px;
        border-radius: 50%;
        color: green;
        &.expire {
          color: red;
        }
      }
      .name {
        font-size: 22px;
        color: #000;
      }
      .result {
        margin: 10px 0;
        text-align: start;
        text-indent: 2em;
        color: #666;
        font-size: 16px;
      }
      .time > span {
        font-size: 18px;
        color: $primary;
        &.expire {
          color: red;
        }
      }
    }
  }
  .btn {
    margin-top: 20px;
  }
}
</style>
