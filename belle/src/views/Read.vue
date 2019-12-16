<template>
  <div class="read_box">
    <van-nav-bar
      left-text="目录"
      :title="menus.list.data.name"
      left-arrow
      @click-left="oncatalog({ name: 'catalogue', query: { catalog: menus.list, sign: menus.url } })"
      @click-right="oncatalog({ name: 'main' })"
    >
      <van-icon name="wap-home" slot="right" size="22px" />
    </van-nav-bar>
    <!-- 内容 -->
    <div class="read_top" @click="show">
      <div class="read_q">
        <p>{{ content.num }}</p>
        <p v-for="(item, index) in content.content" :key="index">{{ item }}</p>
      </div>
    </div>

    <!-- 设置 -->
    <div class="setting" :class="{ hidden: hidden1 }">
      <div class="font_size clearfix">
        <div @click="add">A+</div>
        <div class="night fl" @click="day1"><van-icon class="iconfont" class-prefix="icon" slot="icon" :name="day"></van-icon></div>
        <!-- taiyang -->
        <div @click="reduce">A-</div>
      </div>
      <div class="bgcolor clearfix">
        <ul>
          <li @click="bg('#DBCCA8')"><span></span></li>
          <li @click="bg('#CAD9E8')"><span></span></li>
          <li @click="bg('#D1EDD1')"><span></span></li>
          <li @click="bg('#E6E6E6')"><span></span></li>
        </ul>
      </div>
    </div>
    <!-- 分页 -->
    <div class="turning">
      <van-pagination v-model="currentPage" :page-count="menus.list.list.length" mode="simple" @change="paging()" /></div>
  </div>
</template>

<script>
export default {
  name: 'particular',
  created() {

    this.menus = this.$route.query;
    
    if (this.menus.index == null || this.menus.index == undefined) {
      this.currentPage = 1;
    } else {
      this.currentPage = this.menus.index + 1;
    }

    this.ajax(this.menus.list.list[this.currentPage - 1].url).then(result => {
      let data = JSON.parse(result);
      this.content = data;
      

    });
  },

// 离开守卫添加历史记录
  beforeRouteLeave(to, from, next) {
    next(true);

    //获取用户历史记录
    let fictionHistory = localStorage.getItem('fictionHistory');
    fictionHistory = fictionHistory ? JSON.parse(fictionHistory) : [];
    
    //记录当前用户历史记录
    let currentLikefictionData = fictionHistory;

    if (!currentLikefictionData) {
      fictionHistory = [];
    }

    // //历史小说之前，根据小说的id判断是否已经读过过该小说
    for (let i = 0; i < fictionHistory.length; i++) {
      if (fictionHistory[i].url == this.menus.url) {
        fictionHistory.splice(i, 1);
      }
    }
    // this.$store.commit('movieDetailModule/changelikeActive', true);
    this.menus.index = this.currentPage - 1;
    //将小说推进fictionHistory
    fictionHistory.unshift(this.menus);
    localStorage.setItem('fictionHistory', JSON.stringify(fictionHistory));
  },

  // catalog: Object
  // sign: "https://www.xsbiquge.com/89_89688/"
  data() {
    return {
      hidden1: true,
      // 传入进来的数据
      menus: '',
      // 第几页
      currentPage: 1,
      // 小说内容
      content: '',

      size: 16,
      day: 'yueliang'
    };
  },
  methods: {
    // 获取数据
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
        xhr.open('GET', 'http://api.pingcc.cn/?xsurl2=' + o, true);

        xhr.send(null);
      });
    },
    // 日夜
    day1() {
      if (this.day == 'taiyang') {
        document.getElementsByClassName('read_top')[0].style.background = '#C4B395';
        document.getElementsByClassName('read_top')[0].style.color = '#1E1B17';
        this.day = 'yueliang';
      } else {
        document.getElementsByClassName('read_top')[0].style.background = '#1A1A1A';
        document.getElementsByClassName('read_top')[0].style.color = '#8D8D8D';
        this.day = 'taiyang';
      }
    },

    show() {
      this.hidden1 = this.hidden1 = !this.hidden1;
    },
    // 修改字的大小
    add() {
      this.size += 2;
      document.getElementsByClassName('read_top')[0].style.fontSize = this.size + 'px';
    },
    reduce() {
      this.size -= 2;
      document.getElementsByClassName('read_top')[0].style.fontSize = this.size + 'px';
    },
    // 翻页
    paging() {


      document.getElementsByClassName('read_top')[0].scrollTop = 0;

      this.ajax(this.menus.list.list[this.currentPage - 1].url).then(result => {
        let data = JSON.parse(result);
        this.content = data;


      });
    },
    // 改背景颜色
    bg(a) {
      document.getElementsByClassName('read_top')[0].style.background = a;
      document.getElementsByClassName('read_top')[0].style.color = '#1E1B17';
    },

    // 历史记录
    history() {},
    oncatalog(o) {
      this.$router.push(o);
    }
  }
};
</script>

<style scoped="" lang="less">
body,
head {
  height: 100%;
}
.hidden {
  display: none;
}
.read_top {
  font-size: 14px;
  padding: 10px 20px;
  position: fixed;
  top: 45.6px;
  left: 0;
  right: 0;
  bottom: 40px;
  overflow-y: auto;
  background: #c4b395;
  color: #1e1b17;
  .read_q {
    height: calc(100% - 45.6px - 40px);
  }
}
.setting {
  position: fixed;
  bottom: 1.06666rem;
  left: 0;
  right: 0;
  color: #fff;
  background: #13110e;
  .font_size {
    width: 100%;
    height: 40px;
    line-height: 40px;
    > div {
      float: left;
      width: 40%;
      font-size: 16px;
      text-align: center;
      background: #352c1e;
      border: 2px solid #999;
    }
    .night {
      width: 17%;
      border: none;
      background: #000000;
    }
  }
}
.bgcolor {
  margin: 30px 0;
  > ul {
    > li {
      float: left;
      width: calc(100% / 5);
      margin-left: 4%;
      height: 30px;
      border-radius: 20px;
      background: #e6e6e6;
      &:nth-child(1) {
        background: #dbcca8;
      }
      &:nth-child(2) {
        background: #cad9e8;
      }
      &:nth-child(3) {
        background: #d1edd1;
      }
    }
  }
}

// 翻页
.turning {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
