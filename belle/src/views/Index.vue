<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item @click="goState({ name: 'main' })">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="icon-test"></van-icon>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item @click="goState({ name: 'bookrack' })">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="shujia"></van-icon>
        <span>书架</span>
      </van-tabbar-item>
      <van-tabbar-item @click="goState({ name: 'circle' })">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="quanzi"></van-icon>
        <span>圈子</span>
      </van-tabbar-item>
      <van-tabbar-item @click="goState({ name: 'mine' })">
        <van-icon class="iconfont" class-prefix="icon" slot="icon" name="wode"></van-icon>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'index',
  created() {
    let router_path = this.$route.path;
  },
  data() {
    return {
      active: 0,
      arr: {
        home_active: 'icon-test',
        home_normal: 'huojian'
      }
    };
  },
  methods: {
    goState(o) {
      this.$router.push(o);
    }
  }
};
</script>

<style scoped></style>
