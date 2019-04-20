<template>
  <div class='inventory'>
    <div class='inventory-container'>
      <router-link to="/plasticland">
        <div class="close-btn">
          Fermer
        </div>
      </router-link>
      <div class="box">
        <div
          :key="name.id"
          v-for="(name, i) in objects"
          class="object">
          <div :class=" (i+1) % 3 ? 'border-right': null">
            {{ name }}
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
    background: $dark_blue;
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
        /*max-width: 100vh;*/
        .object{
          /*margin: 10px;*/
          border-top: 1px solid $medium_grey;
          /*box-shado w: 3px 3px 8px 0 rgba(0,0,0,0.3);*/
          /*max-width: 50vw;*/
          width: 33.2%;
          transform: translateY(159px);
          /*height: 40vh;*/
          div{
            padding: 20px;
            height: 35vh;
          }
          .border-right{
            border-right: 1px solid $medium_grey;
          }
        }
      }
      .router-link-active{
        top: 0;
        position: relative;
        text-decoration: none;
        .close-btn{
          color: $sand_yellow;
          cursor: pointer;
          text-transform: uppercase;
          text-underline: transparent;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
