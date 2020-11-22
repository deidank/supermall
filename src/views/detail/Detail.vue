<template>
  <div class="detail">
    <detail-nav-bar
      class="nav-bar"
      @titleClick="selectIndex"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="scrollPosition"
      :probeType="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-params-info
        ref="params"
        :param-info="paramInfo"
      ></detail-params-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="goods" :goods="recommends"></goods-list>
    </scroll>
    <back-top v-if="isShowBackTop" @click.native="topClick"></back-top>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar.vue";
import DetailSwiper from "./childComponents/DetailSwiper.vue";
import DetailBaseInfo from "./childComponents/DetailBaseInfo.vue";
import DetailShopInfo from "./childComponents/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childComponents/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComponents/DetailCommentInfo.vue";
import DetailBottomBar from "./childComponents/DetailBottomBar.vue"

import Scroll from "../../components/common/scroll/Scroll.vue";
import GoodsList from "../../components/content/goodsList/GoodsList.vue";


import { debounce } from "../../common/utils.js";
import { itemListenerMixin, backTopMixin } from "../../common/Mixins.js";

import {
  getDetailData,
  getRecommendsData,
  Goods,
  Shop,
  GoodsParam,
} from "../../network/detail.js";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  methods: {
    imageLoad() {
      this.newRefresh();
      // 调用获取组件离顶部高度函数
      this.getThemeTopY();
    },
    selectIndex(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 400);
    },
    scrollPosition(position) {
      // 获取滚轮位置
      const positionY = -position.y;
      // 获取数组长度
      const length = this.themeTopYs.length;
      // 进行遍历
      for (let i = 0; i <= length - 1; i++) {
        if (
          // 首先判断目前的currentIndex值是否有变化，若没变化则不进行操作
          // 若有变化，则判断此时的i是否小于数组长度 - 1，分为两种情况进行操作
          // 最后将currentIndex传入到detailnavbar组件中
          // 优化后，将JS中的最大值 Number.MAX_VALUE 加到数组的最后，遍历时少取一位
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      this.listenShowBackTop(position)
    }
  },
  created() {
    // 获取商品ID
    this.iid = this.$route.params.iid;

    getDetailData(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 获取店铺数据
      this.shop = new Shop(data.shopInfo);

      // 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      // 等待渲染后的下一个操作
      this.$nextTick(() => {
        // 根据最新数据，DOM已经被渲染完毕
        // 但是图片还没有加载
      });
    });

    // 获取推荐数据
    getRecommendsData().then((res) => {
      this.recommends = res.data.list;
    });

    // 获取组件离顶部高度函数
    this.getThemeTopY = debounce(() => {
      this.themeTopYs[0] = 0;
      this.themeTopYs[1] = this.$refs.params.$el.offsetTop;
      this.themeTopYs[2] = this.$refs.comment.$el.offsetTop;
      this.themeTopYs[3] = this.$refs.goods.$el.offsetTop;
      this.themeTopYs[4] = Number.MAX_VALUE;
    }, 100);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 9;
}

.content {
  height: calc(100% - 93px );
}
</style>
