<template>
  <router-link :to="`/post/${data.id}`" class="star2">
    <p class="title">{{data.title}}</p>
    <div class="Img">
      <img
        v-for="(item,index) in data.cover"
        :key="index"
        :src="$axios.defaults.baseURL + item.url"
        alt
      />
    </div>
    <p class="author">{{data.user.nickname}} {{data.comment_length}}跟帖</p>
  </router-link>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style spoced lang='less'>
.star2 {
  padding: 20/360 * 100vw;
  height: 210/360 * 100;
  border-bottom: 1px solid #e4e4e4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 20px;
    // 字数超出换行
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
    font-size: 18px;
    margin-top: 20/360 * 100px;
    color: #868686;
  }
}
</style>