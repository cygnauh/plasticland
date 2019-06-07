<template>
    <transition name="fade">
         <div class="didactiel collection" v-if="isShowing">
            <img :src="require('../../assets/img/svg/didacticiel-scroll.svg')" alt="logo">
            <p>{{ title }}</p>
         </div>
    </transition>
</template>

<script>
export default {
  name: 'Didactiel',
  props: {
    title: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isShowing: false
    }
  },
  computed: {
    splinePosition () {
      console.log(this.$store.state.splinePosition)
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
      console.log(this.splinePosition)
      this.$store.state.didacticiels.forEach(el => {
        if (this.splinePosition > el.position && this.splinePosition < el.position + 0.01) {
          this.isShowing = true
          setTimeout(() => {
            this.isShowing = false
          }, 3000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./didactiel.scss";
</style>
