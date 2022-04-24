<template>
  <div class="exit-dialog" v-show="show">
    <div class="dialog-container">
      <div class="head">温馨提示</div>
      <div class="content">确定要退出登录吗</div>
      <div class="button-list">
        <ep-button @click="loginOut" :disabled="disabled">确定</ep-button
        ><ep-button @click="hidden">取消</ep-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    hidden () {
      this.$emit('update:show', false)
    },
    loginOut () {
      this.disabled = true
      this.$toast('成功退出登陆')
      localStorage.setItem('token', '')
      window.location.pathname = '/login.html'
    }
  }
}
</script>

<style lang="scss">
.exit-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999999999999;
  .dialog-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    height: 230px;
    border-radius: $radius;
    background-color: #ffffff;
    .head {
      width: 100%;
      height: 40px;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      border-radius: $radius $radius 0 0;
      background-color: $primary;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 60px 41px 43px;
    }
    .button-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
