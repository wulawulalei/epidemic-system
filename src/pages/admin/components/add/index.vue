<template>
  <transition name="dialog-fade">
    <div class="bg" v-show="show" @click.self="hidden">
      <div class="add" @mousedown.self="dragStart($event)" ref="add">
        <!-- 姓名列 -->
        <div class="group">
          <label for="name">姓名</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <!-- 小区号列 -->
        <div class="group">
          <label for="address">小区号</label>
          <div class="choose">
            <div
              class="choose-type"
              :style="showLocation ? { color: '#3195ff' } : ''"
              @click="showLocation = !showLocation"
            >
              {{ villageList[address].title }}
              <i
                class="el-icon-arrow-down"
                :style="showLocation ? { transform: 'rotate(180deg)' } : ''"
              ></i>
            </div>
            <transition name="fade">
              <div class="choose-body" v-show="showLocation">
                <div
                  class="menu"
                  v-for="item in villageList"
                  :key="item.id"
                  @click="changeType(item.id, 'address', 'showLocation')"
                >
                  {{ item.title }}
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- 电话列 -->
        <div class="group">
          <label for="phone">电话</label>
          <input type="text" id="phone" v-model="phone" />
        </div>
        <!-- 权限列 -->
        <div class="group" v-if="$route.path == '/users'">
          <label for="authority">权限</label>
          <input
            type="radio"
            name="authority"
            value="0"
            id="authority0"
            v-model="authority"
          /><label for="authority0">普通用户</label>
          <input
            type="radio"
            name="authority"
            value="1"
            id="authority1"
            v-model="authority"
          /><label for="authority1">管理员</label>
        </div>
        <!-- 管理区间列 -->
        <div class="group" v-if="$route.path == '/users' && authority == 1">
          <label for="manage">管理区间</label>
          <div class="choose">
            <div
              class="choose-type"
              :style="showManagerList ? { color: '#3195ff' } : ''"
              @click="showManagerList = !showManagerList"
            >
              {{ villageList[village].title }}
              <i
                class="el-icon-arrow-down"
                :style="showManagerList ? { transform: 'rotate(180deg)' } : ''"
              ></i>
            </div>
            <transition name="fade">
              <div class="choose-body" v-show="showManagerList">
                <div
                  class="menu"
                  v-for="item in villageList"
                  :key="item.id"
                  @click="changeType(item.id, 'village', 'showManagerList')"
                >
                  {{ item.title }}
                </div>
              </div>
            </transition>
          </div>
        </div>
        <!-- 核酸检测结果列 -->
        <div class="group" v-if="$route.path == '/details'">
          <label for="checkResult">检测结果</label>
          <input
            type="radio"
            name="checkResult"
            value="0"
            id="checkResult0"
            v-model="checkResult"
          /><label for="checkResult0">阴性</label>
          <input
            type="radio"
            name="checkResult"
            value="1"
            id="checkResult1"
            v-model="checkResult"
          /><label for="checkResult1">阳性</label>
        </div>
        <!-- 核酸检测时间列 -->
        <div class="group" v-if="$route.path == '/details'">
          <label for="checkTime">检测时间</label>
          <el-date-picker
            id="checkTime"
            v-model="checkTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy/MM/dd"
          >
          </el-date-picker>
        </div>
        <!-- 外出原因列 -->
        <div class="group" v-if="$route.path == '/outofmanager'">
          <label for="outResult">外出原因</label>
          <input type="text" id="outResult" />
        </div>
        <!-- 返区时间列 -->
        <div class="group" v-if="$route.path == '/outofmanager'">
          <label for="time">返区时间</label>
          <el-date-picker
            id="time"
            v-model="time"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日 HH 时 mm 分"
            value-format="yyyy/MM/dd HH:mm"
          >
          </el-date-picker>
        </div>
        <ep-button @click.native="addItem">提交</ep-button>
      </div>
    </div>
  </transition>
</template>
<script>
import { DatePicker } from 'element-ui'
export default {
  props: {
    show: {
      type: Boolean,
      require: true
    },
    user: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  components: {
    [DatePicker.name]: DatePicker
  },
  data () {
    return {
      // 姓名
      name: '',
      // 手机号
      phone: '',
      // 检测时间
      checkTime: '',
      // 返区时间
      time: '',
      // 核酸检测结果
      checkResult: 0,
      // 权限
      authority: 0,
      // 居住的小区号
      address: 0,
      // 管理的小区号
      village: 0,
      // 是否显示管理区号列表
      showManagerList: false,
      // 是否显示住址区号列表
      showLocation: false,
      // 小区号列表
      villageList: [
        {
          title: 'A区',
          id: 0
        },
        {
          title: 'B区',
          id: 1
        },
        {
          title: 'C区',
          id: 2
        },
        {
          title: 'D区',
          id: 3
        }
      ]
    }
  },
  created () {},
  watch: {
    show (val) {
      if (val && this.getObjLen(this.user) > 0) {
        Object.assign(this.$data, this.user)
      } else if (!val) {
        this.name = ''
        this.phone = ''
        this.authority = 0
        this.village = 0
      }
    }
  },
  methods: {
    hidden () {
      this.$emit('update:show', false)
    },
    // 添加信息
    addItem () {
      if (this.$route.path === '/users' && this.getObjLen(this.user) > 0) {
        console.log('userUpdate')
      } else if (this.$route.path === '/users' && this.getObjLen(this.user) === 0) {
        console.log('adduser')
      } else if (this.$route.path === '/details') {
        console.log('adddetails')
      } else if (this.$route.path === '/outofmanager') {
        console.log('addoutofmanager')
      }
    },
    // 拖拽
    dragStart (e) {
      const dv = this.$refs.add
      let x = 0
      let y = 0
      let l = 0
      let t = 0
      let isDown = false
      // 鼠标按下事件
      // 获取x坐标和y坐标
      x = e.clientX
      y = e.clientY
      // 获取左部和顶部的偏移量
      l = dv.offsetLeft
      t = dv.offsetTop
      // 开关打开
      isDown = true
      // 设置样式
      dv.style.cursor = 'move'
      // 鼠标移动
      window.onmousemove = function (e) {
        if (isDown === false) {
          return
        }
        // 获取x和y
        const nx = e.clientX
        const ny = e.clientY
        // 计算移动后的左偏移量和顶部的偏移量
        const nl = nx - (x - l)
        const nt = ny - (y - t)
        const windowW = document.body.clientWidth
        const windowH = document.body.clientHeight
        if (nl > dv.offsetWidth / 2 && nl + dv.offsetWidth / 2 < windowW) {
          dv.style.left = `${nl}px`
        } else if (nl < dv.offsetWidth / 2) {
          // 左边拖拽到最左
          dv.style.left = `${parseInt(dv.offsetWidth / 2)}px`
        } else if (nl + dv.offsetWidth / 2 > windowW) {
          // 右边拖拽到最右
          dv.style.left = `${parseInt(windowW - dv.offsetWidth / 2)}px`
        }
        if (nt > dv.offsetHeight / 2 && nt + dv.offsetHeight / 2 < windowH) {
          dv.style.top = `${nt}px`
        } else if (nt < dv.offsetHeight / 2) {
          // 上边拖拽到最上
          dv.style.top = `${parseInt(dv.offsetHeight / 2)}px`
        } else if (nt + dv.offsetHeight / 2 > windowH) {
          // 下边拖拽到最下
          dv.style.top = `${parseInt(windowH - dv.offsetHeight / 2)}px`
        }
      }
      // 鼠标抬起事件
      dv.onmouseup = function () {
        // 开关关闭
        isDown = false
        dv.style.cursor = 'default'
      }
    },
    // 图标显示数据类型改变
    changeType (id, name, flag) {
      this.villageList.map((item) => {
        if (item.id === id) {
          this[name] = id
        }
      })
      this[flag] = false
    },
    // 获取对象的长度
    getObjLen (obj) {
      const keys = Object.keys(obj)
      const length = keys.length
      return length
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
      input[type="text"] {
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
      .choose {
        position: relative;
        display: inline-block;
        .choose-type {
          display: inline-block;
          cursor: pointer;
          transition: color 0.2s;
          &:hover {
            color: $primary;
          }
          i {
            transition: transform 0.2s;
          }
        }
        .choose-body {
          position: absolute;
          top: 34px;
          left: 0;
          height: 196px;
          padding: 16px 12px;
          border-radius: $radius;
          box-shadow: 0px 0px 10px rgba(49, 149, 255, 0.16);
          background-color: #fff;
          overflow-y: auto;
          z-index: 99999;
          .menu {
            width: 300px;
            height: 35px;
            line-height: 35px;
            border-radius: 4px;
            font-size: 14px;
            text-align: center;
            color: #999999;
            cursor: pointer;
            background-color: #f3f4f8;
            &:not(:last-of-type) {
              margin-bottom: 8px;
            }
          }
        }
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
