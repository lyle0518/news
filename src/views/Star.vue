<template>
  <div>
    <Nav title="我的收藏" @click.native="handleBack"></Nav>
    <div class="star" v-for="(item,index) in stars" :key="index">
      <!-- 选择模板 -->
      <div class="star1" v-if="item.cover.length>0&&item.cover.length<3">
        <div class="text">
          <p class="title">{{item.title}}</p>
          <p class="author">{{item.user.nickname}} {{item.comments.length}}跟帖</p>
        </div>
        <img :src="$axios.defaults.baseURL+item.cover[0].url" alt />
      </div>
      <div class="star2" v-if="item.cover.length>3">
        <p class="title">林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</p>
        <div class="Img">
          <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
          <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
          <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
        </div>
        <p class="author">火星时报 52跟帖</p>
      </div>
    </div>

    <!-- 第二种模板 -->
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  data() {
    return {
      stars: {}
    };
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.stars = data;
    });
  },
  methods: {
    handleBack() {
      this.$router.back();
    }
  },
  components: {
    Nav
  }
};
</script>

<style lang="less" scoped>
.star1 {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e4;
  .text {
    .title {
      font-size: 16px;
    }
    .author {
      font-size: 13px;
      margin-top: 20/360 * 100px;
      color: #868686;
    }
  }
  img {
    display: block;
    width: 121/360 * 100vw;
    height: 75/360 * 100vw;
    object-fit: cover;
  }
}
.star2 {
  padding: 20/360 * 100vw;
  height: 210/360 * 100;
  border-bottom: 1px solid #e4e4e4;
  .title {
    font-size: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }
  .Img {
    display: flex;
    justify-content: space-around;
    margin: 10/360 * 100vw;
    img {
      width: 32%;
      height: 75/360 * 100vw;
      object-fit: cover;
    }
  }
  .author {
    font-size: 13px;
    margin-top: 20/360 * 100px;
    color: #868686;
  }
}
</style>
