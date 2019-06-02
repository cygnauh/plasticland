<template>
    <div class="radar">
        <div class="radar-background">
            <div class="radar-map center" ></div>
            <div>
                <div class="radar-circle-el yellow center"></div>
                <div class="radar-circle-el dotted small center"></div>
                <div class="radar-circle-el dotted medium center"></div>
            </div>
            <div class="center">
                <div class="radar-cross-el left"></div>
                <div class="radar-cross-el right"></div>
            </div>
            <div class="radar-boat center"></div>
            <div class="radar-line">
                <div class="radar-line-el"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Radar',
  props: {
    theme: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "radar";
</style>
