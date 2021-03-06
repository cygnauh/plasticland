<template>
  <div class="Stage">
    <Loader />
    <div class="Stage-border-top">
      <div
        v-if="$route.path === '/plasticland' && !displayConclusion"
        class="title">
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
          <span>Back</span>
        </div>
      </router-link>
      <div
        v-if="$route.path !== '/plasticland' && $route.path !== '/plasticland/inventory' && $route.path !== '/plasticland/cinematic'"
        class="close-link">
        <div
          :class="[$route.path !== '/plasticland' && $route.path !== '/plasticland/inventory' ? 'show' : '']"
          class="close-btn"
          @click="closeInventoryDetail">
          <img
            :src="require('../assets/img/close.png')"
            alt="Vue logo">
        </div>
      </div>
      <div class="right-side-content-top">
        <div
          :class="{ 'dark' : ($route.path !== '/plasticland') }"
          class="menu">
          <router-link to="/plasticland/about">
            <span>
              about
            </span>
          </router-link>
          <router-link to="/plasticland/credits">
            <span>
              credits
            </span>
          </router-link>
          <img
            :src="require('../assets/img/svg/volume.svg')"
            class="volume"
            alt="volume">
        </div>
        <div :style="[!displayConclusion ? {opacity: 1} : {opacity: 0}]"
             class="timer">
          <Timer :theme="$route.path !== '/plasticland' ? 'dark': ''"></Timer>
        </div>
      </div>
    </div>
    <div class="Stage-border-bottom">
      <Didactiel
        v-if="$route.path === '/plasticland'"
        :show-last-didac="showInventoryCta"/>
      <div class="left-side-content-bottom">
        <router-link
          v-if="$route.path === '/plasticland' && showInventoryCta && !displayConclusion"
          to="/plasticland/inventory">
          <div
            class="interface inventory-btn">
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
        <!--<Radar v-if="$route.path === '/plasticland' && !displayConclusion && showRadar"></Radar>-->
        <Radar :style="[showRadar && !displayConclusion ? {opacity: 1} : {opacity: 0}]" v-if="$route.path === '/plasticland'"
        ></Radar>
      </div>
    </div>
    <div class="subtitle-container">
      <Subtitle/>
    </div>
    <router-view/>
    <!--<CinematicObject v-if="hasFoundObject"/>-->
    <Conclusion v-if="$route.path === '/plasticland'"/>
    <Intro></Intro>
    <HoverAndHold></HoverAndHold>
    <canvas ref="canvas" id="canvas"></canvas>
  </div>
</template>
<script>
import Vue from 'vue'
import App from '../three/App'
import Loader from './Loader/Loader'
import Subtitle from './Subtitle'
import Timer from './Timer/Timer'
import Radar from './Radar/Radar'
import Didactiel from './didacticiel/Didactiel'
// import InventoryList from './Inventory/InventoryList'
import CinematicObject from './CinematicObject/CinematicObject'
import Intro from './Introduction'
import Conclusion from './Conclusion/Conclusion'
import HoverAndHold from './HoverAndHold'

export default {
  name: 'Stage',
  components: { Conclusion, CinematicObject, Loader, Timer, Subtitle, Radar, Didactiel, Intro, HoverAndHold },
  data () {
    return {
      data: '',
      objectFound: this.$store.state.objects.filter(item => item.found).length,
      totalObject: this.$store.state.objects.length - 1,
      displayReturn: false,
      displayNotif: false
    }
  },
  mounted () {
    setTimeout(() => { this.$store.commit('setCurrentPlace', 'success') }, 3000)
    this.initScene()
    this.checkRoute(this.$route.path)
    document.addEventListener('click', (e) => this.handleClick(e), false)
  },
  computed: {
    title () {
      return this.$store.state.currentPlace.name
    },
    hasFoundObject () {
      return this.$store.state.displayCinematicObject
    },
    displayIntro () {
      return this.$store.state.displayIntro
    },
    showInventoryCta () {
      return this.$store.state.collectionDidacticiel
    },
    showRadar () {
      return this.$store.state.didacticiels.filter(item => item.name === 'radar')[0].active
    },
    displayConclusion () {
      return this.$store.state.displayConclusion
    }
  },
  watch: {
    $route (to) {
      this.checkRoute(to.path)
    },
    hasFoundObject (value) {
      if (value) {
        this.$router.push({
          path: `/plasticland/cinematic`,
          component: CinematicObject
        })
      }
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
    closeInventoryDetail () {
      if (this.$store.state.isPreviousCinematic) {
        this.$router.go(-2)
        this.$store.commit('sePreviousRoute', false)
      } else {
        this.$router.go(-1)
      }
      if (this.$store.state.objects.filter(item => item.found).length === 1 && !this.$store.state.didacticiels.filter(item => item.name === 'collection').show) {
        // show last didacticiel
        this.$store.commit('showCollectionDidacticiel')
      }
    },
    checkRoute (route) {
      switch (route) {
        case '/plasticland/inventory':
          this.goTo('list')
          this.$store.commit('setCurrentRoute', '/plasticland/inventory')
          this.displayReturn = false
          break
        case '/plasticland':
          this.goTo('scene')
          this.$store.commit('setCurrentRoute', '/plasticland')
          this.displayReturn = false
          break
        default:
          this.$store.commit('setCurrentRoute', '')
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
@import '../assets/scss/stage';
</style>
