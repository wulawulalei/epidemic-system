<template>
  <div id="editannount" class="body-common">
    <div class="group">
      <label for="title">公告标题</label>
      <input
        type="text"
        id="title"
        v-model="title"
        ref="title"
        @input="watchInput('title', 20, 'remind', $event)"
      />
      <div class="text-num">{{ title.length || 0 }}/20</div>
      <div class="remind" ref="remind">公告标题不可为空!</div>
    </div>
    <div class="group">
      <label for="avatar">作者</label>
      <input type="text" id="avatar" disabled v-model="author" />
    </div>
    <div class="group">
      <label>封面</label>
      <input type="file" @change="showImg($event)" />
      <img :src="cover" alt ref="noticeimg" />
    </div>
    <div class="group">
      <label for="content">内容</label>
      <textarea type="text" id="content" v-model="content" ref="content" />
    </div>
    <ep-button @click="sendNotice" :disabled="!disabled">发布</ep-button>
  </div>
</template>
<script>
import { addarticle, avatarModify } from '@/api/admin'
export default {
  name: 'editannount',
  data () {
    return {
      // 公告名称
      title: '',
      // 作者
      author: '',
      // 封面背景
      cover: '',
      // 公告内容
      content: '',
      account: ''
    }
  },
  mounted () {
    this.author = this.$store.getters.username
    this.account = this.$store.getters.account
  },
  computed: {
    disabled () {
      return this.title && this.author && this.content
    }
  },
  methods: {
    // 输入框超出截除
    watchInput (name, maxLength, refName, e) {
      if (this[name].length > maxLength) {
        this[name] = this[name].slice(0, maxLength)
      }
      if (e.target.value.length <= 0) {
        this.$refs[refName].style.display = 'block'
        this.$refs[name].style.borderColor = '#ff3030'
      } else {
        this.$refs[refName].style.display = 'none'
        this.$refs[name].style.borderColor = '#999999'
      }
    },
    // 选择封面后的回调
    showImg (e) {
      const file = e.target.files[0]
      if (/image\//.test(file.type)) {
        var formData = new FormData()
        formData.append('img', file, `article-${this.title}`)
        avatarModify(formData).then((res) => {
          this.cover = res.img
        })
      } else {
        this.$toast('文件仅支持图片')
      }
    },
    // 发布公告
    sendNotice () {
      const send = {
        title: this.title,
        author: this.author,
        cover: this.cover,
        content: this.content,
        account: this.account
      }
      addarticle(send).then((res) => {
        this.$toast(res.message)
        this.$router.push('/notice')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#editannount {
  padding-top: 20px;
  .group {
    position: relative;
    width: 100%;
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
    }
    input[type='text'],
    textarea {
      display: block;
      width: 100%;
      height: calc(2.2125rem + 2px);
      padding: 7px 14px;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      color: #6c757d;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      outline: none;
    }
    textarea {
      height: unset;
    }
    .text-num {
      position: absolute;
      bottom: 8px;
      right: 20px;
      font-size: 16px;
      color: $colAuxiText;
    }
    .remind {
      display: none;
      position: absolute;
      bottom: -23px;
      right: 0;
      color: red;
    }
    img {
      display: block;
      max-width: 200px;
      margin-top: 20px;
    }
    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  }
  .btn {
    float: right;
    margin-top: 20px;
  }
}
</style>
