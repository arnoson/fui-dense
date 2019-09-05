import Vue from 'vue'
import Dev from '@/Dev'

Vue.config.productionTip = false

new Vue({
  render: h => h(Dev)
}).$mount('#app')
