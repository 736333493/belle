<template>
  <div class="catalogue_box">
    <div class="catalogue_head">
      <van-nav-bar title="目录" left-text="返回" left-arrow @click-left="onSearch({name:'comicMinute', query: { url: list.sign } })" @click-right="onSearch({ name: 'main' })">
        <van-icon name="wap-home" slot="right" size="22px" />
      </van-nav-bar>
    </div>
    <div class="slip">
      <div class="slip_q">
        <div
          class="clearfix catalogue_lixt"
          v-for="(item, index) in list.catalog.list"
          :key="index"
          @click="onSearch({ name: 'comicRead', query: { list: list.catalog, index: index, url: list.sign } })"
        >
          <div class="fl">{{ item.num }}</div>
          <span class="fr"><van-icon name="arrow" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comicCatalogue',
  data() {
    return {
      list: ''
    };
  },
  created() {
    this.list = this.$route.query;
    
  },
  methods: {
    onSearch(o) {
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
.catalogue_head {
  position: sticky;
  top: 0;
}
.slip {
  padding: 15px;
  position: fixed;
  top: 45.6px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
.slip_q {
  height: calc(100% - 45.6px);
}
.catalogue_lixt {
  height: 40px;
  line-height: 40px;
  margin-bottom: 5px;
  font-size: 14px;
}
</style>
