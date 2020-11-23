<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      >
      {{item}}
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll.vue";

import CartListItem from "./CartListItem.vue";

export default {
  components: { CartListItem, Scroll },
  name: "CartList",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
