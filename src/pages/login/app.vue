<template>
  <div id="login">
    <div class="main">
      <h2>{{ register ? "注册" : "登陆" }}</h2>
      <div class="login_box">
        <input type="text" required="required" id="account" v-model="account" />
        <label for="account">账号</label>
      </div>
      <div class="login_box">
        <input type="password" required="required" id="password" v-model="password" />
        <label for="password">密码</label>
      </div>
      <div class="login_box" v-if="register">
        <input type="text" required="required" id="name" v-model="name" />
        <label for="name">名称</label>
      </div>
      <div class="login_box" v-if="register">
        <input type="text" required="required" id="phone" v-model="phone" />
        <label for="phone">电话</label>
      </div>
      <div class="login_box" v-if="register">
        <label for="address">小区号</label>
        <div class="choose">
          <div
            class="choose-type"
            :style="showAddressList ? { color: '#3195ff' } : ''"
            @click="showAddressList = !showAddressList"
          >
            {{ addressList[address].title }}
            <i
              class="el-icon-arrow-down"
              :style="showAddressList ? { transform: 'rotate(180deg)' } : ''"
            ></i>
          </div>
          <transition name="fade">
            <div class="choose-body" v-show="showAddressList">
              <div
                class="menu"
                v-for="item in addressList"
                :key="item.id"
                @click="changeType(item.id, 'address', 'showAddressList')"
              >{{ item.title }}</div>
            </div>
          </transition>
        </div>
      </div>
      <div class="register">
        <div
          class="reg-btn"
          @click="register = !register"
        >{{ register ? "已有账号，点此登陆" : "没有账号，点此注册" }}</div>
      </div>
      <button type="submit" class="btn" @click="login" :disabled="!disabled">
        {{ register ? "注册" : "登陆" }}
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</template>
<script>
import { intercept } from '@/mixins/intercept.js'
import { loginSystem, register } from '@/api/login'
export default {
  name: 'App',
  data() {
    return {
      //账号
      account: '',
      //密码
      password: '',
      //名称
      name: '',
      //住址
      address: 0,
      //展示住址列表
      showAddressList: false,
      //住址列表
      addressList: [
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
      //电话
      phone: '',
      //是否为注册
      register: false
    }
  },
  computed: {
    disabled() {
      return !this.register && this.account && this.password || this.register && this.account && this.password && this.name && this.address !== '' && this.phone
    }
  },
  methods: {
    login() {
      if (this.account && this.password) {
        let send
        if (this.register) {
          send = {
            account: this.account,
            password: this.password,
            name: this.name,
            address: this.address,
            phone: this.phone,
            inLogin: 1
          }
          register(send).then(res => {
            localStorage.setItem('token', res.token)
            window.location.pathname = '/user.html'
          })
        } else {
          send = {
            account: this.account,
            password: this.password
          }
          loginSystem(send).then((res) => {
            localStorage.setItem('token', res.token)
            if (res.identity === 0) {
              window.location.pathname = '/user.html'
            } else if (res.identity === 1) {
              window.location.pathname = '/admin.html'
            }
          })
        }
      }
    },
    changeType(id, name, flag) {
      this.addressList.map((item) => {
        if (item.id === id) {
          this[name] = id
        }
      })
      this[flag] = false
    },
  },
  mixins: [intercept]
}
</script>
<style lang="scss" scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('../../assets/login/dashboard.jpg');
  background-size: cover;
}
.main {
  width: 400px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  padding: 40px;
  h2 {
    color: #fff;
    margin-bottom: 30px;
  }
}

.main .login_box {
  position: relative;
  width: 100%;
  .choose {
    position: relative;
    display: inline-block;
    color: #fff;
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
      left: -80px;
      height: 196px;
      padding: 16px 12px;
      border-radius: $radius;
      box-shadow: 0px 0px 10px rgba(49, 149, 255, 0.16);
      background-color: #fff;
      overflow-y: auto;
      z-index: 99999;
      .menu {
        width: 200px;
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
}
.main .register {
  margin: 20px 0;
  text-align: right;
  color: #fff;
  .reg-btn {
    display: inline-block;
    cursor: pointer;
  }
}
.main .login_box label {
  position: absolute;
  left: 0;
  top: -4px;
  padding: 10px 0;
  color: #fff;
  pointer-events: none;
}

.main .login_box input {
  outline: none;
  border: none;
  width: 100%;
  height: 30px;
  padding: 10px 0;
  margin-bottom: 20px;
  font-size: 16px;
  color: #fff;
  background-color: transparent !important;
  border-bottom: 2px solid #fff;
  transition: all 0.4s;
}

.main .login_box input:focus + label,
.main .login_box input:valid + label {
  top: -20px;
  color: #03e9f4;
  font-size: 12px;
  transition: all 0.4s;
}

.main .btn {
  border: 0;
  outline: 0;
  overflow: hidden;
  position: relative;
  padding: 10px 20px;
  color: #03e9f4;
  background-color: transparent;
  text-decoration: none;
  transition: all 0.4s;
}

.main .btn:hover {
  background-color: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.main .btn span {
  position: absolute;
}

.main .btn span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right, transparent, #03e9f4);
  animation: move1 1s linear infinite;
}

.main .btn span:nth-child(2) {
  right: 0;
  top: -100%;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom, transparent, #03e9f4);
  animation: move2 1s linear 0.25s infinite;
}

.main .btn span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(to left, transparent, #03e9f4);
  animation: move3 1s linear 0.5s infinite;
}

.main .btn span:nth-child(4) {
  left: 0;
  bottom: -100%;
  width: 2px;
  height: 100%;
  background: linear-gradient(to top, transparent, #03e9f4);
  animation: move4 1s linear 0.75s infinite;
}

@keyframes move1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes move2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}

@keyframes move3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}

@keyframes move4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>
