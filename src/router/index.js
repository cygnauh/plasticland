import Vue from 'vue'
import Router from 'vue-router'

import Introduction from '../pages/Introduction'
import Stage from '../pages/Stage'
import Inventory from '../pages/Inventory'
import Credits from '../pages/Credits'
import About from '../pages/About'

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
          component: Inventory
        },
        {
          path: 'about',
          component: About
        },
        {
          path: 'credits',
          component: Credits
        }
      ]
    }
  ]
})
