<template>
  <div id="dashboard">
    <div class="header">
      <div class="details">
        <div class="item" v-for="(item, index) in epidList" :key="index">
          <h4>{{ item.title }}</h4>
          <div class="number" :style="{ color: item.color }">{{ item.num }}</div>
          <p class="added">
            较昨日
            <span :style="{ color: item.color }">
              {{
              item.added > 0 ? "+" + item.added : item.added
              }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="wave">
      <div class="banner_wave_1"></div>
      <div class="banner_wave_2"></div>
    </div>
    <div class="main">
      <div class="item" v-for="item in list" :key="item.id" @click="toArticle(item._id)">
        <div class="time">
          <i class="iconfont icon-shijian"></i>
          发布于{{item.publishdate}}
        </div>
        <div class="title">
          <i class="iconfont icon-timu-04"></i>
          <span>{{item.title}}</span>
        </div>
        <div class="meta">
          <i class="iconfont icon-zhanghao"></i>
          作者:
          <span class="author">{{item.author}}</span>
        </div>
        <div class="content">{{item.content}}</div>
      </div>
      <div class="pagination">
        <el-pagination
          :total="pagination.total"
          :page-size="pagination.limit"
          :page-sizes="[2, 4, 6]"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.page"
          :pager-count="5"
          layout="prev, pager, next,jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { epidemic, getarticle } from '@/api/user'
import { Pagination } from 'element-ui'
export default {
  name: 'App',
  components: {
    [Pagination.name]: Pagination,
  },
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
      ],
      // 文章列表
      list: [],
      // 分页器
      pagination: {
        total: 0,
        page: 1,
        limit: 10
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getEpidMessage()
      this.getArtilceList()
    },
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
      })
    },
    //获取公告列表
    getArtilceList() {
      const send = {
        page: this.pagination.page,
        limit: this.pagination.limit
      }
      getarticle(send).then(res => {
        this.list = res.data.list.map(item => {
          item.publishdate = this.dateformat(item.publishdate)
          return item
        })
        this.pagination.total = res.data.total
      })
    },
    // 跳转到文章页面
    toArticle(params) {
      this.$router.push({
        path: `/article/${params}`,
        params
      })
    },
    handleCurrentChange() {
      this.list = []
      this.init()
    },
    dateformat(time) {
      const date = new Date(time)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = date.getDate()
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    },
  }
}
</script>
<style lang='scss' scoped>
#dashboard {
  .header {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url('../../../../assets/user/dashboard.png') no-repeat;
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
      background-color: rgba(255, 255, 255, 0.4);
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
          content: '';
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
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: url('../../../../assets/user/cover.png');
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
      background: url('../../../../assets/user/wave1.png') bottom repeat-x;
      animation: water-left 30s infinite;
    }
    .banner_wave_2 {
      position: absolute;
      width: 200%;
      height: 100%;
      left: -100%;
      background: url('../../../../assets/user/wave2.png') bottom repeat-x;
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
      i {
        margin-right: 10px;
        vertical-align: middle;
      }
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
        span,
        i {
          cursor: pointer;
          transition: color 0.5s;
        }
        &:hover {
          color: #ccc;
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
    .pagination {
      margin: 20px 0;
    }
  }
}
</style>
