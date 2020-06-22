<template>
  <div>
    <vue-dependencies-badges
      :data="[
        ['visual studio code'],
        ['visual_studio_code'],
        ['AndroidSDK'],
        ['php'],
      ]"
    ></vue-dependencies-badges>
  </div>
</template>

<script>
import VueDependenciesBadges from '../lib/vue-dependencies-badges.vue'
export default {
  components: {
    VueDependenciesBadges,
  },
}
</script>
