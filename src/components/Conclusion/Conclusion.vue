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
                <h1>{{conversionPlasticWaste}}<sup>kg</sup></h1>
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
      ellapsedSeconds: 0,
      ellapsedMinutes: 0,
      ellapsedHours: 0,
      totalEllapsedSeconds: 0,
      totalObject: this.$store.state.objects.length - 1
    }
  },
  computed: {
    objectFound () {
      return this.$store.state.objects.filter(item => item.found).length
    },
    currentVoiceOverSeek () {
      return this.$store.state.currentVoiceOverSeek
    },
    firstTime () {
      return this.$store.state.time.firstTime
    },
    secondTime () {
      return this.$store.state.time.secondTime
    },
    conversionPlasticWaste () {
      return this.totalEllapsedSeconds * 206
    }
  },
  watch: {
    currentVoiceOverSeek () {
      if (this.currentVoiceOverSeek >= 79 && this.currentVoiceOverSeek < 85) {
        this.openConclusion()
      }
    }
  },
  created () {
    setInterval(() => {
      this.startTimer()
    }, 1 * 1000)
  },
  methods: {
    startTimer () {
      this.totalEllapsedSeconds = this.secondTime - this.firstTime
      this.totalEllapsedSeconds /= 1000
      this.totalEllapsedSeconds = Math.round(this.totalEllapsedSeconds)
      this.ellapsedMinutes = Math.floor(this.totalEllapsedSeconds / 60)
      this.ellapsedHours = Math.floor(this.ellapsedMinutes / 60)

      this.ellapsedSeconds = this.totalEllapsedSeconds
      if (this.ellapsedSeconds >= 60) {
        this.ellapsedSeconds = this.ellapsedSeconds - (this.ellapsedMinutes * 60)
      }
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
