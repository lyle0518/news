<template>
  <div class="box">
    <div class="back">
      <span class="iconfont iconicon-test"></span>
    </div>
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>
    <!-- 使用vant表单 -->
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
      <div>
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
      <router-link to="/register">
        <van-button round block class="link-register">注册</van-button>
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
        password: ""
      }
    };
  },
  methods: {
    // 按钮点击发送请求
    onSubmit(values) {
      // console.log(values);

      this.$axios({
        url: "/login",
        method: "post",
        data: this.form
      }).then(res => {
        const { message, data } = res.data;
        this.$toast.success(message);
        //存储token值到本地
        localStorage.setItem("userInfo", JSON.stringify(data));
        // 跳转处理
        this.$router.push("/Personal");
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
  color: #cc3300;
}
.form {
  .van-cell {
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 20 / 360 * 100vw;
  }
  // button {
  // background-color: #cc3300;
  // color: #fff;
  // width: 100%;
  // height: 48 / 360 * 100vw;
  // border-radius: 50px;
  // margin-top: 65 / 360 * 100vw;
  // }
  .van-cell:not(:last-child)::after {
    border-bottom: 1px solid #333;
    left: 0;
  }
  .van-button--info {
    margin-top: 50 / 360 * 100vw;
    background-color: #cc3300;
    border: 1px solid #cc3300;
  }
  .link-register {
    margin-top: 20 / 360 * 100vw;
    // background-color: blue;
  }
}
</style>
