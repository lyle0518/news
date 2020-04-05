<template>
  <div class="box">
    <div class="nav">
      <span class="iconfont iconjiantou2"></span>
      <input type="text" />
      <span class="searchBtn">搜索</span>
      <span class="iconfont iconsearch"></span>
    </div>
    <div class="history">
      <p>历史记录</p>
      <span>美女</span>
      <span>美女111</span>
    </div>
    <div class="hotSearch">
      <p>热门搜索</p>
      <ul class="list">
        <li>
          <a href="#">办公室小野否认解散</a>
          <a href="#">月季如何嫁接</a>
        </li>
        <li>
          <a href="#">办公室小野否认解散</a>
          <a href="#">月季如何嫁接</a>
        </li>
        <li>
          <a href="#">办公室小野否认解散</a>
          <a href="#">月季如何嫁接</a>
        </li>
      </ul>
    </div>
    <div class="result-layer">
      <div class="result-item">
        <p>花露水的妙用</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
      <div class="result-item">
        <p>花露水的妙用</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
      <div class="result-item">
        <p>花露水的妙用</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
      <div class="result-item">
        <p>花露水的妙用</p>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.box {
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  .nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-bottom: 20/360 * 100vw;
    .iconsearch {
      position: absolute;
      left: 35px;
    }

    input {
      flex: 1;
      height: 30/360 * 100vw;
      border: 1px solid #d7d7d7;
      border-radius: 20px;
      margin: 0 5px;
      padding-left: 36px;
    }
    .searchBtn {
      margin: 0 5px;
    }
  }
  .history {
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    p {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    span {
      font-size: 12px;
      margin-right: 30px;
    }
  }
  .hotSearch {
    p {
      font-size: 14px;
      font-weight: 700;
      margin-top: 20/360 * 100vw;
    }
    .list {
      li {
        margin-top: 8/360 * 100vw;
        a {
          font-size: 12px;
          margin-right: 50/360 * 100vw;
        }
      }
    }
  }
  .result-layer {
    position: absolute;
    top: 58/360 * 100vw;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-y: auto;
    padding: 20/360 * 100vw;
    background-color: #fff;
    box-sizing: border-box;
    .result-item {
      padding: 10/360 * 100vw;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #eee;

      p {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>