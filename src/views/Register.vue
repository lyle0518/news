<template>
  <div class="register">
    <div class="back">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="form.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <div>
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
      <router-link to="/login">
        <van-button round block class="link-login">登录</van-button>
      </router-link>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      this.$axios({
        url: "/register",
        method: "POST",
        data: this.form
      }).then(res => {
        console.log(111);
        const { message } = res.data;
        this.$toast.success(message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register {
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
  color: #cc3300;
}
.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20 / 360 * 100vw;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }
  .van-button--info {
    margin-top: 50 / 360 * 100vw;
    background-color: #cc3300;
    border: 1px solid #cc3300;
  }
  .link-login {
    margin-top: 20 / 360 * 100vw;
  }
}
</style>
