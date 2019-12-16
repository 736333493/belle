<template>
  <div class="Update-box">
    <!-- 标题 -->
    <van-nav-bar title="分类" left-text="返回" left-arrow  @click-left="reading({name:'main'})" @click-right="reading({name:'grabble'})">
      <van-icon name="search" slot="right" /></van-nav-bar>

    <!--  日期
    <div>
      <van-tabs v-model="active" animated>
        <van-tab v-for="index in 7" :title="'选项 ' + index" :key='index'>内容{{ index }}</van-tab>
      </van-tabs>
    </div> -->
    <div class="UPbox">
      <van-tree-select height="100%" :items="items" :main-active-index.sync="activeIndex">
        <template slot="content">
          <!-- <van-image  src="https://img.yzcdn.cn/vant/apple-1.jpg" /> -->
          <div v-if="activeIndex === 0">
            <van-grid :border="false" :column-num="2" v-for="(item, index) in categorical_m" :key="index">
              <van-grid-item v-for="(a, b) in item" :key="b">
                <div @click="reading({ name: 'particular', query: { url: a.url, tag: a.tag } })">
                <van-image :src="a.cover" />
                <span>{{ a.name }}</span>
                </div>
              </van-grid-item>
            </van-grid>
          </div>
          <div v-if="activeIndex === 1">
            <van-grid :border="false" :column-num="2" v-for="(item, index) in categorical_w" :key="index">
              <van-grid-item v-for="(a, b) in item" :key="b">
                <div @click="reading({ name: 'particular', query: { url: a.url, tag: a.tag } })">
                  <van-image :src="a.cover" />
                  <span>{{ a.name }}</span>
                </div>
              </van-grid-item>
            </van-grid>
          </div>
          <van-image v-if="activeIndex === 1" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
        </template>
      </van-tree-select>
    </div>
  </div>
</template>
<!-- /book: -->
<script>
export default {
  name: 'update',
  data() {
    return {
      activeIndex: 0,
      items: [{ text: '男频' }, { text: '女频' }],
      active: 0,
      classify: '',
      // 男频
      male: ['战', '兵', '仙', '玄', '师'],
      categorical_m: [],
      categorical_w: [],
      woman: [
       '妻',
       '女友',
       '校花',
        '总裁',
        '娘子',
        '妃',
        '簪中录',
        '每天都在征服情敌',
        '吾欲成凰',
        '分'
      ]
    };
  },
  mounted() {
    this.$toast.loading({
             message: '加载中...',
             duration:0,
           });
          let self=this;
    // 女频
    for (let i = 0; i < this.woman.length; i++) {
      this.ajax(this.woman[i]).then(result => {
        let data1 = JSON.parse(result);

        if (data1.message == '成功!' && data1.list.length % 2 == 0) {
          this.categorical_w.push(data1.list);
        }

        //  orical_w, 'dsadwqeqw', data);
      });
    }
    // 男频
    for (let i = 0; i < this.male.length; i++) {
      this.ajax(this.male[i]).then(result => {
        let data2 = JSON.parse(result);

        if (data2.message == '成功!' && data2.list.length % 2 == 0) {
          this.categorical_m.push(data2.list);
        }
self.$toast.clear();
        //  orical, 'dsadwqeqw', data);
      });
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
        xhr.open('GET', 'http://api.pingcc.cn/?xsname=' + o, true);

        xhr.send(null);
      });
    },
    reading(o) {
      this.$router.push(o);
    }
  }
};
</script>

<style scoped lang="less">
.UPbox {
  position: absolute;
  top: 45.6px;
  left: 0;
  right: 0;
  height: calc(100% - 45.6px - 50px);
  overflow-y: auto;
}
.select {
  height: calc(100% - 50px - 45.6px);
}
</style>
