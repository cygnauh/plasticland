<template>
  <div class='inventory-detail'>
    <div class='inventory-detail-container'>
      <div class="box">
        <div class="visual"/>
        <div class="content">
          <div class="content-title">
            {{ object[0].name }}
          </div>
          <div class="content-description">
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
      timer: null
    }
  },
  beforeCreate () {
    window.addEventListener('wheel', () => this.handleEvent())
  },
  beforeDestroy () {
    window.removeEventListener('wheel', this.handleEvent)
  },
  methods: {
    handleEvent () {
      if (this.timer !== null) {
        console.log('scroll')
        Vue.prototype.$engine.collectable.rotateSelectedItem()
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        // do something
        console.log('helo')
      }, 100)
    }
  }
}
</script>

<style lang="scss">
  .inventory-detail{
    transform: translateY(159px);
    z-index: 2;
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% - 159px);
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
          height: 100%;
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
            font-family: Arkhip, sans-serif;
            font-size: 43px;
            margin-bottom: 46px;
          }
          .content-description{
            font-family: ApercuPro, sans-serif;
            font-size: 22px;
            height: 398px;
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
