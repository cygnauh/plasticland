import Vue from 'vue'
import Router from 'vue-router'

import Introduction from '../components/Introduction'
import Stage from '../components/Stage'
import InventoryList from '../components/Inventory/InventoryList'
import InventoryDetail from '../components/Inventory/InventoryDetail'
import Credits from '../components/Credits'
import About from '../components/About'

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
