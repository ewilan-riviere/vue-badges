<template>
  <div>
    <vue-dep-badges
      :deps="[
        ['visual studio code', '1.4'],
        ['visual_studio_code', '1.2'],
        ['visual-studio-code'],
        ['nodejs'],
        ['node-js', '11.15'],
        ['node.js', '12.15'],
        ['php'],
        ['New tech'],
        ['my tech', '2.3'],
        [
          {
            label: 'My new tech',
            version: '2.4',
            color: '3DDC84',
            logo: 'android',
          },
        ],
      ]"
    ></vue-dep-badges>
  </div>
</template>

<script>
import VueDependenciesBadges from '../lib/vue-dependencies-badges.vue'
export default {
  components: {
    VueDepBadges: VueDependenciesBadges,
  },
}
</script>
