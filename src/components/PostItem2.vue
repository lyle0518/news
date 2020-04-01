<template>
  <div class="star2">
    <p class="title">亚马逊雨林为何燃烧？除了新总统“急功近利”的开发，国际资本才是真凶</p>
    <div class="Img">
      <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
      <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
      <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
    </div>
    <p class="author">火星时报 52跟帖</p>
  </div>
</template>

<script>
export default {};
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