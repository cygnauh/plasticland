<template>
  <div class='inventory'>
    <div class='inventory-container'>
      <div class="box">
        <div
          :key="name.id"
          v-for="(name, i) in objects"
          class="object">
          <div
            :class=" (i+1) % 3 ? 'border-right': null"
            class="obj-container">
            <div class="obj-title">
              {{ name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import objects from '../assets/data/inventory'
export default {
  name: 'Inventory',
  computed: {
    objects () {
      return objects.objects.map((item) => {
        return item.name
      })
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/index';
  .inventory{
    position: absolute;
    /*overflow: scroll;*/
    z-index: 0;
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
          .obj-container{
            will-change: opacity;
            padding: 20px;
            height: 35vh;
            display: flex;
            .obj-title{
              will-change: opacity;
              opacity: 0;
              height: auto;
              width: 100%;
              align-self: flex-end;
              font-size: 18px;
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
  }
</style>
