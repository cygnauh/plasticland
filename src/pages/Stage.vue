<template>
  <div
    :class="{ 'blue-bg' : ($route.path !== '/plasticland') }"
    class="Stage">
    <div class="Stage-border">
      <div class="title">
        {{ title }}
      </div>
      <router-link
        to="/plasticland"
        v-if="$route.path !== '/plasticland'"
      >
        <div class="close-btn">
          Fermer
        </div>
      </router-link>
      <div class="menu">
        <router-link to="/plasticland/about">
          <span>
            à propos
          </span>
        </router-link>
        <router-link to="/plasticland/credits">
          <span>
            crédits
          </span>
        </router-link>
        <span>
          son
        </span>
      </div>
    </div>
    <canvas
      ref="canvas"
      id="canvas"> </canvas>
    <router-view/>
    <router-link
      v-if="$route.path !== '/plasticland/inventory'"
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
      data: '',
      title: 'Marécage de plastique'
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
@import '../assets/scss/index';
.Stage{
  position: relative;
  border: 0;
  margin: 0;
  padding: 0;
  &.blue-bg{
    background: $dark_blue;
  }
  &-border {
    position: absolute;
    z-index: 2;
    margin: 18px;
    width: calc(100% - 36px);
    height: 102px;
    display: flex;
    justify-content: space-between;
    color: $sand_yellow;
    text-transform: uppercase;
    .title{
      font-size: 18px;
    }
    .router-link-active{
      top: 0;
      position: relative;
      text-decoration: none;
      .close-btn{
        color: $sand_yellow;
        cursor: pointer;
        text-transform: uppercase;
        text-underline: transparent;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .menu{
      display: flex;
      font-size: 14px;
    }
  }
    .inventory-btn{
      bottom: 28px;
      width: 100px;
      height: 100px;
      background: green;
      position: absolute;
    }
}
</style>
