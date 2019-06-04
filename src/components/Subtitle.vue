<template>
  <div class="subtitle">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Subtitle',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
  .subtitle{
    text-shadow: #FC0 1px 0 10px;
    font-size: 20px;
    font-family: Apercu, sans-serif;
  }
</style>
