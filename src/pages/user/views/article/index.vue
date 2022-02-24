<template>
  <div id="article">
    <div class="banner">
      <div class="info">
        <div class="title">{{article.title}}</div>
        <div class="article-info">
          <img class="avatar" />
          <span class="author">{{article.author}}</span>
          ·
          <span class="article-time">{{article.time}}</span>
          ·
          <span class="read-num">{{article.read}}</span>
          次阅读
        </div>
      </div>
    </div>
    <div class="content">
      <p>水水水水水水水水水水水水水水水水士大夫精神的好伐拉会尽快答复接口连接啊考虑实际的风口浪尖撒飞机开绿灯撒加分类水水水</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      article: {
        title: 'Web前端面试题：写一个mul函数',
        avatar: '',
        author: 'Toretto',
        time: '2021-12-01 14:22',
        read: '33',
        content: ''
      }
    }
  }
}
</script>
<style lang='scss' scoped>
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
    p{
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
