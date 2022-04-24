<template>
  <div id="article">
    <div class="banner">
      <div class="info">
        <div class="title">{{ title }}</div>
        <div class="article-info">
          <img
            class="avatar"
            :src="
              avatar ? avatar : require('@/assets/common/default-avatar.png')
            "
          />
          <span class="author">{{ author }}</span>
          ·
          <span class="article-time">{{ time }}</span>
          ·
          <span class="read-num">{{ read }}</span>
          次阅读
        </div>
      </div>
    </div>
    <div class="content">
      <p v-for="(item, index) in content" :key="index">{{ item }}</p>
    </div>
  </div>
</template>
<script>
import { getarticle } from '@/api/user'
export default {
  name: 'App',
  data () {
    return {
      title: '',
      avatar: '',
      author: '',
      time: '',
      read: '0',
      content: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      getarticle({
        id: this.$route.params.id
      }).then((res) => {
        const { title, author, content, publishdate, read, avatar } = res.data
        this.title = title
        this.author = author
        this.time = this.dateformat(publishdate)
        this.read = read
        this.avatar = avatar || ''
        this.content = this.contentformat(content)
      })
    },
    dateformat (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = month > 9 ? month : '0' + month
      let day = date.getDate()
      day = day > 9 ? day : '0' + day
      return `${year}-${month}-${day}`
    },
    contentformat (content) {
      let result = []
      if (content.indexOf('\n') > -1) {
        result = content.split('\n')
      } else {
        result.push(content)
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
#article {
  margin-top: 75px;
  .banner {
    position: relative;
    width: 100%;
    height: 500px;
    background: url('../../../../assets/user/dashboard.png') no-repeat;
    background-size: cover;
    .info {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      width: 80%;
      margin: 0 auto;
      color: #fff;
      text-shadow: 2px 2px 10px #000;
      .title {
        width: 100%;
        margin: 15px 0;
        font-size: 22px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 100%;
        margin-right: 12px;
        vertical-align: top;
      }
    }
  }
  .content {
    width: 60%;
    min-width: 600px;
    max-width: 1000px;
    margin: 0 auto;
    padding: 66px 15px 10px;
    p {
      width: 100%;
      line-height: 30px;
      margin: 20px 0;
      font-size: 18px;
      text-indent: 2em;
      word-break: break-all;
    }
  }
}
</style>
