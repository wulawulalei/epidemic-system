<template>
  <transition name="dialog-fade">
    <div class="bg" v-show="show" @click.self="hidden">
      <div class="add">
        <div class="group">
          <label for="result">拒绝{{user.name}}外出原因</label>
          <input type="text" id="result" v-model="result" />
        </div>
        <ep-button @click.native="addItem" :disabled="disabled">提交</ep-button>
      </div>
    </div>
  </transition>
</template>
<script>
import { handleapply } from '@/api/admin'
export default {
  props: {
    show: {
      type: Boolean,
      require: true
    },
    user: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      disabled: false,
      result: ''
    }
  },
  methods: {
    hidden() {
      this.$emit('update:show', false)
      this.result = ''
    },
    // 添加信息
    addItem() {
      const send = {
        _id: this.user._id,
        status: 2,
        failResult: this.result
      }
      handleapply(send).then(res => {
        this.$toast(res.message)
        this.$emit('init')
        this.hidden()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1111;
  .add {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    max-height: calc(100vh - 100px);
    padding: 16px;
    border-radius: $radius;
    background-color: #ffffff;
    overflow-y: auto;
    .group {
      width: 100%;
      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
      }
      input {
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
      &:not(:last-of-type) {
        margin-bottom: 16px;
      }
    }
    .btn {
      float: right;
      margin-top: 20px;
    }
  }
}
</style>
