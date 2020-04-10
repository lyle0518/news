<template>
  <div>
    <Nav title="精彩跟帖"></Nav>
    <van-list
      v-model="loading"
      :finished="finished"
      :autosize="!isFocus"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="comment-top" v-for="(item,index) in post" :key="
    index">
        <div class="user">
          <div class="user-left">
            <img :src="$axios.defaults.baseURL +item.user.head_img" alt />
            <div class="username">
              <p class="name">{{item.user.nickname}}</p>
              <p class="time">{{moment(item.user.create_date).fromNow()}}</p>
            </div>
          </div>
          <span class="user-right" @click="handleReply(item)">回复</span>
        </div>
        <!-- item.parent有多少层数据，CommentFloor就自调用多少次 -->
        <CommentFloor :data="item.parent" v-if="item.parent" @reply="handleReply"></CommentFloor>
        <span class="reply">{{item.content}}</span>
      </div>
    </van-list>
    <div class="footer">
      <van-field
        v-model="message"
        :rows="row"
        type="textarea"
        :autosize="!isFocus"
        :placeholder="reply.user?'回复@'+reply.user.nickname:'说点什么...'"
        class="textarea"
        :class="isFocus?'active':''"
        @focus="handleFocus"
        @blur="handleBlur"
        ref="textarea"
      />
      <span class="submit" v-if="isFocus" @click="handleSubmit">发布</span>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import moment from "moment";
import CommentFloor from "@/components/CommentFloor";
moment.locale("zh-CN");
export default {
  data() {
    return {
      id: "",
      post: [],
      moment,
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      message: "",
      row: 1,
      // 处理输入框的弹起，true为弹起
      isFocus: false,
      reply: {}
    };
  },
  components: {
    Nav,
    CommentFloor
  },
  mounted() {
    const { id } = this.$route.params;
    this.id = id;
    this.getList();
  },
  methods: {
    handleReply(item) {
      // 回复功能
      setTimeout(() => {
        // 弹起输入框
        this.isFocus = true;
        this.reply = item;
        // 自动聚焦  在要操控的元素中新增ref属性，值为自定义,在业务中运用this.$refs.定义值操控dom元素
        this.$refs.textarea.focus();
      }, 100);
    },
    handleFocus() {
      this.isFocus = true;
    },
    // 延迟失去焦点隐藏
    handleBlur() {
      setTimeout(() => {
        this.isFocus = false;
        if (this.message.trim() === "") {
          this.reply = {};
        }
      }, 100);
    },
    // 提交回复
    handleSubmit() {
      if (this.message.trim() === "") return;
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      const data = {
        content: this.message
      };
      if (this.reply.id) {
        data.parent_id = this.reply.id;
      }
      this.$axios({
        url: "/post_comment/" + this.id,
        method: "POST",
        headers: {
          Authorization: token
        },
        data
      }).then(res => {
        this.$toast.success("发布成功");
        this.message = "";
        // 处理新评论的渲染
        this.post = [];
        this.pageIndex = 1;
        this.getList();
        this.reply = {};
      });
    },
    getList() {
      this.$axios({
        url: `/post_comment/${this.id}`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        const { data } = res.data;
        this.post = [...this.post, ...data];
        this.pageIndex += 1;
        this.loading = false;
        if (this.pageSize > data.length) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      this.getList();
    }
  }
};
</script>

<style scoped lang='less'>
.comment-top {
  padding: 10/360 * 100vw 20/360 * 100vw;
  border-bottom: 1px solid #eee;
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .user-left {
      display: flex;

      img {
        width: 35/360 * 100vw;
        height: 35/360 * 100vw;
        border-radius: 50%;
        margin-right: 10/360 * 100vw;
      }
      .name {
        font-size: 14px;
      }
      .time {
        color: rgba(0, 0, 0, 0.537254901960784);
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
.comment-dom {
  border: 1px solid #eee;
  padding: 10/360 * 100vw;
  .user {
    .user-left {
      span {
        margin-right: 10/360 * 100vw;
        font-size: 14px;
      }
      .id {
        font-size: 12px;
      }
    }
    .user-right {
      font-size: 12px;
    }
  }
  .reply {
    font-size: 14px;
  }
}
.footer {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5/360 * 100vw 15/360 * 100vw;
  box-sizing: border-box;
  background: #fff;

  .textarea {
    background-color: #d7d7d7 !important;
    border-radius: 20px;
    width: 100%;
    padding: 5px 20px;
  }
}
.active {
  height: 82px !important;
  border-radius: 8px;
}
.submit {
  background-color: red;

  margin-left: 10/360 * 100vw;
  border-radius: 20/360 * 100vw;
  color: #fff;
  font-size: 12px;
  flex-shrink: 0;
  padding: 3px 10px;
}
</style>