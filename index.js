import VueDependenciesBadges from './lib/vue-dependencies-badges.vue'

export default {
  install(Vue, options) {
    if (options) {
      // Vue.prototype.$option = options.option
    }
    Vue.component('dependencies', VueDependenciesBadges)
  },
}
