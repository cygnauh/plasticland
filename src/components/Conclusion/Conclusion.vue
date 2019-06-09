<template>
    <div class="conclusion">
        <div class="head">
            <div class="back-btn">
                <img :src="require('../../assets/img/go-back.png')" alt="go back">
            </div>
        </div>

        <div class="main">
            <div class="inventory-btn-count">
                <span class="inventory-btn-obj-found">{{ objectFound }}</span>
                <div class="border-separator"></div>
                <span class="inventory-btn-obj-total">{{ totalObject }}</span>
            </div>
            <h3>Vous avez terminé votre voyage à Plasticland en <span>00:40:36</span> secondes. Ce qui équivaut à</h3>
            <h1>2000600<sup>kg</sup></h1>
            <h2>de Déchets plastiques rejetés dans l’océan* </h2>
            <div class="buttons">
                <div class="petition"><p><a href="#">SIGNEZ UNE PETITION</a></p></div>
                <div class="collection"><p><a href="#">COLLECTION</a></p></div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'Conclusion',
  data () {
    return {
      totalObject: this.$store.state.objects.length
    }
  },
  computed: {
    objectFound () {
      return this.$store.state.objects.filter(item => item.found).length
    }
  }
}
</script>

<style lang="scss">
    @import "conclusion";
</style>
