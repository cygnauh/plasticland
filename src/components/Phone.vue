<template>
    <div :class="{'show-phone': showPhone}"
         class="Phone">
        <div
            :class="{show: showPhoto}"
            class="Phone-bg">
            <div
                class="Phone-dark">
                <div
                    :class="{open: openCamera}"
                    class="dark up">
                </div>
                <div
                    :class="{open: openCamera}"
                    class="dark down">
                </div>
            </div>
            <div class="Phone-border">
                <div
                    v-if="openCamera && !showPhoto"
                    class="countdown-container">
                    <div class="countdown">
                        <span>{{ count }}</span>
                    </div>
                </div>
                <img
                    v-if="showPhoto"
                    :src="require('../assets/img/svg/close.svg')"
                    alt="close">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Phone',
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      showPhone: false,
      openCamera: false,
      count: 3,
      countDown: null,
      showPhoto: false
    }
  },
  mounted () {
    this.countToZero()
    setTimeout(() => { // this.openCamera = true
	  this.showPhone = true
    }, 1000)
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
      this.showPhoto = true
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
    will-change: transform;
    transform: translateX(-1300px) translateY(500px) rotate(-50deg);
    transition: transform 1s ease-out;
    &.show-phone{
        transform: translateX(-50%) translateY(-50%) rotate(0deg);
    }
    &-bg {
        border-radius: 45px;
        height: calc(100% - 4px);
        z-index: 1;
        /*position: absolute;*/
        &.show{
            background: url('../assets/img/photograph_plastic_ocean.jpg') no-repeat;
            background-position-y: 4px;
            background-size: 100% 100%;
        }
        .Phone-dark{
            position: absolute;
            z-index: 0;
            border-radius: 45px;
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 100%;
            /*background: rgba(10, 10, 10, 0.5);*/
            overflow: hidden;
            .dark{
                height: 50%;
                width: 100%;
                /*position: absolute;*/
                background: black;
                border: solid 1px red;
                z-index: 2;
                will-change: transform;
                transition: transform 0.5s ease;
                &.open.up{
                    transform: translateY(-100%);
                }
                &.open.down{
                    transform: translateY(100%);
                }
            }
        }
    }
    &-border{
        position: relative;
        height: 100%;
        background: url('../assets/img/svg/phone-border.svg') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        z-index: 3;
        img{
            position: relative;
            top: 80px;
        }
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
