<template>
  <div class="introduction">
    <div :class="{'show': 'isMounted'}"
         class="intro-text">
      <span>Inspired</span>
      <span>by</span>
      <span>a</span>
      <span>true</span>
      <span>story</span>
    </div>
    <div :class="{'show': 'isMounted'}"
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
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '../assets/scss/index';
.introduction{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: $dark_blue;
  display: flex;
  font-family: AveriaLibre, sans-serif;
  .intro-text{
    position: absolute;
    font-size: 30px;
    transform: translateX(-50%);
    left: 50%;
    top: 50%;
    opacity: 0;
    transition: opacity 1s ease;
    will-change: opacity;
    span{
      color: $light_grey;
      margin: 5px;
      transform: translateY(200%) rotateX(40deg);
    }
    &.show{
      opacity: 1;
    }
  }
  .scroll{
    position: absolute;
    bottom: 50px;
    color: $light_grey;
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
    }
    &.show{
      transition-delay: 2s;
      transition: transform 1s ease-in-out;
      transform: translateX(-50%) translateY(0);
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
