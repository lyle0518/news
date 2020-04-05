<template>
  <div>
    <Nav title="栏目管理" :back="true"></Nav>
    <div class="list">
      <p>点击删除以下频道</p>
      <div class="listUp">
        <span
          v-for="(item,index) in arrTop"
          :key="index"
          @click="handleDel(item,index)"
          :class="item.name==='头条'||item.name==='关注'?'active':''"
        >{{item.name}}</span>
      </div>
      <p>点击添加以下频道</p>
      <div class="listDom">
        <span
          v-for="(item,index) in arrDom"
          :key="index"
          @click="handleAdd(item,index)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  data() {
    return {
      arrTop: [],
      arrDom: [],
      categories: ""
    };
  },
  components: {
    Nav
  },
  methods: {
    handleDel(item, index) {
      if (["关注", "头条"].includes(item.name)) return;
      this.arrTop.splice(index, 1);
      // console.log(item.is_top);
      item.is_top = 0;
      this.arrDom.push(item);
      // console.log(item.is_top);

      // this.arrTop = [...this.arrTop];
      // this.arrDom = [...this.arrDom];
    },
    handleAdd(item, index) {
      this.arrDom.splice(index, 1);
      item.is_top = 1;
      console.log(item.is_top);

      this.arrTop.push(item);
      // this.arrTop = [...this.arrTop];
      // this.arrDom = [...this.arrDom];
    }
  },
  updated() {
    this.categories = [
      ...this.arrTop,
      ...this.arrDom,
      this.categories[this.categories.length - 1]
    ];
    console.log(this.categories);

    localStorage.setItem("categories", JSON.stringify(this.categories));
  },
  mounted() {
    this.categories = JSON.parse(localStorage.getItem("categories"));
    this.arrTop = this.categories.filter(v => {
      return v.is_top === 1;
    });
    this.arrDom = this.categories.filter(v => {
      return v.is_top === 0;
      console.log("arrTop", this.arrTop);
      console.log("arrDom", this.arrDom);
    });
  }
};
</script>

<style scoped lang='less'>
.list {
  padding: 20/360 * 100vw;
  p {
    margin-bottom: 10/360 * 100vw;
  }
  .listUp {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    span {
      padding: 5px 10px;
      font-size: 18px;
      border: 1px solid #d9d9d9;
      margin: 12px;
    }
  }
  .listDom {
    display: flex;
    flex-wrap: wrap;
    span {
      padding: 5px 10px;
      font-size: 18px;
      border: 1px solid #d9d9d9;
      margin: 12px;
    }
  }
}
.active {
  background-color: #f0f0f0;
}
</style>