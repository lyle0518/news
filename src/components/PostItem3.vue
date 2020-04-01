<template>
  <div class="videoList">
    <p class="title">美军与英军联合训练 6机编队阵容强大</p>
    <div class="video">
      <img
        src="https://img11.360buyimg.com/pop/s590x470_jfs/t1/106361/27/16760/92283/5e7da713E57959706/6d9ad70447582ecc.jpg.webp"
        alt
      />
      <div class="cover">
        <span class="iconfont iconshipin"></span>
      </div>
    </div>
    <p class="author">火星时报 52跟帖</p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.videoList {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  border-bottom: 1px solid #e4e4e4;
  padding: 15/360 * 100vw;
  .title {
    font-size: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-weight: normal;
  }
  .video {
    position: relative;
    img {
      width: 340/360 * 100vw;
      height: 170/360 * 100vw;
      padding-top: 15/360 * 100vw;
      object-fit: cover;
    }
    .cover {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-27/360 * 100vw) translateY(-27/360 * 100vw);
      width: 55/360 * 100vw;
      height: 55/360 * 100vw;
      background-color: #9ca4ac;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.7;
      .iconshipin {
        color: #fff;
        font-size: 50px;
      }
    }
  }
  .author {
    padding-top: 15/360 * 100vw;
    color: #868686;
    font-size: 18px;
  }
}
</style>