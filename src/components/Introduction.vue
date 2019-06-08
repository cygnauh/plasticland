<template>
  <div
    :class="[{show: isMounted && assetsLoad && displayIntroText}, {hide: !displayIntroText}]"
    class="introduction">
    <div
      class="intro-text">
      Inspired by a true story
    </div>
    <div :class="[{show: isMounted && assetsLoad && displayIntroText}, {hide: !displayIntroText}]"
         class="scroll">scroll to continue</div>
  </div>
</template>

<script>
export default {
  name: 'Introduction',
  data () {
    return {
      isMounted: false
    }
  },
  mounted () {
    this.isMounted = true
    console.log(this.displayIntroText)
  },
  computed: {
    displayIntroText () {
      return this.$store.state.displayIntroText
    },
    assetsLoad () {
      return this.$store.state.assetsLoad
    }
  },
  methods: {
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
