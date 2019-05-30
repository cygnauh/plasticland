<template>
  <div
    class="Stage">
    <Loader />
    <div class="Stage-border">
      <div
        v-if="!displayReturn">
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
          <!--<img-->
          <!--:src="require('../assets/img/svg/volume.svg')"-->
          <!--class="volume"-->
          <!--alt="volume">-->
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
</template>

<script>
import Vue from 'vue'
// import Engine from '../three-examples/Engine'
import App from '../three/App'
import Loader from './Loader/Loader'
import Timer from './Timer/Timer'
import InventoryList from './Inventory/InventoryList'
import { store } from '../store/index'

export default {
  name: 'Stage',
  components: { Loader, Timer },
  data () {
    return {
      data: '',
      title: 'Marécage de plastique',
      objectFound: store.state.objects.filter(item => item.found).length,
      totalObject: store.state.objects.length,
      displayReturn: false,
	  displayNotif: false
    }
  },
  mounted () {
    this.initScene()
    if (this.inventory) this.setInventory(this.inventory)
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
      Vue.prototype.$engine = new App(this.$refs) // init scene
      if (this.$route.path === '/plasticland/inventory') {
        this.setInventory(true)
      }
    },
    setInventory (value) {
      Vue.prototype.$engine.setDisplayInventory(value)
    },
    goInventory () {
      this.displayNotif = false
      if (!this.displayPhone) {
        this.$router.push({
          path: `/plasticland/inventory`,
          component: InventoryList
        })
      }
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
        this.title = 'Montagne de recyclage' // to be set incording to Place
      } else {
        this.displayReturn = true
      }
    },
    handleClick () {
      let foundObj = store.state.objects.filter(item => item.found).length
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
  /*#app > div > div > div.right-side-content > div.menu > a:nth-child(1) > span*/
  &-border {
    position: absolute;
    z-index: 2;
    margin: 18px;
    width: calc(100% - 36px);
    height: 102px;
    display: flex;
    justify-content: space-between;
    color: $dark_blue;
    text-transform: uppercase;
    .title{
      font-size: 18px;
      font-family: AxeHandel, sans-serif;
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
      font-size: 22px;
      font-family: AxeHandel, sans-serif;
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
          font-family: AxeHandel, sans-serif;
          font-size: 22px;
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
    .inventory-btn{
      margin-left: 43px;
      bottom: 38px;
      width: 241px;
      height: 79px;
      position: absolute;
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
}
</style>
