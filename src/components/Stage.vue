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
      <div
        v-else
        class="back"
        @click="backToInventoryList">
        <img
          :src="require('../assets/img/svg/arrow.svg')"
          alt="back">
        <span>Retour à votre collection</span>
      </div>
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
        @click="goInventory">
        <span class="inventory-btn-title">collection</span>
        <div class="inventory-btn-count">
          <span class="inventory-btn-obj-found">{{ objectFound }}</span>
          <div class="border-separator"></div>
          <span class="inventory-btn-obj-total">{{ totalObject }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue'
// import Engine from '../three/Engine'
import App from '../three/App'
import Timer from './Timer/Timer'
import InventoryList from './Inventory/InventoryList'
import { store } from '../store/index'

export default {
  name: 'Stage',
  components: { Timer },
  data () {
    return {
      data: '',
      title: 'Marécage de plastique',
      objectFound: store.state.objects.filter(item => item.found).length,
      totalObject: store.state.objects.length,
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
      Vue.prototype.$engine = new App(this.$refs.canvas) // init scene
      if (this.$route.path === '/plasticland/inventory') {
        this.setInventory(true)
      }
    },
    setInventory (value) {
      Vue.prototype.$engine.setDisplayInventory(value)
    },
    goInventory () {
      this.$router.push({
        path: `/plasticland/inventory`,
        component: InventoryList
      })
    },
    backToInventoryList () {
      Vue.prototype.$engine.collectable.backToList()
      this.goInventory()
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
      margin-left: 43px;
      bottom: 38px;
      width: 250px;
      height: 83px;
      position: absolute;
      z-index: 0;
      font-family: Arkhip, sans-serif;
      color: white;
      display: flex;
      background: url('../assets/img/svg/border-collection-cta.svg') left no-repeat;
      background-size: contain;
      .inventory-btn-title{
        align-self: center;
        width: calc(100% - 90px);
        font-size: 16px;
        text-transform: uppercase;
      }
      .inventory-btn-count{
        width: 85px;
        height: 83px;
        display: flex;
        justify-content: center;
        border-left: solid 2px $medium_grey;
        background: linear-gradient(225deg, rgba(251, 210, 73, 0), rgba(253, 219, 106, 0.4) 43%, #ffe48b);;
        span{
          font-size: 31px;
          position: relative;
        }
        .border-separator{
          transform-origin: center;
          transform: rotate(45deg);
          margin: 5px;
          width: 2px;
          background: white;
          height: 30px;
          position: relative;
          top: 20px;
        }
        .inventory-btn-obj-found{
          top:12px;
        }
        .inventory-btn-obj-total{
          top:41px;
        }
      }
    }
}
</style>
