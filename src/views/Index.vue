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
      <van-tabs v-model="active" sticky swipeable @scroll="handleScroll">
        <van-tab v-for="(item, index) in categories" :title="item.name" :key="index">
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
      // 请求到的文章数据
      // list: [],
      // 栏目表
      categories: [],
      token: "",
      // pageIndex: 1,
      active: 0,
      // categoryId: 999,
      // loading: false, // 是否正在加载中
      // finished: false,
      refreshing: false
    };
  },
  mounted() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    // console.log(this.token);

    if (categories) {
      if (
        (token && categories[0].name !== "关注") ||
        (!token && categories[0].name === "关注")
      ) {
        // 如果本地有token但是没有关注列表的话,重新请求
        // 如果本地没有token但是有关注列表,重新请求
        this.getCategories();
      } else {
        // 如果本地有categories,并且本地没有token且没有关注
        // 或者本地有token和关注列表,直接获取本地的数据
        this.categories = categories;
        // 给每个categories添加独立的页码
        this.handleCategories();
        // console.log(this.categories);
      }
    } else {
      this.getCategories();
    }
  },
  watch: {
    active() {
      //   console.log(111);
      //   active会随着点击栏目返回对应的索引值
      if (this.active === this.categories.length - 1) {
        this.$router.push("/管理栏");
        return;
      }
      // 当点击不同栏目,active值变化,获取对应的id重新发送文章渲染请求
      this.getList();
      setTimeout(() => {
        window.scrollTo(0, this.categories[this.active].scrollY);
      }, 0);
    }
  },
  methods: {
    // 封装---请求栏目列表
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
        // console.log(res);
        const { data } = res.data;
        data.push({
          name: ""
        });
        this.categories = data;
        localStorage.setItem("categories", JSON.stringify(this.categories));
        // 将请到的数据新增独立的页码，文章列表，加载状态，完成状态，滚动栏
        ories();
        this.handleCateg;
      });
    },
    // 给每个栏目添加独立的pageIndex
    handleCategories() {
      this.categories.forEach(v => {
        v.pageIndex = 1;
        v.posts = [];
        v.finished = false;
        v.loading = false;
        v.scrollY = 0;
      });
      this.getList();
      console.log(this.categories);
    },
    onLoad() {
      // 拉到页面底部讲pageIndex值加一重新发送请求文章,将文章进行拼接
      this.categories[this.active].pageIndex += 1;
      this.getList();
    },
    // 封装请求文章的请求方法
    getList() {
      const { pageIndex, id, posts, finished, name } = this.categories[
        this.active
      ];
      if (finished) return;
      const config = {
        url: "/post",
        params: {
          pageIndex,
          pageSize: 5,
          category: id
        }
      };

      // 判断是否请求的是关注栏目，关注栏目需要传token
      if (name === "关注") {
        config.headers = {
          Authorization: this.token
        };
      }
      this.$axios(config).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        // 各自独立的列表拼接
        this.categories[this.active].posts = [
          ...this.categories[this.active].posts,
          ...data
        ];
        this.categories = [...this.categories];

        this.categories[this.active].loading = false;
        if (this.categories[this.active].posts.length === total) {
          console.log(1);

          this.categories[this.active].finished = true;
        }
      });
    },
    handleScroll(data) {
      if (this.categories.length === 0) return;
      const { scrollTop } = data;
      // console.log(scrollTop);
      this.categories[this.active].scrollY = scrollTop;
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
  position: static;
  background-color: #eee;
  // margin-right: 43px !important;
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
