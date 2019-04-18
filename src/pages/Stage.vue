<template>
  <div class="Stage">
    <canvas
      ref="canvas"
      id="canvas"> </canvas>
    <router-view/>
    <router-link
      to="/plasticland/inventory">
      <div
        class="interface inventory-btn">
        Inventory
      </div>
    </router-link>
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
  mounted () {
    this.initScene()
    if (this.inventory) this.setInventory(this.inventory)
  },
  watch: {
    $route (to, from) {
      if (to.path === '/plasticland/inventory') {
        this.setInventory(true)
      } else {
        if (to.path === '/plasticland') this.setInventory(false)
      }
      // console.log(to.path, from)
    }
  },
  methods: {
    initScene () {
      Vue.prototype.$engine = new Engine(this.$refs.canvas) // init scene
      if (this.$route.path === '/plasticland/inventory') {
        this.setInventory(true)
      }
    },
    setInventory (value) {
      Vue.prototype.$engine.setDisplayInventory(value)
    }
  }
}
</script>
<style lang="scss">
.Stage{
  background: orange;
  position: relative;
  border: 0;
  margin: 0;
  padding: 0;
  .inventory-btn{
    bottom: 28px;
    width: 100px;
    height: 100px;
    background: green;
    position: absolute;
  }
}
</style>
