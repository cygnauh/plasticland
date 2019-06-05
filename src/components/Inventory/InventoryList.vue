<template>
  <div
    :class="{'show': isMounted}"
    class='inventory'>
    <div class='inventory-container'>
      <div id="box" class="box">
        <div
          :key="object.id"
          :class="[{'canHover' : object.found}, ( clickedElement  &&  clickedElement === object.name ) ? 'itemClicked' : clickedElement ? 'itemHide' : '' ]"
          class="el first-object obj"
          v-for="(object) in objects.slice(0, 1)"
          @click.capture="(e) => onObjectClicked(e, object)">
            <!--<span style="color: red">{{ clickedElement }}{{ object.name }}</span>-->
          <div
            :ref="object.name"
            :id="object.name"
            class="border">
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
              :class="[{'canHover' : object.found}, {'grow-two': (i === 1)}, ( clickedElement  &&  clickedElement === object.name ) ? 'itemClicked' : clickedElement ? 'itemHide' : '' ]"
              class="obj"
              v-for="(object, i) in objects.slice(1, 3)"
              @click.capture="(e) => onObjectClicked(e,object)">
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
              :class="[{'canHover' : object.found}, ( clickedElement  &&  clickedElement === object.name ) ? 'itemClicked' : clickedElement ? 'itemHide' : '' ]"
              v-for="(object) in objects.slice(3)"
              class="obj">
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
export default {
  name: 'InventoryList',
  data () {
    return {
      isMounted: false,
      clickedElement: null
    }
  },
  computed: {
    objects () {
      return this.$store.state.objects.map((item) => {
        return item
      })
    }
  },
  mounted () {
    this.isMounted = true
    this.$store.commit('setContainers', this.$refs)
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
	    this.clickedElement = obj.name
        this.$store.commit('objectFound', obj.id)
        Vue.prototype.$engine.handleRender('detail')
        Vue.prototype.$engine.collectable.itemSelected = obj.name
        Vue.prototype.$engine.collectable.openItem()
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
            /*position: absolute;*/
            /*width: 50vw;*/
            /*height: 50vh;*/
            &:hover{
              flex-grow: 1.2;

            }
          }
          &.grow-three{
            /*opacity: 0;*/
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
        }
        .obj{
          flex: 1 0 0;
          height: 100%;
          position: relative;
          font-family: AxeHandel, sans-serif;
          will-change: transform, flex-grow;
          transition:
                  flex-grow 500ms ease-in-out,
                  transform 1s ease-in-out,
                  left 1s ease-in-out,
                  width 1s ease-in-out,
                  height 1s ease-in-out;
          &.itemClicked{
            transition:
                  left 3s ease-in-out,
                  width 2s ease-in-out,
                  height 2s ease-in-out;
            /*background: darkseagreen;*/
            /*position: absolute;*/
            width: 50vw;
            height: 70vh;
            flex-grow: 1.2;
            &.grow-two{
              flex-grow: 2.2;
            }
          }
          &.itemHide{
            transition: transform 1s ease-in-out;
            transform: translateY(200%) scale(0);
          }
          &:hover{
            flex-grow: 1.2;
          }
          .border{
            border: 8px solid;
            border-image-slice: 10;
            border-image-source: url('../../assets/img/svg/grow-one-g.svg');
            height: calc(100% - 28px);
            width: calc(100% - 28px);
          }
          &.grow-two{
            flex-grow: 2;
            .border{
              border-image-source: url('../../assets/img/svg/grow-two-g.svg');
            }
            &.canHover {
              &:hover {
                flex-grow: 2.2;
                .border{
                  border-image-source: url('../../assets/img/svg/grow-two-y.svg');
                }
              }
            }
          }
          .number{
            width: 45px;
            height: 45px;
            color: white;
            text-align: center;
            font-size: 41px;
            font-weight: bold;
            position: relative;
            left: -4px;
            top: -4px;
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
            &:hover{
              .border{
                border-image-source: url('../../assets/img/svg/grow-one-y.svg');
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
  }
</style>
