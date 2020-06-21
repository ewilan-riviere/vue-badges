<template>
  <div class="badges-section">
    <span
      v-for="(dependency, dependencyId) in dependencies"
      :key="dependencyId"
      class="badge"
    >
      <a :href="dependency.link" target="_blank">
        <img
          :src="`https://img.shields.io/static/v1?label=${
            dependency.label
          }&message=${ifVersionIsInteger(dependency.version)}${
            dependency.version
          }&color=${dependency.color}&style=flat-square&logo=${
            dependency.logo
          }&logoColor=${iconsColored ? dependency.color : 'ffffff'}`"
          :alt="dependency.label"
        />
      </a>
    </span>
  </div>
</template>

<script>
import dependenciesJSON from './dependencies-badges.json'

export default {
  name: 'DependenciesBadges',
  /**
   * Usage of props
   *
   * data prop
   * just with languages (minimum required)
   * <dependencies :data='[["Nuxt.js"],["BootstrapVue"]]'></dependencies>
   *
   * with version (optional)
   * <dependencies :data='[["Nuxt.js","2.11"],["BootstrapVue","2.1"]]'></dependencies>
   *
   * if language don't exist into dependencies.json, infos will be limited, if you want some infos, add it
   */
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    iconsColored: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dependencies: null,
    }
  },
  mounted() {
    this.dependencies = this.convertData()
  },
  methods: {
    slugify(text) {
      text = text
        .toString()
        .replace(/([a-z])([A-Z])/g, '$1 $2') // AndroidSDK => Android SDK
        .toLowerCase() // Android SDK => android sdk
        // .replace(/["']/i, '-')
        .replace(/\s+/g, '-') // visual studio code => visual-studio-code
        .replace(/\./g, '-') // nuxt.js => nuxt-js
        .replace(/_/g, '-') // android_studio => android-studio
        .normalize('NFD') // Remove all accents
      // .replace(/[\u0300-\u036F]/g, '')
      console.log(text)

      return text
    },
    ifVersionIsInteger(version) {
      if (parseInt(version, 10)) {
        return 'v'
      } else {
        return ''
      }
    },
    /**
     * Convert data prop into array of objects and inject dependencies.json infos into this array
     */
    convertData() {
      const dependenciesFromProp = this.data
      let dependenciesObjects = []
      // take prop array and convert it to object
      dependenciesFromProp.forEach((dependency) => {
        const dependencyObject = Object.assign({}, [dependency][0])
        dependenciesObjects.push(dependencyObject)
      })
      // rename first key into "language" and second key into "version" if version is set
      var i
      for (i = 0; i < dependenciesObjects.length; i++) {
        const depArray = dependenciesObjects[i]
        depArray.label = depArray['0']
        delete depArray['0']
        if (depArray['1'] !== undefined) {
          depArray.version = depArray['1']
          delete depArray['1']
        }
      }

      // compare data with JSON database to get static infos
      dependenciesObjects = this.injectJsonInfo(
        dependenciesObjects,
        dependenciesJSON
      )

      return dependenciesObjects
    },
    /**
     * Inject dependencies.json infos into this array
     * @param propsArray Array from props
     * @param JsonData JSON data with all available languages
     */
    injectJsonInfo(propsArray, JsonData) {
      var depenciesWithData = []
      // compare with "language" key
      for (var language in propsArray) {
        const currentTech = this.slugify(propsArray[language].label)
        // check if language exist in JsonData
        console.log(currentTech)
        console.log(JsonData[currentTech])

        if (JsonData[currentTech] !== undefined) {
          Object.keys(JsonData).forEach((JsonDataKey) => {
            if (this.slugify(currentTech) === JsonDataKey) {
              let dependencyFromJson = {}
              // set dependencyFromJson with JSON data
              dependencyFromJson = JsonData[currentTech]
              // if "version" is set, get prop "version" data
              if ('version' in propsArray[language]) {
                delete dependencyFromJson.version
                dependencyFromJson.version = propsArray[language].version
              } else {
                dependencyFromJson.version = JsonData[currentTech].version
              }
              // inject new object into depenciesWithData
              depenciesWithData.push(dependencyFromJson)
            }
          })
        } else {
          const undefinedLang = {}
          undefinedLang.label = propsArray[language].label
          undefinedLang.logo = null
          undefinedLang.link = null
          undefinedLang.color = '000000'
          undefinedLang.colorIcon = '000000'
          if ('version' in propsArray[language]) {
            undefinedLang.version = propsArray[language].version
          } else {
            undefinedLang.version = 1.0
          }

          console.log('undefinedLang')
          console.log(undefinedLang)

          depenciesWithData.push(undefinedLang)
        }
      }

      // if (JsonData[currentTech] !== undefined) {
      //   // get current language
      //   if (
      //     this.slugify(currentTech) ===
      //     this.slugify(JsonData[currentTech].label)
      //   ) {
      //     let dependencyFromJson = {}
      //     // set dependencyFromJson with JSON data
      //     dependencyFromJson = JsonData[currentTech]
      //     // if "version" is set, get prop "version" data
      //     console.log('bouyah!')

      //     if ('version' in propsArray[language]) {
      //       console.log('bouyah')

      //       delete dependencyFromJson.version
      //       dependencyFromJson.version = propsArray[language].version
      //     } else {
      //       console.log('bouh')

      //       dependencyFromJson.version = JsonData[currentTech].version
      //     }

      //     console.log('dep')

      //     console.log(dependencyFromJson)

      //     // inject new object into depenciesWithData
      //     depenciesWithData.push(dependencyFromJson)
      //   }
      // otherwise attribute basic info to language
      // you can add your language to dependencies.json if you want infos about it

      return depenciesWithData
    },
  },
}
</script>

<style scoped>
.badges-section {
  margin: 0.3rem 0;
}

.badge {
  padding-right: 0.2rem;
}
</style>
