import Vue from 'vue'
import Router from 'vue-router'

import Introduction from '../views/Introduction.vue'
import Stage from '../views/Stage.vue'
import Inventaire from '../views/Inventaire.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/introduction'
        },
        {
            path: '/introduction',
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
