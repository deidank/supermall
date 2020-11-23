import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from './components/common/toast/index.js'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

// 减少移动端300ms延迟 
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// const a = [true, true,false,true]
// console.log(a.filter(item => item))
// console.log(a.filter(item => !item))