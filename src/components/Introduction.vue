<template>
  <div class="introduction">
    <Loader />
    Introduction
    <Phone></Phone>
  </div>
</template>

<script>
import Loader from './Loader'
import Phone from './Phone'

export default {
  name: 'Introduction',
  components: { Loader, Phone }
}
</script>
