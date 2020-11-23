<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton
        class="check-button"
        :class="{ checked: isCheckedAll }"
        @click.native="selectAll"
      ></CheckButton>
      <span>全选</span>
    </div>
    <div class="total">
      <span>合计:{{ totalPrice }}</span>
    </div>
    <div class="buy" @click="buy">结算({{ counter }})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  components: { CheckButton },
  name: "CartBottomBar",
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          // 筛选出选中的商品
          .filter((item) => {
            return item.checked;
          })
          // 将筛选出的商品拿出计算价格，叠加
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
          }, 0)
          // 保留两位小数
          .toFixed(2)
      );
    },
    counter() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isCheckedAll() {
      if (this.cartList.length === 0) return false;

      // 1.filter 如果条件是item，则找出所有为true的值；如果条件是!item，则找出所有为false的值
      // 此处只要有一个checked属性为false，则不全选
      // return this.cartList.filter(item => !item.checked)

      // 2.find   其中有一个为true，则返回true
      return !this.cartList.find((item) => !item.checked);

      // 3.遍历
      // for (let item of this.cartList) {
      //   if(!item.checked) {
      //     return false
      //   }
      // }
      // return true
    },
  },
  methods: {
    selectAll() {
      if(this.isCheckedAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    buy() {
      if(!(this.cartList.find(item => item.checked))) {
        this.$toast.show('请选择商品', 2000)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  bottom: 49px;
  width: 100%;
  display: flex;
  background-color: #eee;
  height: 40px;
}

.check-content {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 40px;
  color: #aaa;
  width: 80px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 10px;
}

.total {
  line-height: 40px;
  margin-left: 10px;
  flex: 1;
}

.buy {
  display: flex;
  width: 100px;
  line-height: 40px;
  justify-content: center;
  background-image: linear-gradient(90deg, #ff9000 0%, #ff5000 98%);
  border-radius: 15px;
  color: white;
}

.checked {
  background-color: red;
  border-color: red;
}
</style>
