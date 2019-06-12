<template>
  <div
        v-if="$route.path === '/plasticland'"
        :class="{held:hoverAndHold}"
       :style="style"
       class="hover-and-hold">
    <div class="text">
      Hold to collect
    </div>
    <div :class="[place, {held:hoverAndHold}]"
         class="load">
      <svg height="84" width="84">
        <circle
          class="circle"
          cx="42"
          cy="42"
          r="40"
          stroke-width="2"
          fill-opacity="0" />
      </svg>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'HoverAndHold',
  data () {
    return {
      clientX: 0,
      clientY: 0
    }
  },
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
        console.log(Vue.prototype.$engine.clientX)
        console.log(Vue.prototype.$engine.clientY)
        return this.$store.state.currentPlace.name
      }
      return ''
    },
    posX () {
      if (Vue.prototype.$engine) {
        console.log(Vue.prototype.$engine)
        return (Vue.prototype.$engine.clientX / 2) + 30
      }
      return 500
    },
    posY () {
      if (Vue.prototype.$engine) {
        console.log(Vue.prototype.$engine.clientY)
        return Vue.prototype.$engine.clientY / 2
      }
      return 500
    },
    style () {
      return { transform: 'translateX(' + this.clientX + 'px) translateY(' + this.clientY + 'px)' }
    }
  },
  mounted () {
    window.addEventListener('mousemove', (e) => {
      this.getMouseValue(e)
    })
  },
  methods: {
    getMouseValue (e) {
      this.clientX = e.clientX * 0.96
      this.clientY = e.clientY * 0.8
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/index';
  .hover-and-hold{
    width: 90px;
    height: 127px;
    position: absolute;
    z-index: -10;
    /*transform: translateX(500px) translateY(500px);*/
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
      font-family: AxeHandel, sans-serif;
      font-size: larger;
      color: #1d2535;
      text-transform: uppercase;
      margin-bottom: 8px;
      /*color: #1d2535;*/
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
      position: relative;
    }
    .circle {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      stroke: $dark_blue;

      /*animation: stroke ease-out forwards;*/
      /*animation-duration: 4s;*/
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
