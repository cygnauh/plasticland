<template>
  <div class="Stage">
    <Timer></Timer>
    <canvas
      ref="canvas"
      id="canvas">
    </canvas>
  </div>
</template>

<script>
import Vue from 'vue'
import Engine from '../three/Engine'
import Timer from '../components/Timer/Timer'
export default {
  name: 'Stage',
  components: { Timer },
  data () {
    return {
      data: ''
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
