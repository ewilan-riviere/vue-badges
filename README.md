# **Vue Dependencies Badges**

[![](https://img.shields.io/npm/v/vue-dependencies-badges.svg?style=flat-square&color=cb3837&logo=npm&logoColor=ffffff)](https://www.npmjs.com/package/vue-dependencies-badges)
[![](https://img.shields.io/github/license/ewilan-riviere/vuepress-theme-useweb.svg?style=flat-square&color=f05032&logo=git&logoColor=ffffff)](https://github.com/ewilan-riviere/dependencies-badges/blob/master/LICENSE)

[![node.js](https://img.shields.io/static/v1?label=Node.js&message=v11.15&color=339933&style=flat-square&logo=node.js&logoColor=ffffff)](https://nodejs.org/en/)
[![vue.js](https://img.shields.io/static/v1?label=Vue.js&message=v2.6&color=4FC08D&style=flat-square&logo=vue.js&logoColor=ffffff)](https://vuejs.org/)

Package to easily use static badges from [**shields.io**](https://shields.io/) with icon from [**simpleicons.org**](https://simpleicons.org/) into documentation (or any Vue.js project).

## **Documentation**

Install it with Yarn or NPM

```bash
yarn add -D vue-dependencies-badges
```

**OR**

```bash
npm i vue-dependencies-badges --save-dev
```

Import it, ES6 way, in `main.js` / `app.js` file

```js
import Dependencies from 'vue-dependencies-badges'

Vue.use(Dependencies)
```

Use it in a `.vue` file

```vue
<template>
    <div>
        <dependencies :deps='[["AndroidStudio"]]'></dependencies>
    </div>
</template>
```

## **License**

**MIT** &copy; [**@ewilan-riviere**](https://github.com/ewilan-riviere)
