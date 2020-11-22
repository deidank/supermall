<template>
  <!-- v-if="Object.keys(goods).length !== 0" 判断是否存在数据 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">
      {{ goods.title }}
    </div>
    <div class="info-price">
      <span class="new-price">{{ goods.newPrice }}</span>
      <span class="old-price">{{ goods.oldPrice }}</span>
      <span class="discount" v-if="Object.keys(goods.discount).length !== 0">{{ goods.discount }}</span>
    </div>
    <div class="info-others">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  font-size: 12px;
}

.base-info {
  padding: 0 7px;
  margin-top: 13px;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: #222222;
  font-size: 16px;
}

.info-price {
  margin-top: 9px;
}

.new-price {
  color: #ff5777;
  font-size: 20px;
}

.old-price {
  color: #999999;
  margin-left: 4px;
  text-decoration-line: line-through;
}

.discount {
  background-color: #ff5777;
  color: #ffffff;
  padding: 2px 4px;
  margin-left: 5px;
  border-radius: 5px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}

.info-others {
  margin-top: 12px;
  color: #999999;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px rgba(100, 100, 100, 0.1);
}

.info-service {
  line-height: 50px;
  display: flex;
  justify-content: space-between;
}

.info-service img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
  margin-right: 2px;
}

.info-service-item span {
  color: #333;
  font-size: 14px;
}
</style>
