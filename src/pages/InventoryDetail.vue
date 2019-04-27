<template>
  <div class='inventory-detail'>
    <div class='inventory-detail-container'>
      <div class="box">
        <div>
          DETAIL
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
        return item.name
      })
    }
  }
}
</script>

<style lang="scss">
</style>
