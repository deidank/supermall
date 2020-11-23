<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"/>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"/>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon select"/>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
 .bottom-bar {
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   /* position: relative;
   bottom: 49px; */
   height: 49px;
   border-top: 1px solid rgba(100, 100, 100, .1);
   background-color: #fff;
   display: flex;
   text-align: center;
 }

 .bar-item {
   flex: 1;
   display: flex;
 }

   .bar-item>div {
    flex: 1;
  }

    .bar-left span {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 1px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

/* icon图标是一个雪碧图 */
    .bar-left .service {
    background-position:0px -53px;
  }

  .bar-left .shop {
    background-position:0 -99px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 48px;
  }

  .cart {
    background-color: #ffe817;
    color: #333;
  }

  .buy {
    background-color: #f69;
  }
</style>
