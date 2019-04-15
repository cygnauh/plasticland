<template>
  <div class="Stage">
    <canvas ref="canvas" id="canvas"> </canvas>
    <router-view @open-inventory="setInventoryState"/>
  </div>
</template>

<script>
import Vue from 'vue'
import Engine from '../three/Engine'

export default {
  name: 'Stage',
  data () {
    return {
      data: '',
      inventoryState: false
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
    if (this.inventory) Vue.prototype.$engine.setDisplayInventory(this.inventory)
    console.log(this.inventory)
    this.setInventory(this.inventory)
  },
  watch: {
    inventory (value) {
      this.setInventory(value)
      console.log('from stage', value)
    }
  },
  methods: {
    initScene () {
      Vue.prototype.$engine = new Engine(this.$refs.canvas)
    },
    setInventoryState (value) {
      this.inventoryState = true
      console.log(value, 'emit')
    },
    setInventory (value) {
      if (value && this.inventoryState) {
        Vue.prototype.$engine.setDisplayInventory(true)
        console.log('hello')
      } else {
        Vue.prototype.$engine.setDisplayInventory(false)
        console.log('good bye')
      }
    }
  }
}
</script>
