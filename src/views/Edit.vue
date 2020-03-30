<template>
  <div>
    <Nav title="编辑资料" @click.native="hadleback"></Nav>
    <!-- 头像 -->
    <div class="headImg">
      <img :src="$axios.defaults.baseURL+user.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <Listbar label="昵称" :tips="user.nickname" @click.native="showNickname=true"></Listbar>
    <van-dialog
      v-model="showNickname"
      title="修改昵称"
      show-cancel-button
      @confirm="handleChangeNickname"
      @cancel="handleCancelNickname"
    >
      <van-field v-model="nickName" placeholder="请输入用户名" />
    </van-dialog>
    <Listbar label="密码" tips="******" @click.native="showpassword=true"></Listbar>
    <van-dialog
      v-model="showpassword"
      title="修改密码"
      show-cancel-button
      @confirm="handleChangepassword"
    >
      <!-- 旧密码: -->
      <!-- <van-field v-model="password" />新密码: -->
      <van-field type="password" v-model="password" placeholder="请输入新密码" />
    </van-dialog>
    <Listbar label="性别" :tips="['女','男'][user.gender]" @click.native="showGender=true"></Listbar>
    <van-action-sheet v-model="showGender" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Listbar from "@/components/Listbar";
export default {
  data() {
    return {
      userInfo: {},
      user: {},
      showNickname: false,
      showpassword: false,
      showGender: false,
      nickName: "",
      password: "",
      actions: [
        { name: "女", value: 0 },
        { name: "男", value: 1 }
      ]
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // 将这个对象存到data中用于反显
    console.log(userInfo);
    this.userInfo = userInfo;
    this.$axios({
      url: "/user/" + userInfo.user.id,
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      // 解析获取的参数用于反显
      const { data } = res.data;
      // 存入data参数中
      this.user = data;
      this.nickName = this.user.nickname;
      // 防止在弹出框显示密码
      // this.password = this.user.password;
    });
  },
  methods: {
    hadleback() {
      this.$router.back();
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const fd = new FormData();
      fd.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        data: fd,
        headers: {
          Authorization: this.userInfo.token
        }
      }).then(res => {
        // 获取上传后的图片在数据库中的文件地址
        const { url } = res.data.data;
        // 发送请求修改数据库数据
        this.handleEdit({ head_img: url });
        // 修改上传后返显的数据,此时数据是页面一加载请求后的user中的地址,
        this.user.head_img = url;
        console.log(res);
      });
    },
    // 修改密码轻提示的回调函数
    changePassword() {
      this.$toast.success("信息修改成功");
      this.$toast.success({
        message: "信息修改成功",
        duration: 1000,
        onClose: () => {
          this.$notify({
            message: "请重新登录",
            duration: 1000,
            onClose: () => {
              localStorage.removeItem("userInfo");
              this.$router.replace("/login");
            }
          });
        }
      });
    },
    // 修改其他业务成功轻提示的回调函数
    changeOther() {
      this.$toast.success("信息修改成功");
    },

    handleEdit(data, fn) {
      return this.$axios({
        url: "/user_update/" + this.user.id,
        headers: {
          Authorization: this.userInfo.token
        },
        method: "post",
        data
      }).then(fn);
    },

    handleChangeNickname() {
      const request = this.handleEdit(
        { nickname: this.nickName },
        this.changeOther
      );
      // 修改昵称后更改第一次获取数据返显的user中的nickname,做数据在本地的更新
      request.then(() => {
        this.user.nickname = this.nickName;
      });
    },
    handleCancelNickname() {
      // 取消按钮时输入框中的默认昵称改回原样
      this.nickName = this.user.nickname;
    },
    // 修改密码
    handleChangepassword() {
      const request = this.handleEdit(
        { password: this.password },
        this.changePassword
      );
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showGender = false;
      // 修改数据库数据
      const request = this.handleEdit({ gender: item.value }, this.changeOther);
      // 修改user中返显的gender值
      request.then(() => {
        this.user.gender = item.value;
      });
    }
  },
  // 修改数据库数据

  components: {
    Nav,
    Listbar
  }
  //   页面加载完成发送请求获取数据渲染到页面
  // 获取本地的token和id值
};
</script>

<style lang='less' scoped>
.headImg {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40 / 360 * 100vw;

  img {
    width: 100 /360 * 100vw;
    height: 100 /360 * 100vw;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    width: 100 /360 * 100vw;
    height: 100 /360 * 100vw;
    top: 50%;
    left: 50%;
    transform: translateX(-50 /360 * 100vw) translateY(-50 /360 * 100vw);
    opacity: 0;
  }
}
</style>