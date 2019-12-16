<template>
  <div class="read_box">
    <van-nav-bar
      left-text="目录"
      :title="menus.list.data.name"
      left-arrow
      @click-left="oncatalog({ name: 'comicCatalogue', query: { catalog: menus.list, sign: menus.url } })"
      @click-right="oncatalog({ name: 'main' })"
    >
      <van-icon name="wap-home" slot="right" size="22px" />
    </van-nav-bar>
    <!-- 内容 -->
    <div class="read_top" >
      <div class="read_q">
        <!-- <p>{{ content.num }}</p> -->

       <div v-for="(item, index) in content.list" :key="index">
         <img :src="item.img" alt="" class="auto-img">
       </div>
        <!-- <p >{{ item }}</p> -->
      </div>
    </div>



    <!-- 分页 -->
    <div class="turning">
      <van-pagination v-model="currentPage" :page-count="menus.list.list.length" mode="simple" @change="paging()" /></div>
  </div>
</template>

<script>
export default {
  name: 'comicRead',
  created() {
    this.$toast.loading({
      duration:0,
             message: '加载中...'
           });
          let self=this;
    this.menus = this.$route.query;
    // console.log(this.menus, '什么');
    if (this.menus.index == null || this.menus.index == undefined) {
      this.currentPage = 1;
    } else {
      this.currentPage = this.menus.index + 1;
    }

    this.ajax(this.menus.list.list[this.currentPage - 1].url).then(result => {
      let data = JSON.parse(result);
      this.content = data;
      self.$toast.clear();
      // console.log(data, 'dsadwqeqw');
    });
  },


  data() {
    return {
      hidden1: true,
      // 传入进来的数据
      menus: '',
      // 第几页
      currentPage: 1,
      // 漫画内容
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
        xhr.open('GET', 'http://api.pingcc.cn/?mhurl2=' + o, true);

        xhr.send(null);
      });
    },

    // 翻页
    paging() {
      console.log('几页', this.currentPage);

      document.getElementsByClassName('read_top')[0].scrollTop = 0;

      this.ajax(this.menus.list.list[this.currentPage - 1].url).then(result => {
        let data = JSON.parse(result);
        this.content = data;

        console.log(data, 'dsadwqeqw');
      });
    },

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

  position: fixed;
  top: 45.6px;
  left: 0;
  right: 0;
  bottom: 40px;
  overflow-y: auto;


  .read_q {
    height: calc(100% - 45.6px - 40px);
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
