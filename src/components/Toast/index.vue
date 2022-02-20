<template>
  <transition name="dialog-fade">
    <div v-if="isShow" class="toast" id="toast{0}">{{ content }}</div>
  </transition>
</template>

<script>
export default {
  name: 'AsToast',
  props: {
    content: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    showToast() {
      this.isShow = true
      return this
    }
  }
}
</script>

<style>
.toast {
  position: fixed;
  left: 50%;
  top: 51%;
  transform: translate(-50%, -50%);
  background: bisque;
  z-index: 10000;
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
