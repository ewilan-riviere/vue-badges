<template>
  <div>
    <div class="badges-section" v-if="!alert">
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
    <div v-else>
      <span class="text-red font-mono">
        deps prop are not set correctly
      </span>
      <div>
        Respect a structure like this
        <pre>
        &lt;vue-dep-badges
          :deps="[
            ['node.js', '12.15'],
            ['yarn', '1.2'],
            ['vue.js']
          ]"
        &gt;&lt;/vue-dep-badges&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import dependenciesJSON from './database.json'

export default {
  name: 'VueDependenciesBadges',
  /**
   * Usage of props
   *
   * deps prop
   * just with languages (minimum required)
   * <vue-dep-badges :deps='[["Nuxt.js"],["BootstrapVue"]]'></vue-dep-badges>
   *
   * with version (optional)
   * <vue-dep-badges :deps='[["Nuxt.js","2.11"],["BootstrapVue","2.1"]]'></vue-dep-badges>
   *
   * if language don't exist into database.json, infos will be limited, if you want some infos, add it
   */
  props: {
    deps: {
      type: Array,
      default: () => [],
    },
    iconsColored: {
      type: Boolean,
      default: false,
    },
    all: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dependencies: [],
      alert: false,
      regExp: false,
    }
  },
  created() {
    if (this.all) {
      this.deps = []
      console.clear()
      var result = Object.keys(dependenciesJSON).map(function (key) {
        return dependenciesJSON[key]
      })
      this.dependencies = result
    }
  },
  mounted() {
    if (!this.all) {
      this.dependencies = this.convertDeps()
    }
    if (this.regExp) {
      let str = 'Hello, world nodejs!'
      let regexp = /js/g // without flag "g", lastIndex property is ignored
      console.log(regexp.exec(str))

      str = str.replace(regexp, 'JS')
      console.log(str)
    }
  },
  methods: {
    slugify(text) {
      if (text === undefined) {
        this.alert = true
        return
      }
      text = text
        .toString()
        .replace(/js/g, 'JS') // nodejs => nodeJS
        .replace(/([a-z])([A-Z])/g, '$1 $2') // AndroidSDK => Android SDK
        .toLowerCase() // Android SDK => android sdk
        // .replace(/["']/i, '-')
        .replace(/\s+/g, '-') // visual studio code => visual-studio-code
        .replace(/\./g, '-') // nuxt.js => nuxt-js
        .replace(/_/g, '-') // android_studio => android-studio
        .normalize('NFD') // Remove all accents
      // .replace(/[\u0300-\u036F]/g, '')
      // console.log(text)

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
     * Convert deps prop into array of objects and inject dependencies.json infos into this array
     */
    convertDeps() {
      const dependenciesFromProp = this.deps
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

      // compare deps with JSON database to get static infos
      dependenciesObjects = this.injectJsonInfo(
        dependenciesObjects,
        dependenciesJSON
      )

      return dependenciesObjects
    },
    getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value)
    },
    /**
     * Inject dependencies.json infos into this array
     * @param PropData Array from props
     * @param JsonData JSON data with all available languages
     */
    injectJsonInfo(PropData, JsonData, debug = false) {
      var depenciesWithData = []
      // compare with "language" key
      for (let i = 0; i < PropData.length; i++) {
        const propDataLanguage = PropData[i]
        const currentTech = this.slugify(propDataLanguage.label)
        // check if language exist in JsonData
        if (debug) {
          console.log(`Info from deps prop ${currentTech}`)
          console.log(
            `database.json comparaison result: ${JsonData[currentTech]}`
          )
        }

        if (JsonData[currentTech] !== undefined) {
          let dependencyMixed = {}
          // set dependencyFromJson with JSON data
          let dependencyFromJson = JsonData[currentTech]
          let dependencyFromProp = propDataLanguage

          // rebuild object
          dependencyMixed.label = dependencyFromJson.label
          dependencyMixed.id = dependencyFromJson.id + '-' + i
          dependencyMixed.logo = dependencyFromJson.logo
          dependencyMixed.link = dependencyFromJson.link
          if ('version' in dependencyFromProp) {
            dependencyMixed.version = dependencyFromProp.version
          } else {
            dependencyMixed.version = dependencyFromJson.version
          }
          dependencyMixed.color = dependencyFromJson.color
          dependencyMixed.colorIcon = dependencyFromJson.colorIcon

          // inject new object into depenciesWithData
          depenciesWithData.push(dependencyMixed)
        } else {
          const techNotSupported = {}
          // prop have array with object
          if (typeof propDataLanguage.label === 'object') {
            let definedTech = propDataLanguage.label

            techNotSupported.label = definedTech.label
              ? definedTech.label
              : null
            techNotSupported.id = null
            techNotSupported.logo = definedTech.logo ? definedTech.logo : null
            techNotSupported.link = definedTech.link ? definedTech.link : null
            techNotSupported.color = definedTech.color
              ? definedTech.color
              : '000000'
            techNotSupported.colorIcon = definedTech.colorIcon
              ? definedTech.colorIcon
              : 'ffffff'
            techNotSupported.version = definedTech.version
              ? definedTech.version
              : 1.0
            // or default
          } else {
            techNotSupported.label = propDataLanguage.label
            techNotSupported.id = null
            techNotSupported.logo = null
            techNotSupported.link = null
            techNotSupported.color = '000000'
            techNotSupported.colorIcon = 'ffffff'
            if ('version' in propDataLanguage) {
              techNotSupported.version = propDataLanguage.version
            } else {
              techNotSupported.version = 1.0
            }
          }

          // console.log('techNotSupported')
          // console.log(techNotSupported)

          depenciesWithData.push(techNotSupported)
        }
      }

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

.font-mono {
  font-family: Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}
.text-red {
  color: red;
}
</style>
