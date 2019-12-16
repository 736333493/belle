<template>
  <div class="home">
    <div class="applogo">
      <div class="logo">
        <img
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576329751043&di=01e5015ccd73826c1b71a8ebb428f96d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F22%2F20180922144344_dsdgb.jpeg"
          alt=""
          class="auto-img"
        />
      </div>
    </div>
    <div class="group">
      <van-cell-group>
        <van-field v-model="user" clearable label="用户名" placeholder="输入手机号或者邮箱" left-icon="manager" @input="validUsername()" :error-message="judge1" />

        <van-field
          v-model="passwordVAlue"
          :type="eyetype.eyetext1"
          label="密码"
          placeholder="密码的格式为6-12位"
          left-icon="lock"
          :right-icon="eye1"
          @input="safetyPassword()"
          @click-right-icon="viewPassword1()"
          :error-message="hint.message2"
        />
        <van-field
          v-model="VAlue"
          :type="eyetype.eyetext2"
          label="确认密码"
          placeholder="请输入密码"
          left-icon="lock"
          :right-icon="eye2"
          @input="repetitionPassword()"
          @click-right-icon="viewPassword2()"
          :error-message="hint.message1"
        />
      </van-cell-group>
      <!-- 注册 -->
      <div class="login"><van-button round type="danger" class="login-btn" block @click="register()" :disabled="isValid">注册</van-button></div>
      <div class="login-text"><router-link class="login-t" to="/home">已有账号？登录</router-link></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'register',
  data() {
    return {
      // 用户输入对错
      judge1: '',

      // 输入账号
      user: '',
      // 输入第一次密码
      passwordVAlue: '',
      // 输入第二次密码
      VAlue: '',

      // 查看密码
      eye1: 'eye-o',
      eye2: 'eye-o',
      eyetype: { eyetext1: 'password', eyetext2: 'password' },
      // 密码提示
      hint: { message1: '', message2: '' },

      // 是否注册
      isValid: false
    };
  },
  methods: {
    validUsername() {
      // 验证手机
      var phoneReg = /^1[3-578]\d{9}$/;
      // 验证邮箱
      var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

      if (mailReg.test(this.user) || phoneReg.test(this.user)) {
        this.judge1 = '';
      } else {
        this.judge1 = '输入手机号或者邮箱';
      }
    },

    // 判断密码格式
    safetyPassword() {
      var pas = /^[\w]{6,12}$/;
      if (!pas.test(this.passwordVAlue)) {
        this.hint.message2 = '密码输入错误,密码的格式为6-12位';
      } else {
        this.hint.message2 = '';
      }
    },
    // 判断密码是否一致
    repetitionPassword() {
      if (this.passwordVAlue == this.VAlue) {
        this.hint.message1 = '';
      } else {
        this.hint.message1 = '密码输入不一致,请重新输入';
      }
    },
    // 眼睛
    viewPassword1() {
      if (this.eye1 == 'closed-eye') {
        this.eye1 = 'eye-o';
        this.eyetype.eyetext1 = 'password';
      } else {
        this.eyetype.eyetext1 = 'text';
        this.eye1 = 'closed-eye';
      }
    },
    viewPassword2() {
      if (this.eye2 == 'closed-eye') {
        this.eye2 = 'eye-o';
        this.eyetype.eyetext2 = 'password';
      } else {
        this.eyetype.eyetext2 = 'text';
        this.eye2 = 'closed-eye';
      }
    },

    // 注册
    register() {
      if (this.judge1 == '' && this.user != '' && (this.hint.message1 == '' && this.passwordVAlue != '') && (this.hint.message2 == '' && this.VAlue != '')) {
        //获取所有用户信息
        let users = localStorage.getItem('users');
        users = users ? JSON.parse(users) : [];
         
        //判断当前用户是否存在
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == this.user) {
            this.judge1 = '该用户已经存在';

            return;
          } else {
            this.judge1 = '';
          }
        }

                 let time = new Date().getTime();
        let userInformation = {
          //用户名
          username: this.user,

          //密码
          pwd: this.passwordVAlue,

          //注册时间
          time
        };
        users.push(userInformation);
        //写入本地存储，模拟数据库
        localStorage.setItem('users', JSON.stringify(users));


        //跳转到登录页面
        this.$router.push({name: 'home'});
      }
    }
  }
};
</script>
<style scoped lang="less">
.group {
  padding: 20px;
}
.applogo {
  height: 200px;
  background: url(../assets/timg.jpg) no-repeat;
  position: relative;
  .logo {
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    // transform: translate(-50%, -50%);
    background-color: #fff;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.3);
  }
}
.login {
  span {
    margin: 15px;
  }
}
.login-btn {
  margin-top: 30px;
}
.login-text {
  text-align: center;

  margin-top: 10px;
  .login-t {
    color: #666;
  }
}
</style>
