<template>
  <div class="Stage">
    <canvas ref="canvas" id="canvas"> </canvas>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import Engine from '../three/Engine'

export default {
  name: 'Stage',
  data () {
    return {
      data: ''
    }
  },
  props: {
    inventory: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.initScene()
  },
  methods: {
    initScene () {
      Vue.prototype.$engine = new Engine(this.$refs.canvas)
    }
  }
}
</script>
