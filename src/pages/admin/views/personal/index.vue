<template>
  <div id="personal" class="body-common">
    <div class="header">
      <div class="item" v-for="(item, index) in achievement" :key="index">
        <div class="number">{{ item.number }}</div>
        <div class="title">{{ item.title }}</div>
      </div>
    </div>
    <div class="info">
      <div class="group">
        <label for="avatar">头像</label>
        <div class="img">
          <img
            :src="src ? src : require('@/assets/common/default-avatar.png')"
            alt
            class="now-avatar"
          />
          <label class="change-avatar" id="avatar">
            <i class="el-icon-plus"></i>
            <input type="file" style="display: none" @change="changeAvatar($event)" />
          </label>
        </div>
      </div>
      <div class="group">
        <label for="name">姓名</label>
        <input type="text" id="name" v-model="name" />
      </div>
      <div class="group">
        <label for="account">账号</label>
        <input type="text" id="account" v-model="account" disabled />
      </div>
      <div class="group">
        <label for="password">密码</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <div class="group">
        <label for="phone">联系电话</label>
        <input type="text" id="phone" v-model="phone" />
      </div>
      <div class="group" :style="showVillageList ? { height: '320px' } : { height: 'unset' }">
        <label for>管理区号</label>
        <div class="choose">
          <div
            class="choose-type"
            :style="showVillageList ? { color: '#3195ff' } : ''"
            @click="showVillageList = !showVillageList"
          >
            {{ villageList[village].title }}
            <i
              class="el-icon-arrow-down"
              :style="showVillageList ? { transform: 'rotate(180deg)' } : ''"
            ></i>
          </div>
          <transition name="fade">
            <div class="choose-body" v-show="showVillageList">
              <div
                class="menu"
                v-for="item in villageList"
                :key="item.id"
                @click="changeType(item.id)"
              >{{ item.title }}</div>
            </div>
          </transition>
        </div>
      </div>
      <ep-button @click.native="updateInfo" :disabled="!disabled">提交</ep-button>
    </div>
  </div>
</template>
<script>
import { personal, usermodify } from '@/api/admin'
export default {
  name: 'personal',
  data() {
    return {
      // 与本人相关的公告信息
      achievement: [
        {
          number: 666,
          title: '发布公告数'
        },
        {
          number: 666,
          title: '公告浏览数'
        }
      ],
      // 头像
      src: '',
      // 名称
      name: '',
      //账号
      account: '',
      //密码
      password: '',
      // 手机号
      phone: '',
      // 管理的区号
      village: 0,
      // 居住的区号
      address: 0,
      // 区号列表
      showVillageList: false,
      // 图标显示数据类型
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
  mounted() {
    this.init()
  },
  computed: {
    disabled() {
      return this.name && this.phone
    }
  },
  methods: {
    init() {
      personal().then(res => {
        const { personal, articlenum, readNum } = res.data
        this.name = personal.name
        this.src = personal.avatar || ''
        this.account = personal.account
        this.phone = personal.phone
        this.village = personal.village || 0
        this.address = personal.address
        this.achievement[0].number = articlenum
        this.achievement[1].number = readNum
      })
    },
    changeAvatar(e) {
      const file = e.target.files[0]
      let url
      var reader = new FileReader()
      reader.readAsDataURL(file)
      const that = this
      reader.onload = function (e) {
        url = e.target.result.substring(this.result.indexOf(',') + 1)
        that.src = 'data:image/png;base64,' + url
      }
    },
    updateInfo() {
      let send = {
        account: this.account,
        name: this.name,
        phone: this.phone,
        village: this.village,
        authority: 1,
        address: this.address
      }
      this.src && (send.avatar = this.src)
      this.password && (send.password = this.password)
      usermodify(send).then(res => {
        this.$toast(res.message)
        this.init()
      })
    },
    // 图标显示数据类型改变
    changeType(id) {
      this.villageList.map((item) => {
        if (item.id === id) {
          this.village = id
        }
      })
      this.showVillageList = false
    }
  }
}
</script>
<style lang='scss' scoped>
#personal {
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    .item {
      position: relative;
      flex: 1;
      padding: 40px 0;
      text-align: center;
      .number {
        margin: 10px 0;
        font-size: 30px;
      }
      .title {
        color: #ccc;
      }
      &:not(:last-of-type)::before {
        content: '';
        position: absolute;
        right: 0;
        top: 70px;
        width: 1px;
        height: 30px;
        background: #000;
      }
    }
  }
  .info {
    .group {
      width: 100%;
      > label:nth-of-type(1) {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
      }
      .img {
        img {
          width: 200px;
          height: 200px;
        }
        .change-avatar {
          display: block;
          width: 200px;
          height: 200px;
          line-height: 200px;
          margin-top: 10px;
          font-size: 30px;
          text-align: center;
          border: 1px dashed #ccc;
          border-radius: $radius;
          cursor: pointer;
          background-color: #fff;
        }
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
      margin: 20px 0;
    }
  }
}
</style>
