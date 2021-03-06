<template>
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
          <input
            type="file"
            style="display: none"
            @change="changeAvatar($event)"
          />
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
    <div
      class="group"
      :style="showVillageList ? { height: '320px' } : { height: 'unset' }"
    >
      <label for>居住区号</label>
      <div class="choose">
        <div
          class="choose-type"
          :style="showVillageList ? { color: '#3195ff' } : ''"
          @click="showVillageList = !showVillageList"
        >
          {{ villageList[address].title }}
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
            >
              {{ item.title }}
            </div>
          </div>
        </transition>
      </div>
    </div>
    <ep-button @click.native="updateInfo" :disabled="!canRequest">
      提交
    </ep-button>
  </div>
</template>

<script>
import { personal, modifyuser, avatarModify } from '@/api/user'
export default {
  data () {
    return {
      // 头像
      src: '',
      // 名称
      name: '',
      // 账号
      account: '',
      // 密码
      password: '',
      // 手机号
      phone: '',
      // 小区号
      address: 0,
      // 是否展示小区号列表
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
      ],
      canRequest: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      personal().then((res) => {
        this.name = res.data.name
        this.src = res.data.avatar || ''
        this.account = res.data.account
        this.phone = res.data.phone
        this.address = res.data.address
      })
    },
    changeAvatar (e) {
      const file = e.target.files[0]
      if (/image\//.test(file.type)) {
        var formData = new FormData()
        formData.append('img', file, `avatar-${this.account}`)
        avatarModify(formData).then((res) => {
          this.src = res.img
        })
      } else {
        this.$toast('文件仅支持图片')
      }
    },
    updateInfo () {
      const send = {
        account: this.account,
        name: this.name,
        phone: this.phone,
        address: this.address
      }
      this.password && (send.password = this.password)
      this.src && (send.avatar = this.src)
      this.canRequest = false
      modifyuser(send).then(
        (res) => {
          this.$toast(res.message)
          this.$store.commit('app/changeUsername', this.name)
          this.src && this.$store.commit('app/changeAvatar', this.src)
          this.init()
          this.canRequest = true
        },
        () => {
          this.canRequest = true
        }
      )
    },
    // 图标显示数据类型改变
    changeType (id) {
      this.villageList.map((item) => {
        if (item.id === id) {
          this.address = id
        }
      })
      this.showVillageList = false
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  flex: 1;
  padding: 20px;
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
</style>
