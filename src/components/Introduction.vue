<template>
  <div class="introduction">
    <Loader />
    Introduction
    <div
      ref="ticket"
      class="ticket">
      <div class="ticket_remain">

      </div>
      <div
        :style="{'translate': 'scale(' + dragPosition/2 + 'deg)'}"
        class="ticket_detachable">
      </div>
      <div
        ref="dragTicket"
        :style="{'transform': 'translateX(-50%) translateY(' + dragPosition + 'px)' }"
        :class="{mouse_down: isMouseDown}"
        class="ticket_drag">
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader/Loader'

export default {
  name: 'Introduction',
  components: { Loader },
  data () {
    return {
      draggableElement: null,
      isMouseDown: false,
      dragPosition: -50
    }
  },
  mounted () {
    console.log(this.$refs.dragTicket)
    this.draggableElement = this.$refs.dragTicket
    this.ticket = this.$refs.ticket
    // console.log(this.ticket.offset)
    // console.log(this.draggableElement.getBoundingClientRect())
    this.setDragListeners()
  },
  beforeDestroy () {
    this.draggableElement.removeEventListener('mousedown', this.onMousedown)
    // this.draggableElement.removeEventListener('mouseup', this.onMouseup)
    window.removeEventListener('mouseup', this.onMouseup)
    document.body.removeEventListener('mousemove', this.onMousemove)
  },
  methods: {
    setDragListeners () {
      // console.log(this.draggableElement)
      if (this.draggableElement) {
        this.draggableElement.addEventListener('mousedown', this.onMousedown)
        // this.draggableElement.addEventListener('mouseup', this.onMouseup)
        window.addEventListener('mouseup', this.onMouseup)
        // Attach to the body to avoid event dropoff
        document.body.addEventListener('mousemove', this.onMousemove)
      }
    },
    onMousedown (event) {
      this.isMouseDown = true
      // console.log('down')
    },
    onMousemove (event) {
      if (!this.isMouseDown) return
      let translateYPosition = event.clientY - this.ticket.getBoundingClientRect().top - (this.draggableElement.getBoundingClientRect().height / 2)
      if (translateYPosition < 320 && translateYPosition > -30) {
        this.dragPosition = translateYPosition
      }
      // console.log(this.dragPosition)
      // console.log('move')
    },
    onMouseup (event) {
      this.isMouseDown = false
      // console.log('up')
    }
  }
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
    transform: translateX(-50%) translateY(300px);
    .ticket_remain{
      width: 500px;
      background: $dark_blue;
      height: 100%;
    }
    .ticket_detachable{
      width: 300px;
      background: $sand_yellow;
      height: 100%;
      transform-origin: left bottom;
      transform: rotate(0);
    }
    .ticket_drag{
      user-select: none;
      width: 24px;
      height: 24px;
      border: solid 2px $sand_yellow;
      background-color: $dark_blue;
      position: absolute;
      border-radius: 50%;
      cursor: grab;
      /*border: solid 1px lightpink;*/
      left: 500px;
      transition: translate 0.5s ease-in-out, scale 0.5s ease-in-out;
      &.mouse_down{
        transition: translate 0.5s ease-in-out, scale 0.5s ease-in-out;
        &:before{
          transform: translateX(-25%) translateY(-25%) scale(1.3);
        }
      }
      &:before{
        content: '';
        position: absolute;
        border: solid 2px $sand_yellow;
        width: 42px;
        height: 42px;
        opacity: 0.73;
        border-radius: 50%;
        left: 0;
        top: 0;
        transform: translateX(calc(-25%)) translateY(calc(-25%)) scale(1);
        background-image: radial-gradient(circle at 50% 50%,
                rgba(252, 240, 222, 0),
                rgba(254, 248, 239, 0.11) 61%,
                rgba(255, 255, 255, 0.2));
      }
    }
  }
}

</style>
