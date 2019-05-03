import Vue from 'vue'
import Router from 'vue-router'

import Introduction from '../pages/Introduction'
import Stage from '../pages/Stage'
import InventoryList from '../pages/InventoryList'
import InventoryDetail from '../pages/InventoryDetail'
import Credits from '../pages/Credits'
import About from '../pages/About'

Vue.use(Router)

export default new Router({
  // mode: 'abstract', // TODO : uncomment in production mode, to hide url in bar of navigation
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
          component: InventoryList
        },
        {
          path: 'inventory/:id',
          component: InventoryDetail
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
