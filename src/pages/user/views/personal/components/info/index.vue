<template>
  <div class="info">
    <div class="group">
      <label for="avatar">头像</label>
      <div class="img">
        <img
          :src="src ? src : require('@/assets/common/default-avatar.png')"
          alt=""
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
      <label for="phone">联系电话</label>
      <input type="text" id="phone" v-model="phone" />
    </div>
    <div
      class="group"
      :style="showVillageList ? { height: '320px' } : { height: 'unset' }"
    >
      <label for="">居住区号</label>
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
            >
              {{ item.title }}
            </div>
          </div>
        </transition>
      </div>
    </div>
    <ep-button @click.native="updateInfo">提交</ep-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 头像
      src: '',
      // 名称
      name: '',
      // 手机号
      phone: '',
      // 小区号
      village: 0,
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
      ]
    }
  },
  mounted () {},
  methods: {
    changeAvatar (e) {
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
    updateInfo () {
      const send = {
        name: this.name,
        src: this.src,
        phone: this.phone,
        location: this.location
      }
      console.log(send)
    },
    // 图标显示数据类型改变
    changeType (id) {
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
    margin: 20px 0;
  }
}
</style>
