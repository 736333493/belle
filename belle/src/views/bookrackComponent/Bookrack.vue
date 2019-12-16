<template>
  <div class="bookrack_box">
    <van-nav-bar title="书架"></van-nav-bar>

    <van-tabs animated :swipe-threshold="a">
      <van-tab title="收藏">
        <div class="clearfix">
          <div class="fr toggle">
            <div class="toggle-content">
              <div class="fl active">全部</div>
              <div class="fl">更新</div>
            </div>
          </div>
        </div>
        <!-- 收藏文件 -->
        <div class="house-documents">
          <van-grid :column-num="3" :border="false">
            <van-grid-item v-for="(item, index) in likefiction[user]" :key="index">
              <div @click="goState({ name: 'particular', query: { url: item.url.url, tag: item.url.tag } })">
                <div class="img-collect"><img :src="item.data.cover" alt="" class="auto-img" /></div>
                <span class="recommend-txte">{{ item.data.name }}</span>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </van-tab>

      <van-tab title="历史">
        <div class="history-height">
          <!-- <div style="position: absolute; top: 200px;"> -->
          <div v-for="(item, index) in fictionHistoryData" :key="index" class="clearfix history-center">
            <div class="img-history fl"><img :src="item.list.data.cover" alt="" class="auto-img" /></div>

            <div class="fr history-list">
              <div class="list-name">{{ item.list.data.name }}</div>
              <div>{{ item.list.data.author }}</div>
              <div>{{ item.list.data.status }}</div>
              <div>{{ item.list.data.time }}</div>

              <div class="fr" @click="goState({ name: 'read', query: { list: item.list, index: item.index, url: item.url } })"><van-tag mark type="warning">继续观看</van-tag></div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="下载"></van-tab>
      <van-tab disabled></van-tab>
      <van-tab disabled></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'bookrack',
  data() {
    return {
      arr: '',
      value: '0',
      a: 5,
      // 收藏的小说内容
      likefiction: '',
      // 用户id
      user: '',
      // 历史数据
      fictionHistoryData:''
    };
  },
  created() {
    this.$toast.loading({
      duration:0,
      message: '加载中...'
    });
    let self = this;
    // 获取用户名
    let userStatus = localStorage.getItem('user');
    userStatus = JSON.parse(userStatus);
    this.user = userStatus.username;
    //获取用户收藏的小说
    let likefictionData = localStorage.getItem('likefictionData');
    likefictionData = likefictionData ? JSON.parse(likefictionData) : {};
    this.likefiction = likefictionData;


// 用户历史记录
     let fictionHistory = localStorage.getItem('fictionHistory');
    fictionHistory = fictionHistory ? JSON.parse(fictionHistory) : [];
    this.fictionHistoryData = fictionHistory;
    

    self.$toast.clear();
  },
  methods: {

    goState(o) {
      this.$router.push(o);
    }
  }
};
</script>

<style scoped lang="less">
.bookrack_box {
}
// 收藏
.toggle {
  margin-right: 10px;
  height: 25px;
  position: static;
  .toggle-content {
    width: 80px;
    margin: 0 auto;
    background-color: #f9f9fb;
    text-align: center;
    border-radius: 12px;
    overflow: hidden;
    line-height: 15px;
    margin-top: 8px;
    font-size: 10px;
    > div {
      width: 40px;
      height: 15px;
      color: #8798af;
      &.active {
        background-color: yellow;
        color: #1d2736;
      }
    }
  }
}
.house-documents {
  height: calc(100% - 45.6px - 44px - 50px);
  overflow-y: auto;
}
.img-collect {
  > img {
    border-radius: 10px;
  }
}

// 历史
.van-tabs {
  position: static;
}
.history-height {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 45.6px - 44px - 50px);
  overflow-y: auto;
}

.history-center {
  height: 110px;
  padding: 10px 10px 5px 10px;
}
.img-history {
  width: 80px;
  > img {
    max-height: 110px;
    border-radius: 5px;
  }
}

.history-list {
  font-size: 10px;
  width: calc(100% - 80px - 10px);
  // height: 100px;
  background: #f5f5f5;
  padding: 5px;
  margin-top: 10px;

  > div {
    color: #999999;
    margin-top: 2px;
  }
  .list-name {
    color: #2c2c2c;
    font-size: 14px;
  }
}
</style>
