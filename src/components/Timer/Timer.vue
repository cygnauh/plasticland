<template id="timer">
    <div
        :class="theme"
        class="timer">
        <span class="hour item"> {{ ellapsedHours }} </span>
        <span> : </span>
        <span class="minutes item"> {{ ellapsedMinutes }} </span>
        <span> : </span>
        <span class="seconds item"> {{ ellapsedSeconds }} </span>
    </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    theme: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      firstTime: 0,
      secondTime: 0,
      ellapsedSeconds: 0,
      ellapsedMinutes: 0,
      ellapsedHours: 0,
      totalEllapsedSeconds: 0
    }
  },
  watch: {
    updateStore () {
      this.updateStore()
    }
  },
  created () {
    setInterval(() => {
      this.initSecondTime()
      this.updateClock()
      this.startTimer()
    }, 1 * 1000)
  },
  mounted () {
    this.initFirstTime()
  },
  methods: {
    initFirstTime () {
      this.firstTime = new Date()
    },
    initSecondTime () {
      this.secondTime = new Date()
    },
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
    updateClock () {
      this.seconds = this.secondTime.getSeconds()
      this.minutes = this.secondTime.getMinutes()
      this.hours = this.secondTime.getHours()
    },
    updateStore () {
      const array = [this.ellapsedSeconds, this.ellapsedMinutes, this.ellapsedHours, this.totalEllapsedSeconds]
      this.$store.commit('setTimeEllapsed', array)
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./timer.scss";
</style>
