<template>
  <div class="home">
    <div class="applogo"><div class="logo"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576329751043&di=01e5015ccd73826c1b71a8ebb428f96d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201809%2F22%2F20180922144344_dsdgb.jpeg" alt="" class="auto-img"></div></div>
    <div class="group">
      <van-cell-group>
        <van-field v-model="user" clearable label="用户名" placeholder="输入手机号或者邮箱" left-icon="manager" :error="judge1" @input="validUsername(user)" />

        <van-field v-model="pwd1" :type="eyetype" label="密码" placeholder="请输入密码" left-icon="lock" :right-icon="eye" :error="judge2" @click-right-icon="viewPassword()" />
      </van-cell-group>

      <!-- 登录 -->
      <div class="login">
        <van-button round type="danger" class="login-btn" block @click="loginDL">登录</van-button>
        <span class="fl">忘记密码?</span>
        <span class="fr" @click="onregister({ name: 'register' })">注册</span>
      </div>

      <!-- 其他登录方式 -->
      <div class="Other-login">
        <van-divider :style="{ color: '#B5B5B5', borderColor: '#B5B5B5', padding: '0 16px' }">第三方登录</van-divider>

        <!-- <van-icon class="iconfont" class-prefix='icon' name='微博' style="font-size: 30px;"/> -->
        <van-row justify="center" type="flex">
          <van-col span="8"><van-icon class="iconfont" class-prefix="icon" name="QQ" /></van-col>
          <van-col span="8"><van-icon class="iconfont" class-prefix="icon" name="circle-weibo-copy" /></van-col>
          <van-col span="8"><van-icon class="iconfont" class-prefix="icon" name="weixin" /></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data() {
    return {
      // 用户输入对错
      judge1: false,
      // 密码对错
      judge2: false,
      user: '',
      pwd1: '',
      // 查看密码
      eye: 'eye-o',
      eyetype: 'password'
    };
  },
  methods: {
    validUsername(value) {
      // 验证手机
      var phoneReg = /^1[3-578]\d{9}$/;
      // 验证邮箱
      var mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

      if (mailReg.test(value) || phoneReg.test(value)) {
        this.judge1 = false;
      } else {
        this.judge1 = true;
      }
    },

    loginDL() {
      let randomTime = Math.random() * 5 * 1000;
 this.$toast.loading({
     forbidClick: true,
          duration: randomTime,
          message: '登录中...'
        });
      setTimeout(() => {
        //获取所有用户
        let users = localStorage.getItem('users');

        users = users ? JSON.parse(users) : [];

        if (users.length === 0) {
          this.$toast({
            duration: 2000,
            message: '该用户不存在'
          });

          return;
        }

        //查找用户
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == this.user) {
            //如果该用户存在
            //匹配密码
            if (users[i].pwd == this.pwd1) {
              this.$toast({
                duration: 2000,
                message: '登录成功'
              });

              //跳转到首页
              //记录用户登录状态
              let user = {
                isLogin: true,
                username: this.user
              };

              localStorage.setItem('user', JSON.stringify(user));

              return this.$router.push({ name: 'main' });
            } else {
              this.$toast({
                duration: 2000,
                message: '用户名或者密码不正确'
              });

              return;
            }
          }
        }

        //用户不存在
        this.$toast({
          duration: 2000,
          message: '该用户不存在'
        });
      }, randomTime);
    },

    // 显示密码
    viewPassword() {
      this.eye = this.eye == 'closed-eye' ? 'eye-o' : 'closed-eye';
      this.eyetype = this.eyetype == 'password' ? 'text' : 'password';
    },

    // 跳转
    onregister(o) {
      this.$router.push(o);
    }
  }
};
</script>

<style scoped lang="less">
.home {
}
.group {
  padding: 20px;
}
.applogo {
  height: 200px;
  background: url(../assets/timg.jpg) no-repeat center center;
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
.Other-login {
  margin-top: 190px;
}
.iconfont {
  color: #ddd;
  font-size: 30px;
  text-align: center;
  display: block;
}
</style>
