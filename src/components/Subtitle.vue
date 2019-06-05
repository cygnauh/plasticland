<template>
  <div class="subtitle">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Subtitle',
  computed: {
    text () {
      return this.$store.state.currentSubtitle
    }
  }
}
</script>
<style lang="scss">
  @import '../assets/scss/index';
  .subtitle{
    text-shadow: -1px -1px 0 rgba($dark_blue, 0.5),
    1px -1px 0 rgba($dark_blue, 0.5),
    -1px 1px 0 rgba($dark_blue, 0.5),
    1px 1px 0 rgba($dark_blue, 0.5);
    color: $light_grey;
    font-size: 20px;
    font-family: AveriaLibre, sans-serif;
  }
</style>
