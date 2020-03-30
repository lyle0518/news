<template>
  <div>
    <!-- 导航栏 -->
    <Nav title="我的关注"></Nav>
    <!-- 关注列表 -->
    <div class="floowList">
      <div class="list" v-for="(item,index) in fllow" :key="index">
        <div class="listLeft">
          <!-- 头像 -->
          <img :src="$axios.defaults.baseURL+item.head_img" alt />
          <div class="user">
            {{item.nickname}}
            <p>{{moment(item.create_date).format('YYYY-MM-DD')}}</p>
          </div>
        </div>
        <div class="listRight" @click="unfollow(item.id,index)">取消关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import moment from "moment";
export default {
  data() {
    return {
      userInfo: {},
      fllow: [],
      moment
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
    this.$axios({
      url: "/user_follows/",
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      const { data } = res.data;
      this.fllow = data;
    });
  },
  components: {
    Nav
  },
  methods: {
    unfollow(id, index) {
      this.$axios({
        url: "/user_unfollow/" + id,
        headers: {
          Authorization: this.userInfo.token
        }
      }).then(res => {
        console.log(res);
        this.$toast.success("取消关注成功");
        // 删除页面上渲染的条数
        this.fllow.splice(index, 1);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.floowList {
  .list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding: 20/360 * 100vw;

    .listLeft {
      display: flex;
      img {
        width: 40/360 * 100vw;
        height: 40/360 * 100vw;
        object-fit: cover; // 防止图片变形
        border-radius: 50%;
      }
      .user {
        margin-left: 15/360 * 100vw;
        p {
          line-height: 20/360 * 100vw;
          color: #707070;
          font-size: 14px;
        }
      }
    }
    .listRight {
      width: 73/360 * 100vw;
      height: 30/360 * 100vw;
      background-color: #e0e0e0;
      text-align: center;
      line-height: 30/360 * 100vw;
      border-radius: 20px;
      font-size: 14px;
    }
  }
}
</style>