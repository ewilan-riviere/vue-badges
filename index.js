import VueDependenciesBadges from './lib/vue-dependencies-badges.vue'

export default {
  install(Vue, options) {
    Vue.component('vue-dep-badges', VueDependenciesBadges)
  },
}
