<template>
  <transition name="dialog-fade">
    <div class="bg" v-show="show" @click.self="hidden">
      <div class="add">
        <div class="group">
          <label for="account">账号</label>
          <input type="text" id="account" disabled v-model="account" />
        </div>
        <div class="group" v-if="$route.path == '/goout'">
          <label for="result">外出原因</label>
          <input type="text" id="result" v-model="result" />
        </div>
        <div class="group" v-if="$route.path == '/goout'">
          <label for="time">返区时间</label>
          <el-date-picker
            id="time"
            v-model="time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分"
            value-format="yyyy/MM/dd HH:mm"
          ></el-date-picker>
        </div>
        <div class="group" v-if="$route.path == '/register'">
          <label>检测结果</label>
          <input
            type="radio"
            name="checkResult"
            value="0"
            id="checkResult0"
            v-model="checkResult"
          />
          <label for="checkResult0">阴性</label>
          <input
            type="radio"
            name="checkResult"
            value="1"
            id="checkResult1"
            v-model="checkResult"
          />
          <label for="checkResult1">阳性</label>
        </div>
        <div class="group" v-if="$route.path == '/register'">
          <label for="checkTime">检测时间</label>
          <el-date-picker
            id="checkTime"
            v-model="checkTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分"
            value-format="yyyy/MM/dd HH:mm"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <ep-button @click.native="addItem" :disabled="!disabled"
          >提交</ep-button
        >
      </div>
    </div>
  </transition>
</template>
<script>
import { personal, addapply, addcheck } from '@/api/user'
import { DatePicker } from 'element-ui'
export default {
  props: {
    show: {
      type: Boolean,
      require: true
    }
  },
  components: {
    [DatePicker.name]: DatePicker
  },
  data () {
    return {
      // 用户账号
      account: '',
      // 外出原因
      result: '',
      // 核酸检测时间
      checkTime: '',
      // 核酸检测结果
      checkResult: 0,
      // 返区时间
      time: '',
      // 不能选择当前日期之后的时间
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  mounted () {
    this.getAccount()
  },
  computed: {
    disabled () {
      return (
        (this.$route.path === '/goout' && this.result && this.time) ||
        (this.$route.path === '/register' &&
          this.checkResult !== '' &&
          this.checkTime)
      )
    }
  },
  methods: {
    hidden () {
      this.$emit('update:show', false)
    },
    // 添加信息
    addItem () {
      if (this.$route.path === '/goout') {
        const send = {
          account: this.account,
          result: this.result,
          time: this.time
        }
        addapply(send).then((res) => {
          if (res.code === 200) {
            this.$toast(res.message)
            this.$emit('init')
            this.$emit('update:show', false)
            this.result = ''
            this.time = ''
          }
        })
      } else if (this.$route.path === '/register') {
        const send = {
          account: this.account,
          time: this.checkTime,
          result: this.checkResult
        }
        addcheck(send).then((res) => {
          if (res.code === 200) {
            this.$toast(res.message)
            this.$emit('init')
            this.$emit('update:show', false)
            this.checkResult = 0
            this.checkTime = ''
          }
        })
      }
    },
    // 获取账号
    getAccount () {
      personal().then((res) => {
        this.account = res.data.account
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
      > label:nth-of-type(1) {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
      }
      input[type='text'] {
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
<style lang="scss">
.bg {
  .el-date-editor {
    width: 100%;
  }
}
</style>
