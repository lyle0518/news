<template>
  <div class="container">
    <!-- 顶部导航条 -->
    <div class="nav">
      <span class="iconfont iconjiantou2"></span>
      <strong>个人中心</strong>
      <span class="iconfont iconshouye"></span>
    </div>
    <div class="header">
      <!-- 头像 -->
      <div class="img">
        <!-- <img :src="'http://127.0.0.1:3000'+userInfo.head_img" alt /> -->
        <img :src="$axios.defaults.baseURL + userInfo.head_img" alt />
      </div>
      <!-- 姓名 -->
      <div class="profile">
        <div class="avatar">
          <span class="iconfont iconxingbienan" v-if="userInfo.gender === 1"></span>
          <span class="iconfont iconxingbienv" v-if="userInfo.gender === 0"></span>
          {{ userInfo.nickname }}
        </div>
        <p>{{ moment(userInfo.create_date).format("YYYY-MM-DD") }}</p>
      </div>
      <!-- 右侧箭头 -->
      <span class="iconfont iconjiantou1"></span>
    </div>
    <!-- 列表按钮-->
    <Listbar v-for="(item, index) in rows" :label="item.label" :tips="item.tips" :key="index"></Listbar>
  </div>
</template>

<script>
import Listbar from "@/components/Listbar";
// 引入时间处理工具库
import moment from "moment";
export default {
  data() {
    return {
      rows: [
        {
          label: "我的关注",
          tips: "关注的用户"
        },
        {
          label: "我的跟帖",
          tips: "跟帖/回复"
        },
        {
          label: "我的收藏",
          tips: "文章/视频"
        },
        {
          label: "设置",
          tips: ""
        }
      ],
      userInfo: {},
      moment
    };
  },
  // 注册组件Listbar
  components: {
    Listbar
  },
  mounted() {
    const urlStr = JSON.parse(localStorage.getItem("userInfo"));

    console.log(urlStr);
    this.$axios({
      url: "/user/" + urlStr.user.id,
      headers: {
        Authorization: urlStr.token
      }
    }).then(res => {
      // console.log(res);
      // this.userInfo = res.data.data;
      const { data } = res.data;
      this.userInfo = data;
      console.log(this.userInfo);
    });
  }
};
</script>

<style scoped lang="less">
.nav {
  padding: 20/ 360 * 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 10 / 360 * 100vw;
  border: 1px solid #eee;
  .iconshouye {
    font-size: 20px;
  }
}
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
  .iconxingbienan {
    color: blue;
  }
  .iconxingbienv {
    color: palevioletred;
  }
}
</style>
