<template>
  <div class="box">
    <div class="video">
      <video :src="$axios.defaults.baseURL +post.content" controls></video>
    </div>
    <!-- 作者 -->
    <div class="author">
      <div class="author_left">
        <img :src="$axios.defaults.baseURL +post.user.head_img" alt />
        <span>{{post.user.nickname}}</span>
      </div>
      <span
        class="author_right"
        @click="handlefllow"
        :class="post.has_follow?'':'active'"
      >{{post.has_follow?'已关注':'关注'}}</span>
    </div>
    <!-- 标题栏 -->
    <div class="title">{{post.title}}</div>
    <!-- 按钮 -->
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
    <!-- 底部 -->
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
    <!-- 封装底部组件 -->
    <Footer :post="post"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  components: {
    Footer
  },
  data() {
    return {
      url: "",
      post: {
        // 处理图片异步的问题
        user: ""
      },
      token: ""
    };
  },
  mounted() {
    const { id } = this.$route.params;
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;

    console.log(id);

    this.$axios({
      url: "/post/" + id,
      headers: {
        Authorization: token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.post = data;
    });
  },
  methods: {
    // 关注

    handlefllow() {
      let url;
      if (this.post.has_follow) {
        // true-已经关注-取消操作
        url = "/user_unfollow/" + this.post.user.id;
      } else {
        // flase-没有关注-执行关注
        url = "/user_follows/" + this.post.user.id;
      }
      const config = {
        url,
        headers: {
          Authorization: this.token
        }
      };
      this.$axios(config).then(res => {
        this.post.has_follow = !this.post.has_follow;
        this.$toast.success(res.data.message);
      });
    },
    // 点赞
    handleLike() {
      this.$axios({
        url: "/post_like/" + this.post.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        console.log(res);
        this.post.has_like = !this.post.has_like;

        if (this.post.has_like) {
          // true--已经点赞,执行取消点赞
          this.post.like_length += 1;
        } else {
          this.post.like_length -= 1;
        }
        this.$toast.success(res.data.message);
      });
    },
    //收藏
    handleStar() {
      this.$axios({
        url: "/post_star/" + this.post.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        this.post.has_star = !this.post.has_star;
        this.$toast.success(res.data.message);
      });
    }
  }
  // 点赞
};
</script>

<style lang='less' scoped>
video {
  width: 100%;
}
.author {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10/360 * 100vw;
  .author_left {
    display: flex;
    align-items: center;
    padding-left: 10/360 * 100vw;
    img {
      width: 25/360 * 100vw;
      height: 25/360 * 100vw;
      border-radius: 50%;
      margin-right: 5/360 * 100vw;
    }
    span {
      font-size: 12px;
    }
  }
  .author_right {
    margin-right: 20/360 * 100vw;
    width: 62/360 * 100vw;
    height: 26/360 * 100vw;
    font-size: 12px;
    text-align: center;
    line-height: 26/360 * 100vw;
    border: 1px solid #eee;
    border-radius: 20px;
  }
  .active {
    color: #fff;
    background-color: red;
  }
}
.title {
  margin: 10/360 * 100vw 0 40/360 * 100vw 10/360 * 100vw;
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
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  // width: 100%;
  padding: 20/360 * 100vw 0 20/360 * 100vw 20/360 * 100vw;
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
</style>