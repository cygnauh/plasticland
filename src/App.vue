<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted () {
    this.$router.replace('/') // TODO : added this in production mode, on reload goes to main page
  },
  methods: {}
}
</script>

<style lang="scss">
@import 'assets/scss/index';
body {
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  border: 0;
  padding: 0;
}
</style>
