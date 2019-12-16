<template>
  <div class="particular_box">
    <div>
      <van-nav-bar title="书籍详细" left-text="搜索" left-arrow @click-left="reading({ name: 'grabble' })" @click-right="reading({ name: 'main' })">
        <van-icon name="wap-home" slot="right" size="22px" />
      </van-nav-bar>
    </div>
    <div class="clearfix particular_head">
      <div class="clearfix">
        <div class="fl particular_img"><img :src="minute_datum.data.cover" alt="" class="auto-img" /></div>
        <div class="fl particular_name">
          <div class="title">{{ minute_datum.data.name }}</div>
          <div class="author">作者：{{ minute_datum.data.author }}</div>
          <div class="words">更新时间：{{ minute_datum.data.time }}</div>
          <div class="state">{{ minute_datum.data.status }}</div>
          <div class="title_tag">
            <van-tag plain>{{ url.tag }}</van-tag>
          </div>
        </div>
      </div>
      <div class="quantity">
        <van-row type="flex" justify="center">
          <van-col span="6">
            <span>{{ count[0] }}</span>
            <span class="ten">万+</span>
            <div class="bookscollect">收藏</div>
          </van-col>
          <van-col span="6">
            <span>{{ count[1] }}</span>
            <span class="ten">万+</span>
            <div class="bookscollect">读过</div>
          </van-col>
          <van-col span="6">
            <span>{{ count[2] }}</span>
            <span class="ten">万+</span>
            <div class="bookscollect">在读</div>
          </van-col>
        </van-row>
      </div>
      <div class="intro two-tetx">{{ minute_datum.data.introduce }}</div>
      <div class="clearfix viewDirectory" @click="reading({ name: 'comicCatalogue', query: { catalog: minute_datum, sign: url.url } })">
        <div class="fl">查看目录</div>
        <span class="fr"><van-icon name="arrow" /></span>
      </div>
    </div>
    <!-- <div class="like">
      <van-grid>
        <van-grid-item v-for="(a, c) in lick" :key="c">
          <van-image :src="a.cover" />
          <span style="height: 35px;">{{ a.name }}</span>
        </van-grid-item>
      </van-grid>
    </div> -->
    <div class="present">
      <button class="for_collection">加入收藏</button>
      <button class="Free_Reading" @click="reading({ name: 'comicCatalogue', query: { catalog: minute_datum, sign: url.url } })">免费阅读全文</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comicMinute',
  created() {
    this.$toast.loading({
      duration: 0,
      message: '加载中...'
    });
    let self = this;
    this.url = this.$route.query;
    

    this.ajax(this.url.url).then(result => {
      let data = JSON.parse(result);
      this.minute_datum = data;
      this.minute_datum.url = this.url;
      self.$toast.clear();
      
    });
  },
  mounted() {
    this.randomNumber();
  },
  data() {
    return {
      // 获取数据
      minute_datum: '',
      // 传入数据
      url: '',
      // 阅读量
      count: []
    };
  },
  methods: {
    // 随机数
    randomNumber() {
      for (var i = 0; i < 3; i++) {
        this.count.push(parseInt(Math.random() * 400 + 1, 10));
      }

      
    },
    // 获取数据
    ajax(o) {
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
        xhr.open('GET', 'http://api.pingcc.cn/?mhurl1=' + o, true);

        xhr.send(null);
      });
    },

    reading(o) {
      this.$router.push(o);
    }
    // 收藏
    //   forCollection() {
    //     let userStatus = localStorage.getItem('user');
    //     console.log('aaaaaa', JSON.parse(userStatus));
    //     if (userStatus) {
    //       userStatus = JSON.parse(userStatus);
    //       console.log('weeeeee');
    //       if (!userStatus.isLogin) {
    //         console.log('请先登录');
    //         return this.$router.push({ name: 'home' });
    //       }
    //       //获取用户收藏的小说
    //       let likefictionData = localStorage.getItem('likefictionData');
    //       likefictionData = likefictionData ? JSON.parse(likefictionData) : {};

    //       //记录当前用户收藏的小说
    //       let currentLikefictionData = likefictionData[userStatus.username];

    //       if (!currentLikefictionData) {
    //         likefictionData[userStatus.username] = [];
    //       }

    //       //收藏小说之前，根据小说的id判断是否已经收藏过该小说
    //       for (let i = 0; i < likefictionData[userStatus.username].length; i++) {
    //         if (
    //           likefictionData[userStatus.username][i].data.name == this.minute_datum.data.name &&
    //           likefictionData[userStatus.username][i].data.author == this.minute_datum.data.author
    //         ) {
    //           //提示用户
    //           this.$toast('你已经收藏过该小说');
    //           return;
    //         }
    //       }

    //       // this.$store.commit('movieDetailModule/changelikeActive', true);

    //       //将小说推进likefictionData[userStatus.username]
    //       likefictionData[userStatus.username].unshift(this.minute_datum);

    //       console.log('likefictionData ==> ', likefictionData);

    //       localStorage.setItem('likefictionData', JSON.stringify(likefictionData));

    //       this.$toast.success('收藏成功');
    //     } else {
    //       this.$toast.fail({
    //         message: '请先登录'
    //       });
    //       console.log('请先登录');
    //       // this.$router.push({ name: 'home' });
    //     }
    //   }
  }
};
</script>

<style scoped="" lang="less">
.like {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
}

.particular_head {
  padding: 10px;
}

.particular_img {
  width: 110px;
  margin-right: 15px;
}
.particular_name {
  margin-top: 20px;
  > div {
    margin-bottom: 5px;
  }
  .title {
    font-size: 16px;
    font-weight: 550;
  }
  .author {
    color: #8a8685;
  }
  .words {
    color: #c5c5c5;
  }
  .state {
    color: #f4cebc;
  }
}
.quantity {
  margin: 10px 0 10px;
  text-align: center;
  span {
    font-weight: 600;
  }
  .bookscollect {
    font-size: 10px;
    color: #cbcbcb;
  }
  .ten {
    color: #959595;
    font-weight: 400;
  }
}
.intro {
  color: #716c6c;
  margin-bottom: 20px;
  margin-top: 20px;
}
.present {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 14px;
  .for_collection {
    border: none;
    height: 50px;
    width: 100px;
    background: #fff;
  }
  .Free_Reading {
    border: none;
    height: 50px;
    width: calc(100% - 100px);
    background: #e5220e;
    color: #fff;
  }
}
.viewDirectory {
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  > span {
    padding-top: 3px;
  }
}
</style>
