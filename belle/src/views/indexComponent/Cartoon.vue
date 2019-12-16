<template>
  <div class="cartoon_box">
    <van-nav-bar title="漫画" left-text="返回" left-arrow @click-left="reading({name:'main'})" @click-right="reading({name:'comicSearch'})">
      <van-icon name="search" slot="right" />
      </van-nav-bar>


    <van-grid :border="false" :column-num="3" v-for="(item, index) in cartoonContent" :key="index">
      <van-grid-item v-for="(a, b) in item" :key="b">
        <div @click="reading({ name: 'comicMinute', query: { url: a.url, tag: a.tag } })">
          <van-image :src="a.cover" />
          <span>{{ a.name }}</span>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'cartoon',


  created() {
    this.$toast.loading({
      duration:0,
             message: '加载中...'
           });
          let self=this;
      for (let i = 0; i < this.cartoonDtat.length; i++) {
          this.ajax(this.cartoonDtat[i]).then(result => {
            let data1 = JSON.parse(result);

            if (data1.message == '成功!' && data1.list.length % 3 == 0) {
              this.cartoonContent.push(data1.list);
              self.$toast.clear();
            }

             
          });
        }
  },
data(){
  return{
cartoonDtat:['神',],
    cartoonContent:[],
  }
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
        xhr.open('GET', 'http://api.pingcc.cn/?mhname=' + o, true);

        xhr.send(null);
      });
    },
    reading(o) {
      this.$router.push(o);
    }
  }
};
</script>

<style scoped="" lang="less"></style>
