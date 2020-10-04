# **Vue Badges**

[![](https://img.shields.io/npm/v/vue-badges.svg?style=flat-square&color=cb3837&logo=npm&logoColor=ffffff)](https://www.npmjs.com/package/vue-badges)
[![](https://img.shields.io/github/license/ewilan-riviere/vuepress-theme-useweb.svg?style=flat-square&color=f05032&logo=git&logoColor=ffffff)](https://github.com/ewilan-riviere/dependencies-badges/blob/master/LICENSE)

[![node.js](https://img.shields.io/static/v1?label=Node.js&message=v11.15&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en/)
[![vue.js](https://img.shields.io/static/v1?label=Vue.js&message=v2.6&color=4FC08D&style=flat-square&logo=vue.js&logoColor=ffffff)](https://vuejs.org/)

Package to easily use static badges from [**shields.io**](https://shields.io/) with icon from [**simpleicons.org**](https://simpleicons.org/) into documentation (or any Vue.js project).

## **Documentation**

Install it with Yarn or NPM

```bash
yarn add -D vue-badges
```

**OR**

```bash
npm i vue-badges --save-dev
```

Import it, ES6 way, in `main.js` / `app.js` file

```js
import VueBadges from 'vue-badges'

Vue.use(VueBadges)
```

Use it in a `.vue` file

```vue
<template>
    <div>
        <vue-badges :deps='[["AndroidStudio"]]'></vue-badges>
    </div>
</template>
```

## **Troubles**

### ***Usage with Tailwind CSS***

By default, *Tailwind CSS* use **preflight** and apply `display: block;` on `<img />`, you can add this to your style

```css
<style>
.badges-section img {
  @apply inline !important;
}
</style>
```

## **License**

**MIT** &copy; [**@ewilan-riviere**](https://github.com/ewilan-riviere)
