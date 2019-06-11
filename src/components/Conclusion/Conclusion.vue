<template>
    <transition name="fade">
        <div class="conclusion" v-if="isShowing">
            <div class="head">
                <router-link to="/plasticland">
                    <div class="back-btn" @click="closeConclusion">
                        <img :src="require('../../assets/img/go-back.png')" alt="go back">
                    </div>
                </router-link>
            </div>

            <div class="main">
                <div class="inventory-btn-count">
                    <span class="inventory-btn-obj-found">{{ objectFound }}</span>
                    <div class="border-separator"></div>
                    <span class="inventory-btn-obj-total">{{ totalObject }}</span>
                </div>
                <h3>Vous avez terminé votre voyage à Plasticland en <span>{{ellapsedHours}}:{{ellapsedMinutes}}:{{ellapsedSeconds}}</span> secondes. Ce qui équivaut à</h3>
                <h1>{{totalPlasticWaste}}<sup>kg</sup></h1>
                <h2>de Déchets plastiques rejetés dans l’océan*</h2>
                <div class="buttons">
                    <div class="petition">
                        <p>
                            <a href="https://www.change.org/p/usines-plastiques-7%C3%A8me-continent" target="_blank">SIGNEZ UNE PETITION</a>
                        </p>
                    </div>
                    <div class="collection" @click="closeConclusion">
                        <p>
                            <router-link to="/plasticland/inventory">
                                <a href="#" >COLLECTION</a>
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'Conclusion',
  data () {
    return {
      isShowing: false,
      totalEllapsedSeconds: this.$store.state.time.totalEllapsedSeconds,
      ellapsedSeconds: this.$store.state.time.ellapsedSeconds,
      ellapsedMinutes: this.$store.state.time.ellapsedMinutes,
      ellapsedHours: this.$store.state.time.ellapsedHours,
      totalObject: this.$store.state.objects.length,
      totalPlasticWaste: this.conversionPlasticWaste()
    }
  },
  computed: {
    objectFound () {
      return this.$store.state.objects.filter(item => item.found).length
    },
    splinePosition () {
      return this.$store.state.splinePosition
    }
  },
  watch: {
    splinePosition () {
      if (this.splinePosition >= 0.95) {
        this.openConclusion()
      }
    }
  },
  methods: {
    conversionPlasticWaste () {
      this.totalPlasticWaste = this.totalEllapsedSeconds * 206
      return this.totalPlasticWaste
    },
    closeConclusion () {
      this.isShowing = false
      this.$store.commit('setConclusion', false)
    },
    openConclusion () {
      this.isShowing = true
      this.$store.commit('setConclusion', true)
    }
  }
}
</script>

<style lang="scss">
    @import "conclusion";
</style>
