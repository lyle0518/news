<template>
  <div>
    <Nav title="精彩跟帖"></Nav>
    <van-list
      v-model="loading"
      :finished="finished"
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
          <span class="user-right">回复</span>
        </div>
        <!-- 第二级 -->
        <!-- <div class="comment-dom">
        <div class="user">
          <div class="user-left">
            <span class="id">1</span>
            <span class="name">火星网友1</span>
            <span class="time">2小时前</span>
          </div>
          <div class="user-right">回复</div>
        </div>
        <span>文章说的很有道理</span>
        </div>-->
        <CommentFloor :data="item.parent" v-if="item.parent"></CommentFloor>
        <span class="reply">{{item.content}}</span>
      </div>
    </van-list>
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
      pageSize: 5
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
</style>