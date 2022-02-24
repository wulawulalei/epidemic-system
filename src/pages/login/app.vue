<template>
  <div id="login">
    <div class="main">
      <h2>{{ register ? "注册" : "登陆" }}</h2>
      <div class="login_box">
        <input type="text" required="required" id="account" v-model="account" />
        <label for="account">用户名</label>
      </div>
      <div class="login_box">
        <input
          type="password"
          required="required"
          id="password"
          v-model="password"
        />
        <label for="password">密码</label>
      </div>
      <div class="register">
        <div class="reg-btn" @click="register = !register">
          {{ register ? "已有账号，点此登陆" : "没有账号，点此注册" }}
        </div>
      </div>
      <button type="submit" class="btn" @click="login" :disabled="!disabled">
        登陆
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>
</template>
<script>
import { loginSystem } from '@/api/question'
export default {
  name: 'App',
  data () {
    return {
      account: '',
      password: '',
      register: false
    }
  },
  computed: {
    disabled () {
      return this.account.length > 0 && this.password.length > 0
    }
  },
  methods: {
    login () {
      if (this.account && this.password) {
        loginSystem({
          accuout: this.account,
          password: this.password,
          register: this.register ? '1' : '0'
        }).then((res) => {
          if (res.status == 'ok') {
            if (res.identity == 'user') {
              window.location.pathname = '/user.html'
            } else if (res.identity == 'admin') {
              window.location.pathname = '/admin.html'
            }
          } else {
            this.$toast(res.message)
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("../../assets/login/dashboard.jpg");
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
  background-color: transparent;
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
