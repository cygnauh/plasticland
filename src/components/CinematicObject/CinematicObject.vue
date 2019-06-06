<template id="cinematicObject">
    <div class="cinematicObject">
        <div class="head">
            <router-link
              to="/plasticland">
              <div
                class="close-btn"
                @click="closeCinematic">
                <img :src="require('../../assets/img/close.png')" alt="close">
              </div>
            </router-link>
        </div>

        <div class="cinematicObject-scene" ref="cinematicObjectScene"></div>
        <div class="main">
            <div class="inventory-btn-count">
                <span class="inventory-btn-obj-found">{{ objectFound }}</span>
                <div class="border-separator"></div>
                <span class="inventory-btn-obj-total">{{ totalObject }}</span>
            </div>
            <div class="title"> {{ objectOpen.title }} </div>
            <div
               class="yellow-btn"
                @click="showDetail">
                <p><a href="#">en savoir plus</a></p>
            </div>
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
  },
  beforeDestroy () {
    this.$store.commit('setFoundObjectName', '')
    this.$store.commit('setCinematicObject', false)
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
      console.log(this.objects[this.objectFound - 1])
      return this.objects[this.objectFound - 1]
    }
  },
  methods: {
    closeCinematic () {
      this.$store.commit('setCinematicObject', false)
    },
    showDetail () {
      Vue.prototype.$engine.handleRender('detail')
      Vue.prototype.$engine.collectable.itemSelected = this.objectOpen.name
      Vue.prototype.$engine.collectable.openItem()
      this.$router.push({ // TODO : test which way is more interesting for routing
        path: `/plasticland/inventory/${this.objectOpen.id}`,
        component: InventoryDetail
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./cinematicObject.scss";
</style>
