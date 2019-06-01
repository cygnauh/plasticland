<template>
  <div
    :class="{'show': isMounted}"
    class='inventory'>
    <div class='inventory-container'>
      <div id="box" class="box">
        <div
          :key="object.id"
          :class="{'canHover' : object.found}"
          class="el first-object obj"
          v-for="(object) in objects.slice(0, 1)"
          @click.capture="(e) => onObjectClicked(e, object)">
          <!--<img-->
            <!--:src="require('../../assets/img/svg/grow-vertical-y.svg')"-->
            <!--alt="border">-->
          <div
            :ref="object.name"
            :id="object.name"
            class="border"
          >
            <div
              :class="{'y-bg' : object.found}"
              class="number"> {{object.id}} </div>
            <div class="title"> {{ object.title }} </div>
          </div>
        </div>
        <div class="el grow-three">
          <div
            class="container">
            <div
              :key="object.id"
              :class="[{'canHover' : object.found}, {'grow-two': (i === 1)}]"
              class="obj"
              v-for="(object, i) in objects.slice(1, 3)"
              @click.capture="(e) => onObjectClicked(e,object)">
              <!--<img-->
                <!--:src="[ i === 1 && object.found ? require('../../assets/img/svg/grow-two-y.svg') : i === 1 && !object.found ? require('../../assets/img/svg/grow-two-g.svg') : i === 0 && object.found ? require('../../assets/img/svg/grow-one-y.svg') : require('../../assets/img/svg/grow-one-y.svg') ]"-->
                <!--alt="border">-->
              <div
                :ref="object.name"
                :id="object.name"
                class="border">
                <div
                  :class="{'y-bg' : object.found}"
                  class="number">{{object.id}}</div>
                <div class="title"> {{ object.title }} </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div
              :key="object.id"
              :class="{'canHover' : object.found}"
              v-for="(object, i) in objects.slice(3)"
              class="obj">
              <!--<img-->
                <!--:src="[ object.found ? require('../../assets/img/svg/grow-one-y.svg') : require('../../assets/img/svg/grow-one-g.svg') ]"-->
                <!--alt="border">-->
              <div
                :ref="object.name"
                :id="object.name"
                @click.capture="(e) => onObjectClicked(e, object)"
                class="border">
                <div
                  :class="{'y-bg' : object.found}"
                  class="number">{{object.id}}</div>
                <div class="title"> {{ object.title }} </div>
              </div>
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
    store.setContainers(this.$refs)
    Vue.prototype.$engine.collectable.openCollectable()
  },
  beforeDestroy () {
    Vue.prototype.$engine.collectable.closeCollectable()
  },
  methods: {
    onObjectClicked (e, obj) {
      if (!obj.found) {
        e.preventDefault()
      } else {
        store.objectFound(obj.id)
        Vue.prototype.$engine.handleRender('detail')
        Vue.prototype.$engine.collectable.itemSelected = obj.name
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
        flex-flow: row wrap;
        width: calc(100% - 40px);
        height: 73vh;
        padding: 20px;
        .el {
          height: 100%;
          &.first-object{
            margin-left: 5px;
            /*background: url('../../assets/img/svg/grow-vertical-y.svg') no-repeat;*/
            /*background-size: cover;*/
          }
          &.grow-three{
            flex-grow: 3;
            display: flex;
            flex-direction: column;
            .container{
              display: flex;
              flex: 1 0 0;
              height: 100%;
            }
          }
          flex: 1 0 0;
          display: flex;
          flex-direction: row;
          /*margin: 5px 5px 5px 0;*/
        }
        .obj{
          flex: 1 0 0;
          /*padding: 15px;*/
          height: 100%;
          position: relative;
          font-family: AxeHandel, sans-serif;
          .border{
            /*margin: 15px 15px 15px 0;*/
            border: solid 4px $light_blue;
            border-radius: 5px;
            height: calc(100% - 15px);
            width: calc(100% - 15px);
          }
          /*background: url('../../assets/img/svg/grow-one-g.svg') no-repeat center center;*/
          /*background-size: cover;*/
          &.grow-two{
            flex-grow: 2;
            /*background: url('../../assets/img/svg/grow-two-g.svg') no-repeat center center;*/
            /*background-size: cover;*/
            &.canHover {
              /*background: url('../../assets/img/svg/grow-two-y.svg') no-repeat center center;*/
              /*background-size: cover;*/
            }
          }
          .number{
            width: 45px;
            height: 45px;
            color: white;
            text-align: center;
            /*border-radius: 8px 2px 2px 2px;*/
            font-size: 41px;
            font-weight: bold;
            position: relative;
            left: -1px;
            top: -1px;
            background: url('../../assets/img/svg/grey-bg.svg') center center;
            background-size: contain;
            will-change: background;
            transition: background 0.1s ease-in-out;
          }
          .title{
            will-change: opacity;
            opacity: 0; // TODO to 0 in prod
            transition: opacity 0.2s ease-in-out;
          }
          &.canHover{
            /*background: url('../../assets/img/svg/grow-one-y.svg') no-repeat center center;*/
            /*background-size: cover;*/
            &:hover{
              .border{
                border: solid 4px $sand_yellow;
              }
              .y-bg{
                background: url('../../assets/img/svg/yellow-bg.svg') center center;
                background-size: contain;
              }
            }

            &:hover{
              .title{
                opacity: 1;
              }
            }
          }
          img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .title{
            color: $sand_yellow;
            font-size: 33px;
            text-transform: uppercase;
            bottom: 0;
            position: absolute;
            margin: 33px;
            text-align: left;
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
