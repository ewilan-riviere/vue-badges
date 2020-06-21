import DependenciesBadges from './src/dependencies-badges.vue'

export default {
  install(Vue, options) {
    Vue.component('dependencies-badges', DependenciesBadges)
  },
}
