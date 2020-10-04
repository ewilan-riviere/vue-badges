import VueBadges from './lib/vue-badges.vue'

export default {
  install(Vue, options) {
    if (options) {
      // Vue.prototype.$option = options.option
    }
    Vue.component('vue-badges', VueBadges)
  },
}
