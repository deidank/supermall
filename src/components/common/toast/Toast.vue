<template>
  <div class="toast" v-show="isShowToast">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShowToast: false
    }
  },
  methods: {
    show(message, duration) {
      this.message = message;
      this.isShowToast = true;
      
      setTimeout(() => {
        this.isShowToast = false;
        this.message = ''
      },duration)
    }
  }
}
</script>

<style scoped>
  .toast {
  width: 180px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 18px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 99;

  color: #fff;
  background-color: rgba(0, 0, 0, .75);
}
</style>
