<template>
  <div class="footer">
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
  </div>
</template>

<script>
export default {
  props: ["post"],
  data() {
    return {
      id: "",
      token: ""
    };
  },
  mounted() {
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    console.log(this.post);
  },
  methods: {
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
};
</script>

<style scoped lang='less'>
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
</style>