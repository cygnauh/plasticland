<template>
  <div :class="{held:hoverAndHold}"
       :style="[`transform: translateX(${posX}), translateY(${posY})`]"
       class="hover-and-hold">
    <div class="text">
      Hold to Collect`
    </div>
    <div :class="[place, {held:hoverAndHold}]"
         class="load">
      <svg height="200" width="200">
        <circle class="circle" cx="100" cy="100" r="95" stroke="#231f20" stroke-width="10" fill-opacity="0" />
      </svg>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'HoverAndHold',
  props: {
    positionX: {
      type: Number,
      default: 0
    },
    positionY: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hoverAndHold () {
      return this.$store.state.hoverAndHold
    },
    place () {
      if (this.hoverAndHold) {
        console.log(this.$store.state.currentPlace.name)
        return this.$store.state.currentPlace.name
      }
      return ''
    },
    posX () {
      if (Vue.prototype.$engine) {
        console.log(Vue.prototype.$engine)
        return Vue.prototype.$engine.clientX
      }
      return 100
    },
    posY () {
      if (Vue.prototype.$engine && Vue.prototype.$engine.clientY) {
        console.log(Vue.prototype.$engine.clientY)
        return Vue.prototype.$engine.clientY
      }
      return 100
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/index';
  .hover-and-hold{
    width: 50px;
    height: 50px;
    position: absolute;
    z-index: 10;
    &.held{
      z-index: 10;
      .text{
        opacity: 1;
        transition: opacity 0.1s ease-in-out;
      }
    }
    .text{
      opacity: 0;
      will-change: opacity;
    }
    .load{
      &.starbucks{
        .circle {
          animation-duration: $starbucksDelay;
        }
      }
      &.carrefour{
        .circle {
          animation-duration: $carrefourDelay;
        }
      }
      &.cocacola{
        .circle {
          animation-duration: $cocacolaDelay;
        }
      }
      &.gestespropres{
        .circle {
          animation-duration: $lobbiesDelay;
        }
      }
      &.nestle{
        .circle {
          animation-duration: $nestleDelay;
        }
      }
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .circle {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
    }
    &.held{
      .circle {
        animation: stroke ease-out forwards;
        animation-duration: 4s;
      }
    }

    @keyframes stroke {
      to {
        stroke-dashoffset: 0;
      }
    }

  }
</style>
