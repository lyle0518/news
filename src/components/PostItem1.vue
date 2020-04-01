<template>
  <div class="star1">
    <div class="text">
      <p class="title">林志玲穿透视黑纱裙米兰看秀腹部微隆显孕味</p>
      <p class="author">火星时报 52跟帖</p>
    </div>
    <img src="https://www.baidu.com/img/baidu_jgylogo3.gif" alt />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.star1 {
  padding: 20/360 * 100vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e4;
  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: normal;
    }
    .author {
      font-size: 18px;
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
</style>