<template>
    <transition name="fade">
         <div :class="element.name" class="didactiel collection" v-if="isShowing">
            <img v-if='element' :src="element.path" alt="logo">
            <p>{{ element.message }}</p>
         </div>
    </transition>
</template>

<script>
export default {
  name: 'Didactiel',
  data () {
    return {
      element: null,
      isShowing: false,
      state: 'init'
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
    }
  },
  methods: {
    scrollDidacticiel () {
      let element = this.$store.state.didacticiels.filter(element => element.name === 'scroll')[0]
      if (this.voiceOver > 12.0 && element.show) {
        this.element = element
        this.isShowing = true
        this.$store.commit('didacticielShowed', this.element.name)
      }
    },
    openDidactiel () {
      this.$store.state.didacticiels.forEach(el => {
        if (el.name === 'scroll' && this.splinePosition > el.position) {
          this.isShowing = false
          this.element = null
          this.$store.commit('didacticielShowed', el.name)
          this.$store.commit('hideSrollDidacticiel')
        } else {
          if (this.splinePosition > el.position && !el.active && el.name !== 'scroll') {
            this.element = el
            this.isShowing = true
            this.$store.commit('didacticielShowed', el.name)
            setTimeout(() => {
              this.isShowing = false
              this.element = null
            }, 10000)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./didactiel.scss";
</style>
