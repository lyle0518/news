<template>
  <div>
    <!-- 导航栏 -->
    <Nav title="编辑信息" @click.native="handleBack(true)"></Nav>
    <!-- 头像 -->
    <div class="userImg">
      <img :src="$axios.defaults.baseURL+user.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <Listbar label="昵称" :tips="user.nickname" @click.native="handleNickname"></Listbar>
    <!-- 添加编辑昵称的弹窗 -->
    <!-- confirm点击确认按钮触发 -->
    <van-dialog
      v-model="shownickname"
      title="标题"
      show-cancel-button
      @confirm="handleChangeNickname"
    >
      <input type="text" placeholder="修改昵称" v-model="nickname" />
    </van-dialog>
    <Listbar label="密码" tips="******" @click.native="handlePassword"></Listbar>
    <!-- 修改密码弹窗 -->
    <van-dialog
      v-model="showpassword"
      title="标题"
      show-cancel-button
      @confirm="handleChangepassword"
    >
      <input type="password" placeholder="修改密码" v-model="password" />
    </van-dialog>
    <Listbar label="性别" :tips="['女','男'][gender]" @click.native="handleGender"></Listbar>
    <!-- 性别上拉框 -->
    <van-action-sheet v-model="showGender" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import Nav from "@/components/Nav";
// 引入LIstbar按钮组件
import Listbar from "@/components/Listbar";
export default {
  data() {
    return {
      //axios请求回来的数据
      user: {},
      //本地的数据
      userInfo: {},
      shownickname: false,
      showpassword: false,
      showGender: false,
      nickname: "",
      gender: "",
      password: "",
      actions: [
        { name: "男", value: 1 },
        { name: "女", value: 0 }
      ]
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
    console.log(this.userInfo);

    this.$axios({
      url: "/user/" + userInfo.user.id,
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      const { data } = res.data;
      console.log(data);
      this.user = data;
      //   存储请求返回的的nickname值
      this.nickname = data.nickname;
      //   存储请求返回的的gender值
      this.gender = data.gender;
    });
    // console.log(this.user);
  },

  methods: {
    handleBack(back) {
      console.log(back);
      if (back) {
        this.$router.back();
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //   从本地拿token值

      console.log(this.userInfo);
      //   console.log(file);
      const fd = new FormData();
      fd.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          Authorization: this.userInfo.token
        },
        data: fd
      }).then(res => {
        // this.$toast.success("修改头像成功");
        console.log(res);
        // 解析出图片的地址
        const { url } = res.data.data;
        this.user.head_img = url;
        this.handleEdit({ head_img: url });
      });
    },
    // 封装修改数据库请求
    handleEdit(data) {
      this.$axios({
        //获取id错误
        url: "/user_update/" + this.userInfo.user.id,
        method: "post",
        headers: {
          Authorization: this.userInfo.token
        },
        data
      }).then(res => {
        this.$toast.success("资料修改成功");
      });
    },
    // 点击修改nickname的show值
    handleNickname() {
      // 值为布尔值
      this.shownickname = true;
    },

    //点击确认按钮触发函数
    handleChangeNickname() {
      //   console.log(this.nickname);
      // 发送请求
      this.handleEdit({ nickname: this.nickname });
      //   把this.nickname修改到本地内存
      this.user.nickname = this.nickname;
    },
    // 修改密码弹窗显示
    handlePassword() {
      this.showpassword = true;
    },
    // 点击确认发送修改密码请求
    handleChangepassword() {
      this.handleEdit({ password: this.password });
      //   修改加载完成请求的user里的密码值,为修改密码如果需要显示当前密码做准备
      this.user.password = this.password;
    },
    // 弹出选择性别框
    handleGender() {
      this.showGender = true;
    },
    // 选择性别时触发的事件
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showGender = false;
      console.log(item.value);
      this.handleEdit({ gender: item.value });
      //   页面的性别是从用户信息接口返回的需要修改data中的user.gender
      this.gender = item.value;
    }
  },
  components: {
    Listbar,
    Nav
  }
};
</script>

<style scoped lang='less'>
.userImg {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20 / 360 * 100vw;
  img {
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    padding: 0;
    width: 100 /360 * 100vw;
    height: 100 /360 * 100vw;
    top: 50%;
    left: 50%;
    transform: translateX(-50 / 360 * 100vw) translateY(-50 / 360 * 100vw);
    opacity: 0;
  }
}
</style>