<template>
  <div class='inventory-detail'>
    <div class='inventory-detail-container'>
      <div class="box">
        <div>
          3D Object
        </div>
        <div class="content">
          <div class="content-title">

          </div>
          <div class="content-description">

          </div>
          <div class="more">
            Scroll
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import objects from '../assets/data/inventory'
export default {
  name: 'InventoryDetail',
  computed: {
    objects () {
      return objects.objects.map((item) => {
        console.log(item.name)
        return item.name
      })
    },
    object () {
      console.log(this.$route)
      let test = this.objects.find((item) => {
        return this.$route
      })
      return this.$route
      // return this.found
    }
  }
}
</script>

<style lang="scss">
  .inventory-detail{
    z-index: 2;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border:solid 1px red;
    &-container{

    }
  }
</style>
