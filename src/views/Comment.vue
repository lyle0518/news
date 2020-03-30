<template>
  <div>
    <!-- 导航栏 -->
    <Nav title="我的跟帖"></Nav>
    <!-- 评论区 -->
    <div class="comment_list" v-for="(item,index) in comment" :key="index">
      <div class="time">{{moment(item.create_date).format("YYYY-MM-DD hh:mm")}}</div>
      <div class="replytext" v-if="item.parent">
        <p class="reply_p">回复:{{item.parent.user.nickname}}</p>
        <p class="reply_p1">{{item.parent.content}}</p>
      </div>
      <div class="discuss">{{item.content}}</div>
      <router-link to="#" class="text">
        <span class="title">原文:{{item.post.title}}</span>
        <span class="iconfont iconjiantou1"></span>
      </router-link>
      <!-- 用户互动 -->
      <!-- <div class="interact">
        <div class="time">2019-10-10 10:25</div>
        <div class="replytext">
          <p class="reply_p">回复:火星彩票研究员</p>
          <p class="reply_p1">啊信是张信哲吗？张信哲是不是的张学友弟弟？</p>
        </div>
        <div class="reply">不是</div>
        <div class="text">原文：阿信分享《说好不哭》幕后故事：只听...</div>
      </div>-->
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
      comment: {},
      moment
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      console.log(res);
      this.comment = res.data.data;
      console.log(this.comment);
    });
  },
  components: {
    Nav
  }
};
</script>

<style lang="less" scoped>
.comment_list {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #d7d7d7;
  .time {
    margin-bottom: 15/360 * 100vw;
    color: #a1a1b5;
  }
  .discuss {
    margin: 20/360 * 100vw 0;
  }
  .text {
    color: #a1a1b5;
    display: flex;
    justify-content: space-between;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .replytext {
    height: 70/360 * 100vw;
    background-color: #e4e4e4;
    padding: 10/360 * 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .reply_p {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .reply_p1 {
      font-size: 16px;
    }
  }
}
.interact {
  padding: 20/360 * 100vw;
  border-bottom: 1px solid #d7d7d7;

  .time {
    margin-bottom: 15/360 * 100vw;
    color: #a1a1b5;
  }

  .reply {
    margin: 20/360 * 100vw 0;
  }
  .text {
    font-size: 13px;
  }
}
</style>
