<template>
     <div class="didactiel collection">
        <img :src="require('../../assets/img/svg/didacticiel-scroll.svg')" alt="logo">
        <p>{{ title }}</p>
     </div>
</template>

<script>
export default {
  name: 'Didactiel',
  props: {
    title: {
      type: String,
      required: true
    },
    logo: {
      type: String,
      required: true,
      default: ''
    }
  },
  data () {
    return {
      didacticiels: [
        {
          id: 0,
          name: 'scroll',
          path: '../../assets/img/svg/didacticiel-scroll.svg',
          message: 'scroller pour explorer PLASTICLAND'
        }, {
          id: 1,
          name: 'radar',
          path: '../../assets/img/svg/didacticiel-radar.svg',
          message: 'SUIVEZ le radar POUR VOIR LES OBJETS à collecter'
        }, {
          id: 2,
          name: 'collection',
          path: '../../assets/img/svg/didacticiel-bottle.svg',
          message: 'Cliquez pour voir votre collection'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "./didactiel.scss";
</style>
