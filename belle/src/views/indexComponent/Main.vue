<template>
  <div class="Main-box">
    <div style="position: sticky; top: 0; z-index: 10;">
      <div>
        <div class="seek" @click="onSearch({ name: 'grabble' })"><img src="../../assets/seek.png" alt="" class="auto-img" /></div>
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <div class="w-img"><img src="https://i1.3conline.com/images/piclib/201203/14/batch/1/129579/1331657706932npmcbf6o7x.jpg" alt="" class="auto-img" /></div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="w-img">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575801022667&di=dc3b46d59f9e443dc9be3e2cd6d3d2f0&imgtype=0&src=http%3A%2F%2Fi1.3conline.com%2Fimages%2Fpiclib%2F201203%2F14%2Fbatch%2F1%2F129579%2F1331657706932slwzd661o1.jpg"
                alt=""
                class="auto-img"
              />
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="w-img">
              <img
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575801022663&di=054a2219c06779d85132abf26d1fd51d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F5854d1013ea13.jpg"
                alt=""
                class="auto-img"
              />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 选项卡 -->
      <div class="tabbar">
        <van-grid :border="false">
          <van-grid-item>
            <!-- <van-icon class="iconfont" class-prefix="icon" name="huojian" /> -->
            <div style="width: 60px; height: 60px;"><img src="../../assets/2.png" alt="" class="auto-img" /></div>

            <span>更新</span>
          </van-grid-item>
          <van-grid-item>
            <!-- <van-icon class="iconfont" class-prefix="icon" name="jiangpai1" style="color: #0077AA;" /> -->
            <div style="width: 60px; height: 60px;"><img src="../../assets/1.png" alt="" class="auto-img" /></div>
            <span>精选</span>
          </van-grid-item>
          <van-grid-item @click="onSearch({ name: 'cartoon' })">
            <!-- <van-icon class="iconfont" class-prefix="icon" name="jiangpai1" /> -->
            <div style="width:70px; height: 60px;"><img src="../../assets/3.png" alt="" class="auto-img" /></div>
            <span>漫画</span>
          </van-grid-item>
          <van-grid-item @click="onSearch({ name: 'update' })">
            <!-- <van-icon class="iconfont" class-prefix="icon" name="jiangpai1" /> -->
            <div style="width: 60px; height: 60px;"><img src="../../assets/4.png" alt="" class="auto-img" /></div>
            <span>分类</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 观看历史  http://img.manhua.weibo.com/cover/2019/08/29/6385000576_KHw3sKz5_b.png-->
    <div class="headline">
      <div class="headline-nav"><span>推荐</span></div>
    </div>

    <div class="recommend">
      <van-grid :column-num="3">
        <van-grid-item v-for="(item, index) in arr.list" :key="index" @click="onSearch({ name: 'particular', query: { url: item.url, tag: item.tag } })">
          <div><img :src="item.cover" alt="" class="auto-img" /></div>
          <span class="recommend-txte ">{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      value: '',
      active: '',
      // 首页数据
      arr: ''
    };
  },
  created() {
    this.$toast.loading({
      duration: 0,
      message: '加载中...'
    });
    let self = this;

    this.ajax(parseInt(Math.random() * 10 + 1, 10)).then(result => {
      let data = JSON.parse(result);
      this.arr = data;
      self.$toast.clear();
    });
  },
  methods: {
    ajax(o) {
      // url: 'http://api.kangliuyong.com:9002/pros?count=10',
      return new Promise((resolve, reject) => {
        //创建ajax对象
        let xhr = new XMLHttpRequest();

        //监听ajax状态码变化
        xhr.onreadystatechange = function() {
          //this.response: 服务器响应数据
          if (this.readyState === 4 && this.status === 200) {
            resolve(this.response);
          }
        };

        //建立服务器连接
        xhr.open('GET', 'http://api.pingcc.cn/?xsname=' + o, true);

        xhr.send(null);
      });
    },

    onSearch(o) {
      this.$router.push(o);
    }
  }
};
</script>

<style scoped lang="less">
body,
html {
  height: 100%;
}
.w-img {
  width: 100%;
  height: 100%;
}
.seek {
  width: 25px;
  height: 25px;
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;
}
.headline {
  font-size: 14px;
  padding: 5px;
  background: #f5f5f5;
}

.recommend {
  position: absolute;
  width: 100%;
  height: calc(100% - 234.5px - 108px - 29.2px - 50.03px);
  overflow-y: auto;
}
</style>
