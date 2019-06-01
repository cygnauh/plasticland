<template id="timer">
    <div
        :class="theme"
        class="timer">
        <span class="hour item"> {{ hours }} </span>
        <span> : </span>
        <span class="minutes item"> {{ minutes }} </span>
        <span> : </span>
        <span class="seconds item"> {{ seconds }} </span>
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
      seconds: 0,
      minutes: 0,
      hours: 0,
      ellapsedSeconds: 0,
      ellapsedMinutes: 0,
      ellapsedHours: 0,
      finished: false,
      totalPlasticWaste: 0,
      totalEllapsedSeconds: 0
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

      if (this.totalEllapsedSeconds >= 60) {
        this.ellapsedSeconds = this.totalEllapsedSeconds - (this.totalEllapsedSeconds * 60)
      }
    },
    conversionPlasticWaste () {
      if (this.finished) {
        this.totalPlasticWaste = this.totalEllapsedSeconds * 206
        return this.totalPlasticWaste
      }
    },
    updateClock () {
      this.seconds = this.secondTime.getSeconds()
      this.minutes = this.secondTime.getMinutes()
      this.hours = this.secondTime.getHours()
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./timer.scss";
</style>
