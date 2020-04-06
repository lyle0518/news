<template>
  <div class="box">
    <div class="nav">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <input type="text" placeholder="请输入搜索关键字" v-model="value" @keyup.enter="handleSearch" />
      <span class="searchBtn">搜索</span>
      <span class="iconfont iconsearch"></span>
    </div>
    <div class="history">
      <div class="his-text">
        <p>历史记录</p>
        <span class="iconfont iconicon-test" @click="handleDel"></span>
      </div>
      <div class="history-item">
        <span v-for="(item, index) in history" :key="index" @click="handleRecord(item)">{{item}}</span>
      </div>

      <!-- <span>美女111</span> -->
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
    <div class="result-layer" v-if="showLayer">
      <div v-for="(item,index) in list" :key="index">
        <PostItem1 :data="item" v-if="item.type===1&&item.cover.length<3"></PostItem1>
        <PostItem2 :data="item" v-if="item.type===1&&item.cover.length>=3"></PostItem2>
        <PostItem3 :data="item" v-if="item.type===2"></PostItem3>
      </div>
      <div class="empty" v-if="list.length===0">
        <p>没有找到你想要的内容</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostItem1 from "@/components/PostItem1";
import PostItem2 from "@/components/PostItem2";
import PostItem3 from "@/components/PostItem3";

export default {
  components: {
    PostItem1,
    PostItem2,
    PostItem3
  },
  watch: {
    value() {
      if (this.value == "") {
        this.showLayer = false;
        this.list = [];
      }
    }
  },
  data() {
    return {
      value: "",
      history: JSON.parse(localStorage.getItem("history")) || [],
      showLayer: false,
      list: []
    };
  },
  methods: {
    handleSearch() {
      // console.log(this.value);
      // 输入框为空阻止搜索请求
      if (this.value == "") return;
      this.history.unshift(this.value);
      this.history = [...new Set(this.history)];
      localStorage.setItem("history", JSON.stringify(this.history));
      this.getList();
      // 清空输入框
      // this.value = "";
    },
    handleDel() {
      this.history = [];
      localStorage.removeItem("history");
    },
    handleRecord(item) {
      this.value = item;
      // 触发搜索请求
    },
    // 封装一个搜索请求
    getList() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value
        }
      }).then(res => {
        this.showLayer = true;
        const { data } = res.data;
        // console.log(data);
        this.list = data;
      });
    }
  }
};
</script>

<style lang='less' scoped>
.box {
  padding: 10px;
  box-sizing: border-box;
  // position: relative;
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
    .his-text {
      display: flex;
      justify-content: space-between;
      p {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .iconicon-test {
        font-size: 14px;
      }
    }
    .history-item {
      span {
        font-size: 12px;
        margin-right: 30px;
      }
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
    height: 100%;
    padding: 20/360 * 100vw 0;
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
  .empty {
    text-align: center;
    font-size: 16px;
    color: #999;
    line-height: 2;
  }
}
</style>