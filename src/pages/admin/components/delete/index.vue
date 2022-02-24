<template>
  <transition name="dialog-fade">
    <div class="bg" v-show="show">
      <div class="delete-user">
        <div class="head">温馨提示</div>
        <div class="content">
          <!-- <div class="icon"><SvgIcon iconClass="deleteRemind" /></div> -->
          <div class="text">您确定要将{{user.name}}从列表中删除吗？</div>
        </div>
        <div class="button-list">
          <ep-button plain @click.native="hideDialog">取消</ep-button>
          <ep-button @click.native="comfirmm" :disabled="disabled"
            >确定</ep-button
          >
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
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
  data () {
    return {
      disabled: false
    }
  },
  methods: {
    hideDialog () {
      this.$emit('update:show', false)
    },
    comfirmm () {
      console.log(1)
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
  .delete-user {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    height: 230px;
    border-radius: $radius;
    background-color: #ffffff;
    overflow: hidden;
    .head {
      width: 100%;
      height: 40px;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background: linear-gradient(135deg, #8f75da 0, #727cf5 60%);
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 60px 41px 43px;
      .icon {
        margin-right: 10px;
      }
      .text {
        font-size: 16px;
        color: $colFirstText;
      }
    }
    .button-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
