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
        <span class="iconfont icondianzan"></span>
        <i>{{Number(post.has_like)}}</i>
      </div>
      <div class="actions-item">
        <span class="iconfont iconweixin"></span>
        <i>微信</i>
      </div>
    </div>
    <div class="footer">
      <div class="comment-input">发布评论</div>
      <div class="icous">
        <span class="iconfont iconpinglun-"></span>
        <i>{{post.comment_length>100?'99+': post.comment_length }}</i>
      </div>
      <div class="icous">
        <span class="iconfont iconshoucang" :class="post.has_star ? 'star_active':''"></span>
      </div>
      <div class="icous">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      post: {
        user: ""
      },
      moment,
      id: ""
    };
  },
  mounted() {
    const { id } = this.$route.params;
    // this.id = id;
    this.$axios({
      url: "/post/" + id
    }).then(res => {
      const { data } = res.data;
      console.log(data);
      this.post = data;
    });
  },
  methods: {
    //   关注/取消关注
    handleFllow() {
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      this.$axios({
        url: "/user_follows/" + this.post.user.id,
        headers: {
          Authorization: token
        }
      }).then(res => {
        console.log(res);
        this.post.has_follow = true;
        this.$toast.success("关注成功");
      });
    }
  }
};
</script>

<style scoped lang='less'>
.box {
  padding: 10/360 * 100vw;
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20/360 * 100vw;

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
  }
  .author {
    font-size: 12px;
    margin-bottom: 20px;
  }
  .content {
    line-height: 24px;
    font-size: 14px;
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
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #ddd;
    width: 100%;
    padding: 10/360 * 100vw 20/360 * 100vw;

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