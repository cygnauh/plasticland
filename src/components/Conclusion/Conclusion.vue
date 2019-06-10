<template>
    <div class="conclusion">
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
                <div class="petition"><p><a href="https://www.change.org/p/usines-plastiques-7%C3%A8me-continent" target="_blank">SIGNEZ UNE PETITION</a></p></div>
                <router-link to="/plasticland/inventory">
                    <div class="collection" @click="closeConclusion">
                        <p><a href="#" >COLLECTION</a></p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Conclusion',
  data () {
    return {
      totalEllapsedSeconds: this.$store.state.time.totalEllapsedSeconds,
      ellapsedSeconds: this.$store.state.time.ellapsedSeconds,
      ellapsedMinutes: this.$store.state.time.ellapsedMinutes,
      ellapsedHours: this.$store.state.time.ellapsedHours,
      totalObject: this.$store.state.objects.length,
      totalPlasticWaste: 0
    }
  },
  computed: {
    objectFound () {
      return this.$store.state.objects.filter(item => item.found).length
    }
  },
  methods: {
    conversionPlasticWaste () {
      this.totalPlasticWaste = this.totalEllapsedSeconds * 206
      return this.totalPlasticWaste
    },
    closeConclusion () {
      this.$store.commit('setConclusion', false)
    }
  }
}
</script>

<style lang="scss">
    @import "conclusion";
</style>
