<template>
  <div class="container">
    <div class="header">
      <!-- 头像 -->
      <div class="img">
        <img src="https://www.baidu.com/img/bd_logo1.png" alt />
      </div>
      <!-- 姓名 -->
      <div class="profile">
        <div class="avatar">
          <span class="iconfont iconxingbienan"></span>
          广州新闻
        </div>
        <p>2020-03-27</p>
      </div>
      <!-- 右侧箭头 -->
      <span class="iconfont iconjiantou1"></span>
    </div>
    <!-- 列表按钮-->
    <Listbar></Listbar>
    <Listbar></Listbar>
    <Listbar></Listbar>
  </div>
</template>

<script>
import Listbar from "@/components/Listbar";
export default {
  // 注册组件Listbar
  components: {
    Listbar
  },
  mounted() {}
};
</script>

<style scoped lang='less'>
.header {
  padding: 20 / 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #eee solid;
}
.img img {
  display: block;
  width: 70 / 360 * 100vw;
  height: 70 / 360 * 100vw;
  border-radius: 50%;
  object-fit: contain; //处理失真问题
}
.profile {
  flex: 1; //沾满剩下的空间
  padding-left: 20 / 360 * 100vw;
  p {
    color: #999;
  }
}
</style>