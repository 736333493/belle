<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
body,html{
  height: 100%;
  background: #fff;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.auto-img{
  display: block;
  margin: 0 auto;
  width: 100%;
}
.clearfix::after{
  display: block;
  content: '';
  clear: both;
}
.one-text{
  white-space: nowrap;
  overflow: hidden;
 text-overflow: ellipsis;
}
.two-tetx{
  overflow:hidden;

  text-overflow:ellipsis;

  display:-webkit-box;

  -webkit-box-orient:vertical;

  -webkit-line-clamp:2;
}
</style>
