<template>
  <div class='inventory'>
    <div class='inventory-container'>
      <div class="box">
        <div
          :key="object.id"
          v-for="(object, i) in objects"
          class="object"
          @click.capture="(e) => onObjectClicked(e, object)">
          <!--<router-link-->
            <!--:to="`/plasticland/inventory/${object.id}`">-->
          <div
            :class=" (i+1) % 3 ? 'border-right': null"
            class="obj-container">
            <div class="obj-title">
              {{ object.name }}
            </div>
          </div>
          <!--</router-link>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import objects from '../assets/data/inventory'
import InventoryDetail from './InventoryDetail'
export default {
  name: 'Inventory',
  computed: {
    objects () {
      return objects.objects.map((item) => {
        return item
      })
    }
  },
  methods: {
    onObjectClicked (e, obj) {
      // const InventoryDetail = InventoryDetail
      if (!obj.found) {
        e.preventDefault()
      } else {
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
  @import '../assets/scss/index';
  .inventory{
    position: absolute;
    /*overflow: scroll;*/
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100%;
    &-container{
      /*margin: 18px;*/
      /*width: calc(100% - 18px);*/
      /*height: calc(100% - 43px);*/
      .box{
        position: relative;
        bottom: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        flex-direction: row;
        .object{
          border-top: 1px solid $medium_grey;
          width: 33.2%;
          transform: translateY(159px);
          a{
            text-decoration: none;
          }
          .obj-container{
            will-change: opacity;
            padding: 20px;
            height: 35vh;
            display: flex;
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
            }
            &:after{
              content:'';
              position: absolute;
              top:0;
              left: 0;
              border: solid 1px $sand_yellow;
              transform: translate(5%, 5%);
              width: 90%;
              height: 90%;
              will-change: opacity;
              opacity: 0;
            }
            &:hover{
              &:after{
                opacity: 1;
              }
              .obj-title{
                opacity: 1;
              }
            }
          }
          .border-right{
            border-right: 1px solid $medium_grey;
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
