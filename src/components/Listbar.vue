<template>
  <div class="listbar">
    <router-link to="#">
      <div>{{label}}</div>
      <div class="tips">
        {{title}}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  // 接收来自Person父组件传的data值
  props: ["label", "title"]
};
</script>

<style lang='less' scoped>
.listbar {
  padding-left: 20 / 360 * 100vw;
  height: 48 / 360 * 100vw;
  line-height: 48 / 360 * 100vw;
  a {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    align-items: center;
    padding-right: 20 / 360 * 100vw;
  }
}
</style>