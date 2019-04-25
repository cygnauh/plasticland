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
        name: "Timer",
        data() {
            return {
                firstTime: 0,
                secondTime: 0,
                ellapsedSeconds: 0,
                seconds: 0,
                minutes: 0,
                hours: 0
            }
        },
        methods: {
            initTime() {
                this.firstTime = new Date()
            },
            startTimer() {
                this.secondTime = new Date()

                this.ellapsedSeconds = this.secondTime - this.firstTime;
                this.ellapsedSeconds /= 1000
                this.ellapsedSeconds = Math.round(this.ellapsedSeconds)

                this.seconds = this.ellapsedSeconds
                this.minutes = Math.floor(this.ellapsedSeconds / 60)
                this.hours = Math.floor(this.minutes / 60)

                if (this.ellapsedSeconds >= 60) {
                this.seconds = this.ellapsedSeconds - (this.minutes * 60)
                }
            },
        },
        created() {
            setInterval(() => this.startTimer(), 1 * 1000)
        },
        mounted() {
            this.initTime()
        }
    }
</script>

<style lang="scss" scoped>
    @import "./timer.scss";
</style>

