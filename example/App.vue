<template>
  <div>
    <dependencies-badges
      :data="[
        ['visual studio code'],
        ['visual_studio_code'],
        ['AndroidSDK'],
        ['php'],
      ]"
    ></dependencies-badges>
  </div>
</template>

<script>
import DependenciesBadges from '../src/dependencies-badges.vue'
export default {
  components: {
    DependenciesBadges,
  },
}
</script>

<style lang="scss" scoped></style>
