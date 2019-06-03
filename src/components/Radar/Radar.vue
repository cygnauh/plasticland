<template>
    <div class="radar">
        <div class="radar-background">
            <div class="radar-map">
                <div class="radar-map-el" ref="radarMap"></div>
            </div>
            <div>
                <div class="radar-circle-el yellow center"></div>
                <div class="radar-circle-el dotted small center"></div>
                <div class="radar-circle-el dotted medium center"></div>
            </div>
            <div class="center">
                <div class="radar-cross-el left"></div>
                <div class="radar-cross-el right"></div>
            </div>
            <div class="radar-boat center"></div>
            <div class="radar-line">
                <div class="radar-line-el"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from '../../store/index'

export default {
  name: 'Radar',
  props: {
    theme: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.getRadar()
  },
  methods: {
    getRadar () {
      store.setRadar(this.$refs.radarMap)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "radar";
</style>
