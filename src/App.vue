<template>
  <div id="app">
    <Introduction></Introduction>
  </div>
</template>
<script>
import Introduction from './pages/Introduction'

export default {
  name: 'app',
    components: {Introduction},
  methods: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
