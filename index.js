import VueDependenciesBadges from './lib/vue-dependencies-badges.vue'

export default {
  install(Vue, options) {
    Vue.component('v-dep-badges', VueDependenciesBadges)
  },
}
