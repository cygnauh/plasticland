<template id="cinematicObject">
    <div class="cinematicObject">
        <router-link to="/plasticland/" class="close-link">
            <div class="close-btn">
                <img :src="require('../../assets/img/close.png')" alt="close">
            </div>
        </router-link>
        <div class="inventory-btn-count">
            <span class="inventory-btn-obj-found">{{ objectFound }}</span>
            <div class="border-separator"></div>
            <span class="inventory-btn-obj-total">{{ totalObject }}</span>
        </div>
        <div
            v-for="(object) in objects.slice(objectFound, objectFound+1)"
            class="title"> {{ object.title }} </div>
        <div><p>en savoir plus</p></div>
    </div>
</template>

<script>
export default {
  name: 'CinematicObject',
  props: {},
  data () {
    return {
      totalObject: this.$store.state.objects.length
    }
  },
  computed: {
    objectFound () {
      return this.$store.state.objects.filter(item => item.found).length
    },
    objects () {
      return this.$store.state.objects.map((item) => {
        return item
      })
    }
  },
  created () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
    @import "./cinematicObject.scss";
</style>
