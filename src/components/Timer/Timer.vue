<template id="timer">
    <div class="timer">
        <span class="hour"> {{ hours }} </span>
        <span> : </span>
        <span class="minutes"> {{ minutes }} </span>
        <span> : </span>
        <span class="seconds"> {{ seconds }} </span>
    </div>
</template>

<script>
export default {
  name: 'Timer',
  data () {
    return {
      firstTime: 0,
      secondTime: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      ellapsedSeconds: 0,
      ellapsedMinutes: 0,
      ellapsedHours: 0
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
      this.ellapsedSeconds = this.secondTime - this.firstTime
      this.ellapsedSeconds /= 1000
      this.ellapsedSeconds = Math.round(this.ellapsedSeconds)
      this.ellapsedMinutes = Math.floor(this.ellapsedSeconds / 60)
      this.ellapsedHours = Math.floor(this.ellapsedMinutes / 60)

      if (this.ellapsedSeconds >= 60) {
        this.ellapsedSeconds = this.ellapsedSeconds - (this.ellapsedMinutes * 60)
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
