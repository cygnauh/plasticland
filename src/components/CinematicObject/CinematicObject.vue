<template id="cinematicObject">
    <div class="cinematicObject">

        <!--<div class="cinematicObject-scene" ref="cinematicObjectScene"></div>-->
        <div class="main">
            <router-link to="/plasticland">
                <div class="close-btn" @click="closeCinematic">
                    <img :src="require('../../assets/img/close.png')" alt="close">
                </div>
            </router-link>
            <div class="title"> {{ objectOpen.title }}</div>
            <router-link :to="detailRoute">
                <div class="yellow-btn" @click="showDetail">
                    <p><a href="#">en savoir plus</a></p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import InventoryDetail from '../Inventory/InventoryDetail'
export default {
  name: 'CinematicObject',
  props: {},
  data () {
    return {
      totalObject: this.$store.state.objects.length
    }
  },
  created () {
  },
  mounted () {
    this.$store.commit('setSelectedItemContainer', this.$refs.cinematicObjectScene)
    // Vue.prototype.$engine.handleRender('cinematic')
  },
  beforeDestroy () {
    this.$store.commit('setCinematicObject', false)
    Vue.prototype.$engine.objectsToCollect.close()
  },
  computed: {
    objectFound () {
      return this.$store.state.objects.filter(item => item.found).length
    },
    objects () {
      return this.$store.state.objects.map((item) => {
        return item
      })
    },
    objectOpen () {
      return this.objects[this.objectFound - 1]
    },
    detailRoute () {
      return `/plasticland/inventory/${this.objectOpen.id}`
    }
  },
  methods: {
    closeCinematic () {
      this.$store.commit('setCinematicObject', false)
      if (this.$store.state.objects.filter(item => item.found).length === 1 && !this.$store.state.didacticiels.filter(item => item.name === 'collection').show) {
        // show last didacticiel
        // console.log('close setCinematicObject')
        this.$store.commit('showCollectionDidacticiel')
      }
    },
    showDetail () {
      Vue.prototype.$engine.handleRender('detail')
      Vue.prototype.$engine.collectable.itemSelected = this.objectOpen.name
      Vue.prototype.$engine.collectable.openItem()
      this.$store.commit('sePreviousRoute', true)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./cinematicObject.scss";
</style>
