<template>
  <div class="Stage">
    <Loader />
    <div class="Stage-border-top">
      <div class="title">
        {{ title }}
      </div>
      <router-link
        to="/plasticland">
        <div
          class="back"
          v-if="$route.path === '/plasticland/inventory'">
          <img
            :src="require('../assets/img/back.png')"
            alt="back">
          <span>Retour</span>
        </div>
      </router-link>
      <router-link
        to="/plasticland/inventory"
        v-if="$route.path !== '/plasticland' && $route.path !== '/plasticland/inventory'"
        class="close-link">
        <div
          :class="[$route.path !== '/plasticland' && $route.path !== '/plasticland/inventory' ? 'show' : '']"
          class="close-btn"
          @click="goInventory">
          <img
            :src="require('../assets/img/close.png')"
            alt="Vue logo">
        </div>
      </router-link>
      <div class="right-side-content-top">
        <div
          :class="{ 'dark' : ($route.path !== '/plasticland') }"
          class="menu">
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
          <Timer :theme="$route.path !== '/plasticland' ? 'dark': ''"></Timer>
        </div>
      </div>
    </div>
    <div class="Stage-border-bottom">
      <div class="left-side-content-bottom">
        <router-link
          v-if="$route.path === '/plasticland'"
          to="/plasticland/inventory">
          <div
            class="interface inventory-btn"
            @click="goInventory">
            <div class="inventory-btn-title">
              <span>
                collection
              </span>
            </div>
            <div
              :class="{notif : displayNotif}"
              class="inventory-btn-count">
              <span class="inventory-btn-obj-found">{{ objectFound }}</span>
              <div class="border-separator"></div>
              <span class="inventory-btn-obj-total">{{ totalObject }}</span>
            </div>
          </div>
        </router-link>
      </div>
      <div class="right-side-content-bottom">
        <Radar v-if="$route.path === '/plasticland'"></Radar>
      </div>
      <div class="subtitle-container">
        <Subtitle text="subtitle is coming"/>
      </div>

    </div>
    <router-view/>
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>

<script>
import Vue from 'vue'
// import Engine from '../three-examples/Engine'
import App from '../three/App'
import Loader from './Loader/Loader'
import Subtitle from './Subtitle'
import Timer from './Timer/Timer'
import Radar from './Radar/Radar'
import InventoryList from './Inventory/InventoryList'

export default {
  name: 'Stage',
  components: { Loader, Timer, Subtitle, Radar },
  data () {
    return {
      data: '',
      objectFound: this.$store.state.objects.filter(item => item.found).length,
      totalObject: this.$store.state.objects.length,
      displayReturn: false,
	  displayNotif: false
    }
  },
  computed: {
    title () {
      return this.$store.state.currentPlace.name
    }
  },
  mounted () {
    setTimeout(() => { this.$store.commit('setCurrentPlace', 'success') }, 3000)
    this.initScene()
    this.checkRoute(this.$route.path)
    document.addEventListener('click', (e) => this.handleClick(e), false)
  },
  watch: {
    $route (to) {
      this.checkRoute(to.path)
    }
  },
  methods: {
    initScene () {
      Vue.prototype.$engine = new App(this.$refs, this.$store) // init scene
      if (this.$route.path === '/plasticland/inventory') {
        this.goTo('list')
      }
    },
    goTo (value) {
      Vue.prototype.$engine.handleRender(value)
    },
    goInventory () {
      this.displayNotif = false
      this.$router.push({
        path: `/plasticland/inventory`,
        component: InventoryList
      })
    },
    checkRoute (route) {
      switch (route) {
        case '/plasticland/inventory':
          this.goTo('list')
          this.displayReturn = false
          break
        case '/plasticland':
          this.goTo('scene')
          this.displayReturn = false
          break
        default:
          this.displayReturn = true
      }
    },
    handleClick () {
      let foundObj = this.$store.state.objects.filter(item => item.found).length
	  if (this.objectFound !== foundObj) {
      	this.displayNotif = true
        this.objectFound = foundObj
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
  height: 100vh;
  /*#app > div > div > div.right-side-content > div.menu > a:nth-child(1) > span*/
  &-border-top {
    position: absolute;
    top: 0;
    z-index: 3;
    margin: 18px;
    width: calc(100% - 36px);
    height: 102px;
    display: flex;
    justify-content: space-between;
    color: $dark_blue;
    .title{
      font-size: 18px;
      font-family: AxeHandel, sans-serif;
    }
    .back{
      display: flex;
      img{
        margin-top: 2px;
        width: 17px;
        height: 19px;
      }
      span{
        padding-left: 10px;
      }
      font-size: 22px;
      font-family: AxeHandel, sans-serif;
      color: $medium_grey;
    }
    .router-link-active{
      top: 0;
      text-decoration: none;
      &.close-link{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .close-btn{
      cursor: pointer;
      display: flex;
      flex-direction: column;
      opacity: 0;
      will-change: opacity;
      transition: opacity 1s ease-in-out;
      transform: translateX(-50%);
      &.show{
        transition: opacity 1s ease-in-out;
        opacity: 1;
      }
      img{
        width: 51px;
        height: 51px;
      }
      span{
        margin-top: 13px;
        color: $sand_yellow;
        text-transform: uppercase;
        text-underline: transparent;
        font-family: AxeHandel, sans-serif;
        font-size: 22px;
      }
      &:hover{
        cursor: pointer;
      }
    }
    .right-side-content-top{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100vw;
      .menu{
        text-decoration: none;
        display: flex;
        &.dark{
          a{
            color: $medium_grey;
          }
        }
        a{
          padding: 0 10px;
          text-decoration: none;
          font-size: 22px;
          font-family: AxeHandel, sans-serif;
          font-weight: 400;
          color: $light_grey;
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
  &-border-bottom {
    position: absolute;
    bottom: 0;
    z-index: 1;
    margin: 18px;
    width: calc(100% - 36px);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    /*justify-content: flex-end;*/
    color: $dark_blue;
    a {
      text-decoration: none;
    }
    .inventory-btn{
      width: 241px;
      height: 79px;
      position: relative;
      z-index: 0;
      font-family: AxeHandel, sans-serif;
      color: $light_grey;
      display: flex;
      .inventory-btn-title{
        display: flex;
        align-items: center;
        width: calc(100% - 83px);
        font-size: 28px;
        text-transform: uppercase;
        background: url('../assets/img/svg/collectable-t-bg.svg') no-repeat center center;
        background-size: contain;
        border-radius: 5px;
        height: 79px;
        span{
          width: 100%;
        }
      }
      .inventory-btn-count{
        width: 85px;
        height: 79px;
        display: flex;
        justify-content: center;
        margin-left: 5px ;
        /*background: none;*/
        background: url('../assets/img/svg/collectable-n-bg.svg') no-repeat;
        background-size: contain;
        border-radius: 5px;
        &.notif{
          background: linear-gradient(225deg, rgba(251, 210, 73, 0), rgba(253, 219, 106, 0.4) 43%, #ffe48b);
        }
        span{
          font-size: 41px;
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
          top:3px;
        }
        .inventory-btn-obj-total{
          top:31px;
        }
      }
    }
    .subtitle-container{
      position: absolute;
      border: 0;
      width: 100%;
      height: 0;
      bottom: 90px;
    }
  }
}
</style>
