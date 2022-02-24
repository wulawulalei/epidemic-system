<template>
  <div id="editannount" class="body-common">
    <div class="group">
      <label for="name">公告标题</label>
      <input
        type="text"
        id="name"
        v-model="name"
        ref="name"
        @input="watchInput('name', 20, 'remind', $event)"
      />
      <div class="text-num">{{ name.length || 0 }}/20</div>
      <div class="remind" ref="remind">公告标题不可为空!</div>
    </div>
    <div class="group">
      <label for="avatar">作者</label>
      <input type="text" id="avatar" disabled />
    </div>
    <div class="group">
      <label>封面</label>
      <input type="file" @change="showImg($event)" />
      <img :src="imgUrl" alt="" ref="noticeimg" />
    </div>
    <div class="group">
      <label for="container">内容</label>
      <textarea type="text" id="container" v-model="container" ref="container"/>
    </div>
    <ep-button @click="sendNotice">发布</ep-button>
  </div>
</template>
<script>
export default {
  name: 'editannount',
  data () {
    return {
      // 名称
      name: '',
      // 封面背景
      imgUrl: '',
      // 公告内容
      container: ''
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
      let url
      var reader = new FileReader()
      reader.readAsDataURL(file)
      const that = this
      reader.onload = function (e) {
        url = e.target.result.substring(this.result.indexOf(',') + 1)
        that.imgUrl = 'data:image/png;base64,' + url
      }
    },
    // 发布公告
    sendNotice () {
      if (this.$refs.container.value.indexOf('\n') > -1) {
        console.log(this.container)
      } else {
        console.log(this.$refs.container.value)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
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
    input[type="text"],textarea {
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
    textarea{
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
  .btn{
    float: right;
    margin-top: 20px;
  }
}
</style>
