<template>
  <div id="article" class="body-common">
    <h3 class="article-title">{{title}}</h3>
    <div class="article-info">
      <span class="author">{{author}}</span>
      |
      <span>{{time}}</span>
    </div>
    <div class="article-content">
      <p v-for="(item,index) in content" :key="index">{{item}}</p>
    </div>
  </div>
</template>
<script>
import { getarticle } from '@/api/admin'
export default {
  data() {
    return {
      title: '',
      author: '',
      time: '',
      content: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getarticle({
        id: this.$route.params.id
      }).then(res => {
        const { title, author, content, publishdate } = res.data
        this.title = title
        this.author = author
        this.time = this.dateformat(publishdate)
        this.content = this.contentformat(content)
      })
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
    contentformat(content) {
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
  padding-top: 20px;
  .article-title {
    margin-bottom: 20px;
    transition: color 0.2s;
    &:hover {
      color: #ff7300;
    }
  }
  .article-info {
    .author {
      color: #ff7300;
    }
  }
  .article-content {
    p {
      margin: 20px 0;
      font-size: 18px;
      line-height: 26px;
      text-indent: 2em;
    }
  }
}
</style>
