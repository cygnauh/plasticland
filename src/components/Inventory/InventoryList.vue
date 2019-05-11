<template>
  <div
    :class="{'show': isMounted}"
    class='inventory'>
    <div class='inventory-container'>
      <div class="box">
        <div
          :class="{'canHover' : object.found}"
          :key="object.id"
          v-for="(object, i) in objects"
          class="object"
          @click.capture="(e) => onObjectClicked(e, object)">
          <div
            :class=" (i+1) % 3 ? 'border-right': null"
            class="obj-container">
            <div class="obj-title">
              {{ object.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import InventoryDetail from './InventoryDetail'
import { store } from '../../store/index'
export default {
  name: 'InventoryList',
  data () {
    return {
      isMounted: false
    }
  },
  computed: {
    objects () {
      return store.state.objects.map((item) => {
        return item
      })
    }
  },
  mounted () {
    this.isMounted = true
  },
  methods: {
    onObjectClicked (e, obj) {
      if (!obj.found) {
        e.preventDefault()
      } else {
        store.objectFound(obj.id)
        Vue.prototype.$engine.collectable.selectedItem(obj.name, true)
        this.$router.push({ // TODO : test which way is more interesting for routing
          path: `/plasticland/inventory/${obj.id}`,
          component: InventoryDetail
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/index';
  .inventory{
    position: absolute;
    /*overflow: scroll;*/
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100%;
    will-change: transform;
    &.show{
      transition: transform 1s ease-in-out;
    }
    &-container{
      .box{
        position: relative;
        bottom: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        flex-direction: row;
        transform: translateY(159px);
        .object{
          transform: translateZ(0);
          width: 33.2%;
          &:before{
            content: '';
            position: absolute;
            z-index: -1;
            left: 0;
            right: 100%;
            top: 0;
            background-color: $medium_grey;
            height: 1px;
            transition-property: right;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;
          }
          a{
            text-decoration: none;
          }
          .obj-container{
            will-change: opacity;
            padding: 20px;
            height: 35vh;
            display: flex;
            background: none;
            .obj-title{
              text-decoration: none;
              will-change: opacity;
              opacity: 0;
              height: auto;
              width: 100%;
              align-self: flex-end;
              font-size: 18px;
              font-family: Arkhip, sans-serif;
              color: $sand_yellow;
              text-transform: uppercase;
              padding-bottom: 10px;
              margin: 10px;
            }
          }
          &.canHover{
            .obj-container:hover{
              background: url('../../assets/img/svg/border-collection-list-element.svg') center no-repeat;
              background-size: 90% 90%;
              .obj-title{
                opacity: 1;
              }
            }
          }
          .border-right{
            transform: translateZ(0);
            &:before{
              content: '';
              position: absolute;
              z-index: -1;
              right: 0;
              top: 0;
              background-color: $medium_grey;
              height: 0;
              width: 1px;
              transition: height 0.3s ease-out;
              transition-delay: 0.6s;
            }
            &:hover:before{
              height: 100%;
            }
          }
        }
      }
    }
    &.show{
      transition: transform 1s linear;
      .object{
        will-change: width;
        box-shadow: 0;
        &:before {
          right: 0;
        }
        .border-right{
          &:before{
            height: 100%;
          }
        }
      }
    }
    .test{
      position: absolute;
      z-index: 3;
    }
  }
</style>
