<template>
  <div
    v-if="!removeIntroduction"
    :class="[
      {show: isMounted && assetsLoad && displayIntroText},
      {hide: !displayIntroText},
      {'hide-intro' : showScene}
    ]"
    class="introduction">
    <div
      class="intro-text">
      Inspired by a true story
    </div>
    <div :class="[{show: isMounted && assetsLoad && displayIntroText}, {hide: !displayIntroText}]"
         class="scroll">scroll to continue</div>
    <div
      :class="{'show-scene' : showScene}"
      class="cloud">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  data () {
    return {
      isMounted: false,
      removeIntroduction: false
    }
  },
  mounted () {
    this.isMounted = true
  },
  computed: {
    displayIntroText () {
      return this.$store.state.displayIntroText
    },
    assetsLoad () {
      return this.$store.state.assetsLoad
    },
    showScene () {
      return this.$store.state.currentVoiceOverSeek > 9.24
    }
  },
  watch: {
    showScene (value) {
      if (value) {
        setTimeout(() => {
          this.removeIntroduction = true
        }, 4000)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/index';
.introduction{
  position: absolute;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: $dark_blue;
  display: flex;
  font-family: AveriaLibre, sans-serif;
  color: $light_grey;
  opacity: 1;
  &.show, &.hide{
    z-index: 8;
    .intro-text{
      transition: opacity 1s ease, transform 1s ease;
    }
  }
  &.show{
    .intro-text{
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  &.hide{
    .intro-text{
      opacity: 0;
      transform: translateX(-50%) translateY(-200%);
    }
  }
  &.hide-intro{
    transition: opacity 2.5s ease;
    transition-delay: 1.5s;
    opacity: 0;
  }
  .intro-text{
    position: absolute;
    font-size: 30px;
    transform: translateX(-50%) translateY(200%);
    left: 50%;
    top: 50%;
    opacity: 0;
    transition: opacity 1s ease, transform 1s ease;
    will-change: opacity;
    display: inline-block;
    margin: 5px;
  }
  .scroll{
    position: absolute;
    bottom: 50px;
    left: 50%;
    font-size: 20px;
    transition: transform 1s ease-in-out;
    transform: translateX(-50%) translateY(100px);
    &:after{
      content: '';
      position: absolute;
      top: 40px;
      left: 50%;
      width: 2px;
      background: $light_grey;
      height: 40px;
      transition: height 1s ease;
    }
    &.show{
      transition-delay: 2s;
      transition: transform 1s ease-in-out;
      transform: translateX(-50%) translateY(0);
    }
    &.hide{
      opacity: 0;
      transition: opacity 1s ease, transform 1s ease-in-out;
      transform: translateX(-50%) translateY(-200%);
    }
    &.hide:after{
      transition-delay: 0.5s;
      transition: height 1s ease;
      height: 0;
    }
  }
  .cloud{
    position: absolute;
    width: 100vw;
    height: 100vh;
    .left, .right{
      position: absolute;
      display: inline-block;
      width: 60%;
      height: 140%;
      background: url('../assets/img/cloud_01.png') no-repeat;
      background-size: cover;
      opacity:0.75;
    }
    .left{
      background-position: 100% 200px;
      left: 0;
      transform: translateX(-100%) ;
    }
    .right{
      background-position: 0 136px;
      right: 0;
      transform: translateX(100%);
    }
    &.show-scene{
      .left, .right{
        transition: opacity 2.5s ease-in-out, transform 2.5s ease-in-out;
        opacity:0.05;
      }
      .left{
       transform: translateX(10px) translateY(-100px);
      }
      .right{
        transform: translateX(10px) translateY(10px);
      }
    }

  }
}

@keyframes translateUp {
  from {
    transform: translateY(200%);
  }
  to {
    transform: rotate(0);
  }
}

</style>
