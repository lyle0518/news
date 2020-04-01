<template>
  <div>
    <div class="nav">
      <span class="iconfont iconnew"></span>
      <router-link to="#" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="#">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <div class="tabList">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab v-for="(item,index) in nav" :title="item" :key="index">
          <!-- 更新加载 -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="(item,index) in list" :key="index">
              <PostItem1></PostItem1>
              <!-- <PostItem2></PostItem2> -->
              <!-- <PostItem3></PostItem3> -->
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
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
  data() {
    return {
      list: ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
      nav: [
        "关注",
        "头条",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        "关注",
        "头条",
        "娱乐",
        "体育",
        "汽车",
        "房产",
        ""
      ],
      active: 0,
      loading: false, // 是否正在加载中
      finished: false
    };
  },
  watch: {
    active() {
      //   console.log(111);
      //   active会随着点击栏目返回对应的索引值
      if (this.active === this.nav.length - 1) {
        this.$router.push("/管理栏");
      }
    }
  },
  methods: {
    onLoad() {
      console.log("已经拖动到了底部");
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(1);
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 5000);
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  height: 49/360 * 100vw;
  background-color: #ff0000;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
  font-size: 16px;

  .iconnew {
    transform: scale(3.5);
    padding-left: 5/360 * 100vw;
  }
  .search {
    width: 210/360 * 100vw;
    height: 34/360 * 100vw;
    background-color: #f87979;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .iconwode {
    font-size: 25px;
  }
}

/deep/.van-tabs__nav {
  background-color: #eee;
  margin-right: 43px !important;
  font-size: 18px !important;
}
/deep/ .van-tab {
  color: #000;
  font-size: 18px;
  flex-basis: 17% !important;
}

/deep/ .van-tab:nth-last-child(2) {
  position: fixed;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 49 /360 * 100vw;
  padding-bottom: 10px;
  background: #eee;
  z-index: 0;
  .van-tab__text {
    display: flex;
    // position: absolute;
    // top: 10px;
    // left: 50px;
    width: 10px;
    height: 10px;
    border: 1px solid #000;
    border-right: 0;
    border-top: 0;
    transform: rotate(-45deg);
    // padding: 20/360 * 100vw;
    // flex-basis: 0% !important;
  }
  // font-size: 16px;
}
</style>