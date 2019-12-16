<template>
  <div class="Grabble_box">
    <div class="clearfix seek">
      <div class="fl seek_return" @click="goState({name: 'cartoon'})"><van-icon name="arrow-left" size="22px" /></div>
      <input type="text" class="fl input_text" v-model="value" placeholder="输入漫画名称"/>
      <div class="fr seek_hunt" @click="onSearch">搜索</div>
    </div>
    <div class="hot_word" :class="{ show: judge }">
      <p>搜索热词</p>
      <van-row v-for="(item, index) in trending" :key="index">
        <van-col span="6" v-for="(it, xy) in item" :key="xy">
          <van-tag round>{{ it }}</van-tag>
        </van-col>
      </van-row>
    </div>
    <div class="slide">
      <div style="height: 100%;">
        <div
          v-for="(tank, exponent) in datum.list"
          :key="exponent"
          class="clearfix history-center"
          @click="goState({ name: 'comicMinute', query: { url: tank.url, tag: tank.tag } })"
        >
          <div class="img-history fl"><img :src="tank.cover" alt="" class="auto-img" /></div>

          <div class="fr history-list">
            <div class="list-name">{{ tank.name }}</div>
            <div>作者：{{ tank.author }}</div>
            <div>类型：{{ tank.tag }}</div>
            <div class="two-tetx">{{ tank.status }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comicSearch',
  data() {
    return {
      value: '',
      trending: [['重生', '快穿', '火影', '末世'], ['言情', '都市', '文字', '网游']],
      datum: '',
      judge: false
    };
  },
  methods: {
    goState(o) {
      this.$router.push(o);
    },
    onSearch(o) {
      this.$toast.loading({
        message: '加载中...',
        duration:0
      });
      let self = this;
      this.ajax(this.value).then(result => {
        let data = JSON.parse(result);
        this.datum = data;
              if (data.message == '成功!') {
          self.$toast.clear();
        } else {
          this.$toast.fail({
            message: '未获取到相关数据!'
          });
        }
      });

      this.judge = true;
    },
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
        xhr.open('GET', 'http://api.pingcc.cn/?mhname=' + o, true);

        xhr.send(null);
      });
    }
  }
};
</script>

<style scoped="" lang="less">
body,
html {
  height: 100%;
}
.seek {
  position: sticky;
  top: 0;
  margin-top: 12px;
  font-size: 14px;
  height: 30px;
  width: 100%;
  line-height: 30px;
  .seek_return {
    padding-top: 5px;
    width: 30px;
    text-align: center;
  }
  .input_text {
    width: calc(100% - 30px - 50px);
    border: none;
    background: #f7f8fa;
    padding-left: 10px;
    border-radius: 10px;
    height: 100%;
  }
  .seek_hunt {
    width: 35px;
    text-align: center;
  }
}

.hot_word {
  text-align: center;
  font-size: 14px;
}
.history-center {
  height: 110px;
  padding: 10px 10px 5px 10px;
}
.slide {
  position: absolute;
  top: 42px;
  left: 0;

  height: calc(100% - 42px);
  overflow-y: auto;
}
.img-history {
  width: 80px;
  > img {
    max-height: 110px;
    border-radius: 5px;
  }
}
.show {
  display: none;
}
.history-list {
  font-size: 10px;
  width: calc(100% - 80px - 10px);
  // height: 100px;
  background: #ffffff;
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
