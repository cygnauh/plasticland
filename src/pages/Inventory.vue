<template>
  <div class='inventory'>
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
  .inventory{
    position: absolute;
    z-index: 0;
    top: 0;
    background: rgba(blue, 0.1);
    width: 100%;
    height: 100%;
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
        border-top: 1px solid #000;
        /*box-shado w: 3px 3px 8px 0 rgba(0,0,0,0.3);*/
        /*max-width: 50vw;*/
        width: 33.2%;
        /*height: 40vh;*/
        div{
          padding: 20px;
          height: 35vh;
        }
        .border-right{
          border-right: 1px solid #000;
        }
      }
      .router-link-active{
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        position: relative;
        text-decoration: none;
        .close-btn{
          color: green;
          cursor: pointer;
          text-underline: transparent;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
