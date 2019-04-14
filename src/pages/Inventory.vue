<template>
  <div class='inventory'>
    <!--<div>close</div>  ;-->
    <div class="box">
      <div
        :key="name.id"
        v-for="name in objects"
        class="object">
        <div>
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
    border: solid 1px blue;
    .box{
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      flex-direction: row;
      /*max-width: 100vh;*/
      .object{
        /*margin: 10px;*/
        /*border: 1px solid #000;*/
        /*box-shado w: 3px 3px 8px 0 rgba(0,0,0,0.3);*/
        /*max-width: 50vw;*/
        width: 33.3%;
        height: 40vh;
        div{
          padding: 20px;
          height: 100%;
        }
      }
    }
  }
</style>
