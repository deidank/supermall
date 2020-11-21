<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 图片加载事件完成，将事件发送出去
    imgLoad() {
      this.$bus.$emit("itemImageLoad");
      // console.log("refresh");
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 14px;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  /* 是否换行 */
  white-space: nowrap;
  /* 结尾省略号 */
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.collect {
  position: relative;
}

/* 通过伪类添加收藏图标 */
.collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
