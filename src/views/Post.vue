<template>
  <div class="box">
    <div class="nav">
      <div class="nav_left">
        <span class="iconfont iconjiantou" @click="$router.back()"></span>
        <span class="iconfont iconnew"></span>
      </div>
      <span
        class="focus"
        @click="handleFllow"
        :class="post.has_follow?'':'focus_active '"
      >{{post.has_follow?'已关注':'关注'}}</span>
    </div>
    <p class="title">{{post.title}}</p>
    <p class="author">
      <span>{{post.user.nickname}} {{moment(post.user.create_date).format('YYYY-MM-DD hh:mm:ss')}}</span>
    </p>
    <div class="content" v-html="post.content"></div>

    <div class="actions">
      <div class="actions-item">
        <span class="iconfont icondianzan" @click="handleLike"></span>
        <i>{{Number(post.has_like)}}</i>
      </div>
      <div class="actions-item">
        <span class="iconfont iconweixin"></span>
        <i>微信</i>
      </div>
    </div>
    <!-- <div class="footer">
      <div class="comment-input">发布评论</div>
      <div class="icous">
        <span class="iconfont iconpinglun-"></span>
        <i>{{post.comment_length>100?'99+': post.comment_length }}</i>
      </div>
      <div class="icous">
        <span
          class="iconfont iconshoucang"
          @click="handleStar"
          :class="post.has_star ? 'star_active':''"
        ></span>
      </div>
      <div class="icous">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>-->
    <Footer :post="post"></Footer>
  </div>
</template>

<script>
import moment from "moment";
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  },
  data() {
    return {
      post: {
        user: ""
      },
      token: "",
      moment,
      id: ""
    };
  },
  mounted() {
    // 请求文章的时候添加token值才可以实现关注功能
    const { id } = this.$route.params;
    this.id = id;
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    const config = {
      url: "/post/" + id
    };
    if (token) {
      config.headers = { Authorization: token };
    }
    // this.id = id;
    this.$axios(config).then(res => {
      const { data } = res.data;
      console.log(data);
      this.post = data;
    });
  },
  methods: {
    //   关注/取消关注
    handleFllow() {
      let url = "";
      if (this.post.has_follow) {
        // 如果为true，就是已经关注了，所以要执行取消操作
        url = "/user_unfollow/" + this.post.user.id;
      } else {
        // 如果为false，则为未关注，执行关注操作
        url = "/user_follows/" + this.post.user.id;
      }
      this.$axios({
        url,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log(res);

        this.post.has_follow = !this.post.has_follow;
        this.$toast.success(res.data.message);
      });
    },
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log(res);
        this.post.has_like = !this.post.has_like;
        if (this.post.has_like) {
          // true,已经关注，加1
          this.post.like_length += 1;
        } else {
          this.post.like_length -= 1;
        }
        this.$toast.success(res.data.message);
      });
    }
    // handleStar() {
    //   this.$axios({
    //     url: "/post_star/" + this.id,
    //     headers: {
    //       Authorization: this.token
    //     }
    //   }).then(res => {
    //     this.post.has_star = !this.post.has_star;
    //     this.$toast.success(res.data.message);
    //   });
    // }
  }
};
</script>

<style scoped lang='less'>
.box {
  // padding: 10/360 * 100vw;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20/360 * 100vw;
    padding: 10/360 * 100vw;
    .nav_left {
      .iconnew {
        display: inline-block;
        transform: scale(3.5);
        margin-left: 20px;
      }
    }
    .focus {
      font-size: 12px;
      width: 58px;
      text-align: center;
      margin-right: 10/360 * 100vw;
      border: 1px solid #eee;
      // padding: 3px 15px;
      border-radius: 20px;
      box-sizing: border-box;
      // background-color: red;
      // color: #fff;
    }
    .focus_active {
      color: #fff;
      background-color: red;
      border: 1px solid red;
    }
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
    padding: 0 10/360 * 100vw;
  }
  .author {
    font-size: 12px;
    padding: 0 10/360 * 100vw;
    margin-bottom: 20px;
  }

  .content {
    line-height: 24px;
    font-size: 14px;
    padding: 0 10/360 * 100vw;

    /deep/ img {
      max-width: 100%;
    }
  }
  .actions {
    margin-top: 20/360 * 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 20/360 * 100vw;
    border-bottom: 3px solid #e4e4e4;
    .actions-item {
      border: 1px solid #000;
      border-radius: 20px;
      padding: 0 15px;
      line-height: 22px;
      i {
        font-size: 12px;
        margin-left: 5px;
      }
    }
    .iconweixin {
      color: #00c800;
    }
  }
  .footer {
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #ddd;
    margin-top: 100px;
    // width: 100%;
    padding: 20/360 * 100vw 0 20/360 * 100vw 10/360 * 100vw;
    background-color: #ffffff;
    // height: 50/360 * 100vw;
    .comment-input {
      //   flex: 1;
      width: 160/360 * 100vw;
      height: 28/360 * 100vw;
      font-size: 14px;
      line-height: 28/360 * 100vw;
      background-color: #d7d7d7;
      border-radius: 20px;
      padding-left: 20/360 * 100vw;
    }
    .icous {
      position: relative;
      display: line-block;
      transform: scale(1.5);
      margin-left: 32/360 * 100vw;
      i {
        position: absolute;
        display: block;
        top: -4px;
        left: 6px;
        font-size: 10px;
        background-color: red;
        color: #fff;
        border-radius: 20px;
        padding: 1px 2px;
        line-height: 1;
      }
    }

    .star_active {
      color: red;
    }
  }
}
</style>