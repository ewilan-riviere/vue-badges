import DependenciesBadges from './lib/dependencies-badges.vue'

export default {
  install(Vue, options) {
    Vue.component('dependencies-badges', DependenciesBadges)
  },
}
