<template>
  <div class="comment-dom">
    <div class="user">
      <div class="user-left">
        <!-- <span class="id">1</span> -->
        <span class="name">{{data.user.nickname}}</span>
        <span class="time">{{moment(data.create_date).fromNow()}}</span>
      </div>
      <!-- 触发父组件的方法 -->
      <div class="user-right" @click="handleReply(data)">回复</div>
    </div>
    <!-- 调用第三级 -->
    <!-- 传递函数到组件 -->
    <CommentFloor v-if="data.parent" :data="data.parent" @reply="handleReply"></CommentFloor>
    <span class="reply">{{data.content}}</span>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "CommentFloor",
  props: ["data"],
  data() {
    return {
      moment
    };
  },
  methods: {
    // 父组件传递过来的方法
    handleReply(data) {
      // 接受父组件传递过来的方法
      // 传值给父组件参数item
      this.$emit("reply", data);
    }
  }
};
</script>

<style scoped lang='less'>
.comment-dom {
  border: 1px solid #eee;
  padding: 10/360 * 100vw;
  margin-bottom: 10/360 * 100vw;
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10/360 * 100vw;
    .user-left {
      span {
        margin-right: 10/360 * 100vw;
        font-size: 14px;
      }
      .name {
        font-size: 14px;
      }
      .time {
        color: rgba(0, 0, 0, 0.537254901960784);
        font-size: 12px;
      }
      .id {
        font-size: 12px;
      }
    }
    .user-right {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.537254901960784);
    }
  }
  .reply {
    font-size: 14px;
  }
}
</style>