import Vue from 'vue'
import Router from 'vue-router'

import Introduction from '../pages/Introduction.vue'
import Stage from '../pages/Stage.vue'
import Inventaire from '../pages/Inventaire.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Introduction
    },
    {
      path: '/plasticland',
      component: Stage,
      children: [
        {
          path: '/plasticland/:location',
          children: [
            {
              path: '/map/:location/:objet'
            }
          ]
        },
        {
          path: '/plasticland/inventaire',
          component: Inventaire
        }
      ]
    }
  ]
})
