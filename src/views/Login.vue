<template>
  <div class="box">
    <div class="back">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 使用vant表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleclick() {
      this.$axios({
        url: "http://127.0.0.1:3000/login",
        method: "post",
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style lang="less">
.box {
  padding: 20 / 360 * 100vw;
}
.back span {
  font-size: 27 / 360 * 100vw;
  line-height: 1;
}
.logo {
  text-align: center;
}
.logo span {
  font-size: 126 / 360 * 100vw;
  color: red;
}
.form input {
  width: 100%;
  font-size: 16px;
  line-height: 50 / 360 * 100vw;
  border-bottom: 1px solid #000;
}
.form button {
  background-color: #cc3300;
  color: #fff;
  width: 100%;
  height: 48 / 360 * 100vw;
  border-radius: 50px;
  margin-top: 65 / 360 * 100vw;
}
</style>
