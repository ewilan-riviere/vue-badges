<template>
  <div class="container mx-auto my-5 font-sans">
    <hero></hero>
    <div class="p-5 bg-gray-200 my-10 rounded-md shadow-md">
      <div class="text-2xl">
        All badges available
      </div>
      <vue-badges :all="true"></vue-badges>
    </div>
    <div class="p-5 bg-gray-200 my-10 rounded-md shadow-md">
      <div class="text-2xl">
        Custom badges
      </div>
      <vue-badges
        :badges="[
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
      ></vue-badges>
    </div>
  </div>
</template>

<script>
import Hero from "./Hero";

export default {
  components: {
    Hero,
  },
};
</script>

<style>
.badges-section img {
  @apply inline !important;
}
</style>
