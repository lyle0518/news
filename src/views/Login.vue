<template>
  <div class="box">
    <div class="head"></div>
    <div class="logo">
      <span class="iconfont iconnew iconlogo"></span>
      <span class="iconfont iconicon-test test"></span>
    </div>
    <form>
      <input type="text" placeholder="用户名/手机号码" />
      <input type="text" placeholder="昵称" />
      <input type="password" name="password" id placeholder="密码" />
      <button>登录</button>
    </form>
  </div>
</template>

<script>
</script>

<style>
@media screen and (width: 750px) {
  /* 把750分成10份，每一份是75，就让75作为一个rem */
  html {
    font-size: 36px;
  }
}
@media screen and (width: 360px) {
  /* 把375分成10份，每一份就是37.5，这是一个rem */
  html {
    font-size: 36px;
  }
}
.box {
  width: 10rem;
}
.head {
  width: 10rem;
  height: 0.666667rem;
  background-color: #757575;
}
.logo {
  position: relative;
  text-align: center;
}
.logo .iconlogo {
  font-size: 3.452055rem;
  width: 3.452055rem;
  color: red;
  margin: 0 auto;
}
.logo .test {
  position: absolute;
  top: 7px;
  left: 10px;
}
form {
  text-align: center;
}
input {
  width: 298px;
  height: 20px;
  font-size: 18px;
  line-height: 18px;
  border-bottom: 1px solid #757575;
  padding: 10px;
}
button {
  width: 318px;
  height: 48px;
  border-radius: 50px;
  background-color: #cc3300;
  margin-top: 66px;
}
</style>