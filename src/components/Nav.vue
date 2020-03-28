<template>
  <!-- 顶部导航条 -->
  <div class="nav">
    <!-- 给导航栏添加返回上一页功能 -->
    <span class="iconfont iconjiantou2"></span>
    <strong>{{title}}</strong>
    <span class="iconfont iconshouye" v-if="showHome==true"></span>
    <span v-else class="iconfont iconshouye" style="opacity:0"></span>
  </div>
</template>

<script>
export default {
  props: ["title", "showHome"]
};
</script>

<style scoped lang='less'>
.nav {
  padding: 20/ 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 10 / 360 * 100vw;
  border: 1px solid #eee;
  .iconshouye {
    font-size: 20px;
  }
}
</style>