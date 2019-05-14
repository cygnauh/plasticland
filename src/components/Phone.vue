<template>
  <div class="Phone">
      <div class="Phone-bg">
          <div class="Phone-border">
              <div class="countdown-container">
                  <div class="countdown">
                      <span>{{ count }}</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Phone',
  data () {
    return {
      count: 3,
	  countDown: null
    }
  },
  mounted () {
    this.countToZero()
  },
  methods: {
    countToZero () {
      this.countDown = setInterval(() => {
        if (!this.count) {
          this.stopCountDown()
          return
        }
        this.count -= 1
      }, 1000)
    },
    stopCountDown () {
      clearInterval(this.countDown)
    }
  }
}
</script>
<style lang="scss">
@import '../assets/scss/index';
.Phone{
    width: 616px;
    height: 306px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    &-bg {
        border-radius: 45px;
        height: calc(100% - 4px);
        background: url('../assets/img/photograph_plastic_ocean.jpg') no-repeat;
        background-position-y: 4px;
        background-size: 100% 100%;
    }
    &-border{
        height: 100%;
        background: url('../assets/img/svg/phone-border.svg') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        .countdown-container{
            border: solid 1px $sand_yellow;
            width: 150px;
            height: 80px;
            display: flex;
            align-self: center;
            align-items: center;
            justify-content: center;
            .countdown{
                height: 50px;
                width: 50px;
                border-radius: 50%;
                align-self: center;
                color: $sand_yellow;
                border: solid 1px $sand_yellow;
                display: flex;
                align-items: center;
                justify-content: center;
                span{
                    font-size: 30px;
                    font-family: ApercuPro, sans-serif;
                    height: 35px;
                }
            }
        }
    }
}
</style>
