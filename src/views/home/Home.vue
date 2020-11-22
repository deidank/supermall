<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      class="tab-control"
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="topClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComp/HomeSwiper.vue";
import RecommendView from "./childComp/RecommendView.vue";
import FeatureView from "./childComp/FeatureView.vue";

import NavBar from "../../components/common/navbar/NavBar.vue";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../components/content/goodsList/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";

import { getHomeMultidata, getHomeData } from "../../network/home.js";
import { debounce } from "../../common/utils.js";
import { backTopMixin } from "../../common/Mixins.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabControlTop: 0,
      isTabFixed: false,
      scrollY: 0,
      itemListener: null
    };
  },
  mixins:[backTopMixin],
  created() {
    this.getHomeMultidata();
    this.getHomeData("pop");
    this.getHomeData("new");
    this.getHomeData("sell");
  },
  mounted() {
    // 接收发送的图片加载完成事件，进行刷新
    // 防抖操作，避免频繁操作
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemListener = () => {
      refresh();
      finishPullUp();
    };
    // 这里上拉加载更多也加上防抖操作，避免使用时多次上拉取到后面的数据
    const finishPullUp = debounce(this.$refs.scroll.finishPullUp, 200);
    this.$bus.$on("itemImageLoad", this.itemListener);
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.scrollY, 0);
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.scrollY = this.$refs.scroll.getScrollY();
    this.$bus.$off("itemImageLoad", this.itemListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    // 切换商品数据类型
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    // 点击返回顶部

    // 显示回到顶部按钮
    contentScroll(position) {
      this.listenShowBackTop(position);
      this.isTabFixed = -position.y > this.tabControlTop
    },

    // 加载更多
    loadMore() {
      this.getHomeData(this.currentType);
      // this.$refs.scroll.finishPullUp()
    },

    // 在轮播图加载后获取tabcontrol位置
    swiperImageLoad() {
    this.tabControlTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求
    getHomeMultidata() {
      // 1.请求多个数据
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 2.请求商品列表数据
    getHomeData(type) {
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* 让界面高度为100个视口高度 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
