<template>
  <div>
    <div class="nav">
      <span class="iconfont iconnew"></span>
      <router-link to="/search" class="search">
        <span class="iconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="/login">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <div class="tabList">
      <van-tabs v-model="active" sticky swipeable @scroll="handleScroll">
        <van-tab
          v-for="(item, index) in categories"
          :title="item.name"
          :key="index"
          v-if="item.is_top===1||item.name===''"
        >
          <!-- 更新加载 -->
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
            immediate-check
          >
            <div v-for="(subitem, subindex) in item.posts" :key="subindex">
              <PostItem1 :data="subitem" v-if="subitem.type===1&&subitem.cover.length<3"></PostItem1>
              <PostItem2 :data="subitem" v-if="subitem.type===1&&subitem.cover.length>=3"></PostItem2>
              <PostItem3 :data="subitem" v-if="subitem.type===2"></PostItem3>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// 文章列表的组件,只有单张图片的
import PostItem1 from "@/components/PostItem1";
// 大于等于3张图片的组件
import PostItem2 from "@/components/PostItem2";
// 视频的列表组件
import PostItem3 from "@/components/PostItem3";

export default {
  data() {
    return {
      // 菜单的数据
      categories: [],
      // 记录当前tab的切换的索引
      active: 0,
      // 假设这个数组是后台返回的数据
      // list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 10个1
      toekn: "",
      // loading: false, // 是否正在加载中
      // finished: false, // 是否已经加载完毕
      refreshing: false // 是否正在下拉加载
    };
  },

  methods: {
    // 请求栏目列表
    getCategories() {
      const config = {
        url: "/category"
      };
      if (this.token) {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        console.log(res);
        const { data } = res.data;
        data.push({
          name: ""
        });
        this.categories = data;
        // 给categories挂载对立的数据
        this.handleCategories();
        // 默认请求第一个页面的文章
        // this.categories = [...this.categories];
        localStorage.setItem("categories", JSON.stringify(data));
      });
    },
    // 给栏目挂载各自的文章列表,页码,加载状态和加载完成的状态
    handleCategories() {
      this.categories.forEach(v => {
        v.posts = [];
        v.pageIndex = 1;
        v.finished = false;
        v.loading = false;
        v.scroll = "";
        v.isload = false;
      });
      this.getList();
    },

    // 文章请求封装
    getList() {
      const { id, pageIndex, finished, isload } = this.categories[this.active];
      console.log(isload);

      if (isload) return;
      this.categories[this.active].isload = true;
      this.categories[this.active].pageIndex += 1;
      if (finished) return;
      // 关注列表的文章需要传token值
      const config = {
        url: "/post",
        params: {
          pageIndex,
          pageSize: 5,
          category: id
        }
      };
      if (this.token) {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        const { data, total } = res.data;
        // console.log(data);
        this.categories[this.active].posts = [
          ...this.categories[this.active].posts,
          ...data
        ];
        this.categories[this.active].loading = false;
        this.categories = [...this.categories];
        // console.log(total);

        if (this.categories[this.active].posts.length === total) {
          this.categories[this.active].finished = true;
        }
        this.categories[this.active].isload = false;
      });
    },
    handleScroll(data) {
      if (this.categories.length === 0) return;
      const { scrollTop } = data;
      // console.log(scrollTop);
      this.categories[this.active].scroll = scrollTop;
      // console.log(this.categories);
    },
    onLoad() {
      // console.log("已经拖动到了底部");
      this.getList();
    },
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    }
  },
  mounted() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    if (categories) {
      if (
        (token && categories[0].name !== "关注") ||
        (!token && categories[0].name === "关注")
      ) {
        this.getCategories();
      } else {
        this.categories = categories;
        this.handleCategories();
        // 默认请求第一个页面的文章
      }
    } else {
      this.getCategories();
    }
    // console.log(this.categories);
    // 进入页面发送请求获取文章 解析的id属于categories，异步执行，有可能还未获取到id
    // this.getList()
  },
  // 监听属性
  watch: {
    // 监听tab栏的切换
    active() {
      // 判断如果点击的是最后一个图标，跳转到栏目管理页
      const arr = this.categories.filter(v => {
        return v.is_top || v.name === "";
      });
      if (this.active === arr.length - 1) {
        this.$router.push("/category");
        return;
      }
      this.getList();
      // 需要等待数据渲染时间;
      setTimeout(() => {
        window.scrollTo(0, this.categories[this.active].scroll);
      }, 10);
    }
  },
  components: {
    PostItem1,
    PostItem2,
    PostItem3
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
  position: static;
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
  position: absolute;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  top: 0;
  padding-bottom: 10px;
  background: #eee;
  z-index: 0;
  /deep/.van-tab__text {
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
/deep/ .van-tabs__line {
  display: none;
}
/deep/ .van-tab--active {
  border-bottom: 1px #ff0000 solid;
}
</style>
