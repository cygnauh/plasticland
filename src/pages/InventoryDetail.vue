<template>
  <div class='inventory-detail'>
    <div class='inventory-detail-container'>
      <div class="box">
        <div class="visual">
          3D Object
        </div>
        <div class="content">
          <div class="content-title">
            {{ object[0].name }}
          </div>
          <div
            :key="i"
            v-for="(item, i) in description"
            class="content-description">
            <span
              >
              {{ item }}
            </span>
            <br>
            <br>
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
import objects from '../data/inventory'
export default {
  name: 'InventoryDetail',
  computed: {
    objects () {
      return objects.objects.map((item) => {
        return item
      })
    },
    object () {
      return this.objects.filter(item => item.id === parseInt(this.$route.params.id))
    },
    description () {
      return this.object[0].description.split('@')
    }
  }
}
</script>

<style lang="scss">
  .inventory-detail{
    transform: translateY(159px);
    z-index: 2;
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% - 159px);
    &-container{
      color: white;
      .box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        .visual{
          width: 50%;
        }
        .content{
          text-align: left;
          width: 50%;
          .content-title{
            font-family: Arkhip, sans-serif;
            font-size: 60px;
            margin-bottom: 46px;
          }
          .content-description{
            font-family: ApercuPro, sans-serif;
            font-size: 22px;
          }
          .content-title, .content-description {
            padding:0 73px 0 73px;
          }
        }
      }
    }
  }
</style>
