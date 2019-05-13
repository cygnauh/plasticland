<template>
  <div class="introduction">
    <Loader />
    Introduction
    <div class="ticket">
      <div class="ticket_remain">

      </div>
      <div class="ticket_detachable">

      </div>
      <div class="ticket_drag">

      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'Introduction',
  components: { Loader }
}
</script>

<style lang="scss">
@import '../assets/scss/index';
.introduction{
  /*display: flex;*/
  .ticket{
    display: flex;
    /*align-self: center;*/
    width: 800px;
    height: 300px;
    border: solid 1px $dark_blue;
    left: 50%;
    position: relative;
    transform: translateX(-50%) translateY(400px);
    .ticket_remain{
      width: 500px;
      background: $dark_blue;
      height: 100%;
    }
    .ticket_detachable{
      width: 300px;
      background: $sand_yellow;
      height: 100%;
    }
    .ticket_drag{
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: solid 1px lightpink;
      left: 500px;
      transform: translateX(-50%);
    }
  }
}

</style>
