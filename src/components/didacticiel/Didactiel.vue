<template>
    <transition name="fade">
         <div :class="element.name" class="didactiel" v-if="isShowing">
            <img v-if='element' :src="element.path" alt="logo">
            <p>{{ element.message }}</p>
         </div>
    </transition>
</template>

<script>
export default {
  name: 'Didactiel',
  props: {
    showLastDidac: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      element: null,
      isShowing: false,
      state: 'init',
      collectionDidac: this.$store.state.didacticiels.filter(element => element.name === 'collection')[0].show
    }
  },
  computed: {
    splinePosition () {
      return this.$store.state.splinePosition
    },
    voiceOver () {
      return this.$store.state.currentVoiceOverSeek
    }
  },
  watch: {
    splinePosition () {
      this.openDidactiel()
    },
    voiceOver () {
      this.scrollDidacticiel()
    },
    showLastDidac (value) {
      console.log('éeee')
      if (value) this.displayCollectionDidacticiel()
    }
  },
  methods: {
    scrollDidacticiel () {
      // let element = this.$store.state.didacticiels.filter(element => element.name === 'scroll')[0]
      this.$store.state.didacticiels.forEach(el => {
        if (this.voiceOver > el.seekPosition && !el.active && el.seekPosition) {
          this.element = el
          this.isShowing = true
          this.$store.commit('didacticielShowed', this.element.name)
        }
      })
    },
    openDidactiel () {
      this.$store.state.didacticiels.forEach(el => {
        if (el.name === 'scroll' && this.splinePosition > el.position) {
          this.isShowing = false
          this.element = null
          this.$store.commit('didacticielShowed', el.name)
        } else if (el.name === 'radar' && this.splinePosition > el.position && el.active) {
          setTimeout(() => {
            this.isShowing = false
            this.element = null
            this.$store.commit('didacticielShowed', el.name)
          }, 10000)
        } else { // TODO show collection on first recollect object
        }
      })
    },
    displayCollectionDidacticiel () {
      let element = this.$store.state.didacticiels.filter(element => element.name === 'collection')[0]
      if (element.name === 'collection' && !element.active) {
        this.element = element
        this.isShowing = true
        this.$store.commit('didacticielShowed', element.name)
        setTimeout(() => {
          this.isShowing = false
          this.element = null
        }, 5000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./didactiel.scss";
</style>
