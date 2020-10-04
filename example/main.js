import Vue from 'vue'
import App from './App.vue'
import VueDependenciesBadges from '../index'

import './assets/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueDependenciesBadges, {
  option: 'option',
})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
