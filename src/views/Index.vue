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
        <van-tab v-for="(item,index) in categories" :title="item.name" :key="index">
          <!-- 更新加载 -->
          <van-list
            :immediate-check="false"
            v-model="categories[active].loading"
            :finished="categories[active].finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="(item,index) in categories[active].posts" :key="index">
              <PostItem1
                :data="item"
                v-if="item.type===1&&item.cover.length>0&&item.cover.length<3"
              ></PostItem1>
              <PostItem2 :data="item" v-if="item.type===1&&item.cover.length>=3"></PostItem2>
              <PostItem3 :data="item" v-if="item.type === 2"></PostItem3>
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
      categories: [],
      active: 0,
      // categoryId: 999,
      // loading: false, // 是否正在加载中
      // finished: false,
      refreshing: false
    };
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
      // console.log(this.active);

      this.getList();
    }
  },
  mounted() {
    // 请求前判断本地是否有存储栏目数据
    const categories = JSON.parse(localStorage.getItem("categories"));
    // 获取本地的登录状态做栏目区别
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

    // 登录状态-token 如果有token但是没有关注列表，重新请求更新this.categories
    if (categories) {
      // 登录并且本地是有categories,第一个栏目就应该是关注
      if (token && categories[0].name !== "关注") {
        // 重新发请求把token传参证明为登录状态
        this.getCategories(token);
        return;
      }
      //如果本地没有token,但是第一栏又是关注
      if (!token && categories[0].name === "关注") {
        this.getCategories();
        return;
      }
      // 讲本地的categories对象赋值到data用做渲染
      this.categories = categories;
      // 本地如果有categories, 给每个加上一个pageIndex;
      this.handleCategories();
      // console.log(this.categories);
    } else {
      this.getCategories(token);
    }
    // 页面加载请求文章列表,默认请求id为999的头条的栏目文章
    this.$axios({
      url: "/post",
      params: {
        category: this.categories[this.active].id,
        pageIndex: 1,
        pageSize: 5
      }
    }).then(res => {
      const { data } = res.data;
      // console.log(data);
      this.categories[this.active].posts = data;
      this.categories = [...this.categories];
    });
  },

  methods: {
    // 给每个栏目都加一个pageIndex独立值,做文章独立的加载
    handleCategories() {
      this.categories = this.categories.map(v => {
        v.pageIndex = 1;
        // 隔离各自文章列表的list
        v.posts = [];
        // 独立的加载状态
        v.loading = false;
        v.finished = false;
        return v;
      });
      // console.log(this.categories);
    },

    // 封装获取栏目的请求,判断是否有token值
    getCategories(token) {
      const config = {
        url: "/category"
      };
      if (token) {
        config.headers = { Authorization: token };
      }
      this.$axios(config).then(res => {
        const { data } = res.data;
        data.push({
          name: ""
        });
        this.categories = data;
        // 请求的时候直接给每个栏目加上一个pageIndex
        localStorage.setItem("categories", JSON.stringify(data));
        this.handleCategories();
      });
    },
    onLoad() {
      // console.log("已经拖动到了底部");
      // 拉到底部,将pageIndex值加1之后重新请求新的list列表并且进行合并

      this.categories[this.active].pageIndex += 1;
      // console.log(this.categories);
      // 重新发送请求获取新的lis下一页的文章数据
      this.getList();
    },
    // 封装点击栏目请求文章的方法
    // 获取各自的当前页面
    getList() {
      // 如果对应的finised已经为true结束请求
      if (this.categories[this.active].finished) {
        return;
      }
      const { pageIndex, id } = this.categories[this.active];
      // console.log(id);

      this.$axios({
        url: "/post",
        params: {
          pageIndex: pageIndex,
          pageSize: 5,
          category: id
        }
      }).then(res => {
        const { data, total } = res.data;

        // 旧文章列表和新请求的文章列表进行合并
        // console.log(this.list);

        this.categories[this.active].posts = [
          ...this.categories[this.active].posts,
          ...data
        ];

        this.categories[this.active].loading = false;
        this.categories = [...this.categories];
        console.log(this.categories[this.active].posts);

        if (this.categories[this.active].posts.length === total) {
          this.categories[this.active].finished = true;
          console.log(111);
        }
      });
    },
    onRefresh() {
      // 表示加载完毕	            // 表示加载完毕
      this.refreshing = false;
      // console.log("正在下拉刷新");
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