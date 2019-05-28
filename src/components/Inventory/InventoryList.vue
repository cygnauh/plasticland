<template>
  <div
    :class="{'show': isMounted}"
    class='inventory'>
    <div class='inventory-container'>
      <div id="box" class="box">
        <div
          :ref="object.name"
          :id="object.name"
          :class="{'canHover' : object.found}"
          :key="object.id"
          class="el first-object obj"
          v-for="(object) in objects.slice(0, 1)"
          @click.capture="(e) => onObjectClicked(e, object)">
          <div class="number"> {{object.id}} </div>
          <div class="title"> {{ object.title }} </div>
        </div>
        <div class="el grow-three">
          <div
            class="container">
            <div
              :ref="object.name"
              :id="object.name"
              :class="[{'canHover' : object.found}, {'grow-two': (i === 1)}]"
              :key="object.id"
              class="obj"
              v-for="(object, i) in objects.slice(1, 3)"
              @click.capture="(e) => onObjectClicked(e,object)">
              <div class="number">{{object.id}}</div>
              <div class="title"> {{ object.title }} </div>
            </div>
          </div>
          <div class="container">
            <div
              :key="object.id"
              :ref="object.name"
              :id="object.name"
              :class="{'canHover' : object.found}"
              @click.capture="(e) => onObjectClicked(e, object)"
              v-for="(object) in objects.slice(3)"
              class="obj">
              <div class="number">{{object.id}}</div>
              <div class="title"> {{ object.title }} </div>
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
    // if (Vue.prototype && Vue.prototype.$engine) Vue.prototype.$engine.initCollectable()
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
        flex-flow: row wrap;
        width: calc(100% - 40px);
        height: 73vh;
        padding: 20px;
        .el {
          height: 100%;
          &.first-object{
            margin-left: 5px;
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
          border: solid 1px $sand_yellow;
          border-radius: 8px;
          margin: 0 5px 5px 0;
          height: 100%;
          position: relative;
          &.grow-two{
            flex-grow: 2;
          }
          .number{
            width: 39px;
            height: 39px;
            background: $sand_yellow;
            color: white;
            text-align: center;
            border-radius: 8px 2px 2px 2px;
            font-size: 28px;
            font-weight: bold;
          }
          &.canHover{
            will-change: opacity;
            opacity: 1; // TODO to 0 in prod
            &:hover{
              .title{
                opacity: 1;
              }
            }
          }
          .title{
            color: $sand_yellow;
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
