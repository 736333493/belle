<template>
  <div class="circle_box">
    <van-swipe @change="onChange">
      <van-swipe-item v-for="(item, index) in arr.list" :key="index">
        <div class="good_book" @click="reading({ name: 'particular', query: { url: item.url, tag: item.tag } })">
          <div class="reading"><span>共读好书</span></div>

          <div class="w-img"><img :src="item.cover" alt="" class="auto-img" /></div>
          <div class="books_text">
            <div>
              <span>{{ item.name }}</span>
            </div>
            <div class="synopsis two-tetx">{{ item.introduce }}</div>
            <div>
              <span>{{ count[index] }}人喜欢这书</span>
            </div>
          </div>
        </div>
      </van-swipe-item>

      <div class="custom-indicator location" slot="indicator">{{ current + 1 }}/{{ arr.list.length }}</div>
    </van-swipe>
  </div>
</template>

<script>
export default {
  created() {
    this.$toast.loading({
             message: '加载中...',
             duration:0,
           });
    let self=this;
    this.ajax(parseInt(Math.random() * 10 + 1, 10)).then(result => {
      let data = JSON.parse(result);
      this.arr = data;
          self.$toast.clear();
    });
  },
  mounted() {
    this.randomNumber();
  },
  data() {
    return {
      arr: '',
      current: 0,
      // 随机数
      count: []
    };
  },
  methods: {
    reading(o) {
      this.$router.push(o);
    },
    onChange(index) {
      this.current = index;
    },
    randomNumber() {
      for (var i = 0; i < 10; i++) {
        this.count.push(parseInt(Math.random() * 10000 + 1, 10));
      }

       
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
        xhr.open('GET', 'http://api.pingcc.cn/?xsname=' + o, true);

        xhr.send(null);
      });
    }
  }
};
</script>

<style scoped lang="less">
.circle_box {
  background: #f5f5f5;
  height: 617px;
}
.good_book {
  margin: 100px 50px 50px;
  background: #fff;
  width: 270px;
  .reading {
    font-size: 20px;
    padding: 15px;
  }
}
.w-img {
  margin: 0 50px 0 50px;
}
.books_text {
  text-align: center;
  padding: 10px;
  > div {
    margin-top: 8px;
  }
  .synopsis {
    color: #999;
  }
}
.location {
  position: absolute;
  top: 50px;
  left: 50%;
  font-size: 16px;
  transform: translate(-50%, -50%);
}
</style>
