<template>
    <transition name="fade">
         <div :class="element.name" class="didactiel collection" v-if="isShowing">
            <img v-if='element' :src="element.path" alt="logo">
            <p>{{ element.message }}</p>
         </div>
    </transition>
</template>

<script>
// import {} from ''
export default {
  name: 'Didactiel',
  data () {
    return {
      element: null,
      isShowing: false,
      state: 'init'
      // testUrl: '@/assets/img/svg/didacticiel-scroll.svg'
    }
  },
  computed: {
    splinePosition () {
      return this.$store.state.splinePosition
    }
  },
  watch: {
    splinePosition () {
      this.openDidactiel()
    }
  },
  methods: {
    openDidactiel () {
      this.$store.state.didacticiels.forEach(el => {
        if (this.splinePosition > el.position && !el.active) {
          this.element = el
          this.isShowing = true
          this.$store.commit('didacticielShowed', el.name)
          setTimeout(() => {
            this.isShowing = false
            this.element = null
          }, 10000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./didactiel.scss";
</style>
