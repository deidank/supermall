<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index"
    class="tab-control-item"
    :class="{active: index === currentIndex}"
    @click="tabClick(index)">
      <span>{{item}}</span>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return{
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 34px;
    line-height: 34px;
    background-color: white;
  }

  .tab-control-item {
    flex: 1;
    font: 13px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
    padding: 5px;
  }
</style>
