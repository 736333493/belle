<template>
  <div class="mine_box">
    <div class="mine_compile">
      <!-- <van-nav-bar right-text="编辑" >
  <van-icon name="setting-o" slot="left" />
</van-nav-bar> -->
      <div class="clearfix compile_nav">
        <div class="fl"><van-icon name="setting-o" slot="left" /></div>
        <div class="fr">编辑</div>
      </div>
      <div class="mine_head clearfix">
        <div class="head_image fl">
          <img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575972098179&di=18fa14185207660193d02ac8f12350cb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201612%2F13%2F20161213181427_yR5Zm.jpeg"
            alt=""
            class="auto-img"
          />
        </div>

        <div class="reading_time fl">
          <div class="name">陈康伟</div>
          <span>累计读0小时</span>
          <i
            style="width: 1px;
  height: 10px;
  background: #000000;
  display: inline-block;
  margin: 0 5px 0 5px;"
          ></i>
          <span>今日阅读0分钟</span>
        </div>
      </div>
    </div>

    <div>
      <div class="collapse clearfix" v-for="(item, index) in tagName" :key="index">
        <div class="fl">
          <div class="i"><van-icon :name="item.icon" size="25" color="#A0A0A0" /></div>

          <div class="fl">{{ item.name }}</div>
        </div>
        <div class="fr right_i"><van-icon name="arrow" size="30" color="#6F6F6F" /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine',

  data() {
    return {
      tagName: [
        { name: '我的消息', icon: 'chat-o' },
        { name: '账号', icon: 'manager-o' },
        { name: '阅读记录', icon: 'notes-o' },
        { name: '月卡', icon: 'gem-o' },
        { name: '好友', icon: 'friends-o' },
        { name: '帮助与反馈', icon: 'service-o' }
      ]
    };
  }
};
</script>

<style scoped="" lang="less">
.mine_compile {
  background: url(../../assets/timg.jpg) no-repeat center center;
}
.compile_nav {
  height: 40px;
  > div {
    font-size: 14px;
    margin: 10px;
    color: #848484;
  }
}
.mine_head {
  padding: 20px;
}
.head_image {
  width: 60px;
  height: 60px;
  overflow: hidden;

  > img {
    border-radius: 50%;
  }
}
.reading_time {
  margin: 5px 5px;
  > span {
    color: #6d6c6b;
  }
}
.van-nav-bar {
  background: orange;
}
.van-hairline--bottom::after {
  border: none;
}
.name {
  padding: 5px;
  font-size: 16px;
  font-weight: 550;
}
.collapse {
  box-shadow: -1px 2px 5px #e5e5e5;
  border-radius: 5px;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  padding: 2px;
  margin: 10px 5px 20px;
  .i {
    float: left;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 5px;
  }
  .right_i {
    margin-top: 2px;
  }
}
</style>
