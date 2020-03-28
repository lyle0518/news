<template>
  <div>
    <!-- 导航栏 -->
    <Nav title="编辑信息"></Nav>
    <!-- 头像 -->
    <div class="userImg">
      <img src="https://game.gtimg.cn/images/lol/act/img/champion/TwistedFate.png" alt />
    </div>
    <Listbar label="昵称" tips="火星网友"></Listbar>
    <Listbar label="密码" tips="******"></Listbar>
    <Listbar label="性别" tips="男"></Listbar>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
// 引入LIstbar按钮组件
import Listbar from "@/components/Listbar";
export default {
  components: {
    Listbar,
    Nav
  }
};
</script>

<style scoped lang='less'>
.userImg {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 70 /360 * 100vw;
    height: 70 /360 * 100vw;
    margin: 20px 0;
    border-radius: 50%;
  }
}
</style>