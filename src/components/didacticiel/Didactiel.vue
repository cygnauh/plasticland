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
      isShowing: true,
      // totalActive: total
    }
  },
  computed: {
    // total () {
    //   return this.$store.state.didacticiels.active.length
    // }
  }
}
</script>

<style lang="scss" scoped>
    @import "./didactiel.scss";
</style>
