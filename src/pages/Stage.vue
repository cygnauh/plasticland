<template>
  <div
    :class="{ 'blue-bg' : ($route.path !== '/plasticland') }"
    class="Stage">
    <div class="Stage-border">
      <div
        v-if="!displayReturn"
        class="title">
        {{ title }}
      </div>
      <router-link
        v-else
        to="/plasticland/inventory"
        >
        <div
          class="back">
          <img
            :src="require('../assets/img/svg/arrow.svg')"
            alt="back">
          <span>Retour à votre collection</span>
        </div>
      </router-link>
      <router-link
        to="/plasticland"
        v-if="$route.path !== '/plasticland'"
        class="close-link">
        <div class="close-btn">
          <img
            :src="require('../assets/img/svg/close.svg')"
            alt="Vue logo">
          <span>Fermer</span>
        </div>
      </router-link>
      <div class="right-side-content">
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
          <img
            :src="require('../assets/img/svg/volume.svg')"
            class="volume"
            alt="volume">
        </div>
        <div class="timer">
          <Timer></Timer>
        </div>
      </div>
    </div>
    <canvas
      ref="canvas"
      id="canvas"> </canvas>
    <router-view/>
    <router-link
      v-if="$route.path === '/plasticland'"
      to="/plasticland/inventory">
      <div
        class="interface inventory-btn"
        @click="testRoute">
        {{ objectFound }}
        /
        {{ totalObject }}
      </div>
    </router-link>
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
      data: '',
      title: 'Marécage de plastique',
      objectFound: 0,
      totalObject: 6,
      displayReturn: false
    }
  },
  mounted () {
    this.initScene()
    if (this.inventory) this.setInventory(this.inventory)
    this.checkRoute(this.$route.path)
  },
  watch: {
    $route (to) {
      this.checkRoute(to.path)
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
    },
    checkRoute (route) {
      if (route === '/plasticland/inventory') {
        this.title = 'Explorez votre collection'
        this.setInventory(true)
        this.displayReturn = false
      } else if (route === '/plasticland') {
        this.setInventory(false)
        this.displayReturn = false
        this.title = 'Marécage de plastique' // to be set incording to Place
      } else {
        this.displayReturn = true
      }
    },
    testRoute () {
      this.$router.push('inventory')
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
      font-family: Arkhip, sans-serif;
    }
    .back{
      display: flex;
      img{
        width: 17px;
        height: 19px;
      }
      span{
        padding-left: 10px;
      }
      font-size: 14px;
      font-family: ApercuPro, sans-serif;
      color: $sand_yellow;
    }
    .router-link-active{
      top: 0;
      text-decoration: none;
      &.close-link{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      .close-btn{
        cursor: pointer;
        display: flex;
        flex-direction: column;
        img{
          width: 51px;
          height: 51px;
        }
        span{
          margin-top: 13px;
          color: $sand_yellow;
          text-transform: uppercase;
          text-underline: transparent;
          font-family: ApercuPro, sans-serif;
          font-size: 14px;
        }
        &:hover{
          cursor: pointer;
        }
      }
    }
    .right-side-content{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .menu{
        text-decoration: none;
        display: flex;
        a{
          padding: 0 10px;
          text-decoration: none;
          font-size: 14px;
          font-family: ApercuPro, sans-serif;
          font-weight: 400;
          color: $sand_yellow;
        }
        .volume{
          align-self: end;
          padding: 0 10px;
          width: 20px;
          height: 17px;
        }
      }
      .timer{
        padding: 10px 5px;
      }
    }
  }
    .inventory-btn{
      bottom: 28px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border-left: solid 10px rgba(254, 248, 239, 0.11);
      border-top: solid 10px rgba(254, 248, 239, 0.11);
      position: absolute;
      font-family: Arkhip, sans-serif;
      font-size: 46px;
      color: white;
    }
}
</style>
