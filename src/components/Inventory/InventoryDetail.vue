<template>
  <div class='inventory-detail'>
    <div class='inventory-detail-container'>
      <div class="box">
        <div
          ref="visual"
          id="visual"
          :class="{'show': isMounted}"
          class="visual"/>
        <div
           ref="content"
           :style="{'transform': 'translateY(-' + 10 + 'px)'}"
           class="content">
          <div :class="{'show': isMounted}"
               class="content-title">
            {{ object[0].title }}
          </div>
          <div
            :class="{'show': isMounted}"
            class="content-description">
            <span
              :key="i"
              v-for="(item, i) in description"
              class="paragraph">
              {{ item }}
            </span>
            <br>
            <br>
          </div>
          <!--<div class="more">-->
          <!--Scroll-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import objects from '../../data/inventory'
export default {
  name: 'InventoryDetail',
  computed: {
    objects () {
      return objects.objects.map((item) => {
        return item
      })
    },
    object () {
      return this.objects.filter(item => item.id === parseInt(this.$route.params.id))
    },
    description () {
      return this.object[0].description.split('@')
    }
  },
  data () {
    return {
      timer: null,
      sy: 0,
      dy: this.sy,
      contentHeight: 0,
      isMounted: false
    }
  },
  mounted () {
    this.contentHeight = this.$refs.content.offsetHeight
    this.$store.commit('setSelectedItemContainer', this.$refs.visual)
    this.isMounted = true
  },
  beforeDestroy () {
    Vue.prototype.$engine.collectable.closeItem()
    Vue.prototype.$engine.collectable.itemSelected = ''
  },
  watch: {
    sy (value) {
      this.dy = Math.floor(this.lerp(this.dy, value, 0.07) * 100) / 100
    }
  },
  methods: {
    onMouseWheel (e) {
      if (e.deltaY < 0 && this.sy > 0) {
        this.sy -= 1
        Vue.prototype.$engine.collectable.rotateSelectedItem(false)
      } else if (event.deltaY > 0 && this.sy < (window.innerHeight - this.contentHeight)) {
        this.sy += 1
        Vue.prototype.$engine.collectable.rotateSelectedItem(true)
      }
      clearTimeout(this.timer)
    },
    lerp (a, b, n) {
      return (1 - n) * a + n * b
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/index';
  .inventory-detail{
    transform: translateY(159px);
    z-index: 2;
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% - 159px);
    &:after {
      content: "";
      animation: grain 8s steps(10) infinite;
      background-image: url('../../assets/img/grain.jpg');
      position: fixed;
      height: 300%;
      width: 300%;
      top: -100%;
      left: -50%;
      opacity: 0.3;
      mix-blend-mode: hue;
      z-index: -1;
    }
    &-container{
      color: white;
      height: 100%;
      .box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;
        .visual{
          width: 50%;
          height: 90%;
          top: -70px;
          position: relative;
          will-change: transform;
          transition: transform 1s ease-in-out;
          transform: translateX(-90%);
          &.show{
            transform: translateX(0);
            transition: transform 1s ease-in-out;
          }
        }
        .content{
          padding-top: 20vh;
          mask-image: -webkit-gradient(linear,left top,left bottom,from(transparent),color-stop(1%,transparent),color-stop(30%,#000),color-stop(50%,#000),color-stop(70%,#000),to(transparent));
          mask-image: linear-gradient(180deg,transparent 0,transparent 1%,#000 30%,#000 50%,#000 70%,transparent);
          text-align: left;
          width: 50%;
          height: 100%;
          will-change: translate;
          overflow: scroll;
          display: flex;
          flex-direction: column;
          .content-title{
            font-family: AxeHandel, sans-serif;
            font-size: 64px;
            margin-bottom: 46px;
            text-transform: uppercase;
          }
          .content-title, .content-description{
            will-change: transform;
            transition: transform 1s ease-in-out;
            transform: translateY(200%);
            &.show{
              transform: translateY(0);
            }
          }
          .content-description{
            &.show{
              transition-delay: 0.5s;
            }
            font-family: AveriaLibre, sans-serif;
            font-size: 23px;
            height: 398px;
            color: $light_blue;
            .paragraph{
              margin-bottom: 22px;
              display: block;
            }
          }
          .content-title, .content-description {
            padding:0 93px 0 68px;
          }
          .more{
            /*display: block;*/
          }
        }
      }
    }
  }
</style>
