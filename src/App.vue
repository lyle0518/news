<template>
  <div id="app">
    <!-- <button @click="$toast('弹窗测试')">测试弹窗</button> -->
    <keep-alive include="index,search">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
@import url("../node_modules/vant/lib/index.css");
* {
  margin: 0;
  padding: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
}
ul li,
ol li {
  list-style: none;
}
i,
em {
  font-style: normal;
}
input,
button {
  background: none;
  outline: none;
  border: none;
}
</style>
