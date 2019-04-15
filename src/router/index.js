import Vue from 'vue'
import Router from 'vue-router'

import Introduction from '../pages/Introduction.vue'
import Stage from '../pages/Stage.vue'
import Inventory from '../pages/Inventory.vue'

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
      props: { inventory: false },
      children: [
        // {
        //   path: '/plasticland/:location',
        //   children: [
        //     {
        //       path: '/map/:location/:objet'
        //     }
        //   ]
        // },
        {
          path: 'inventory',
          component: Inventory,
          props: { inventory: true }
        }
      ]
    }
  ]
})
