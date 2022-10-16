import { createRouter, createWebHashHistory } from 'vue-router'
import PageOne from '../views/pageOne.vue'

const routes = [
  {
    path: '/',
    name: 'pageOne',
    component: PageOne
  },
  {
    path: '/pageTwo',
    name: 'pageTwo',
    component: () => import('../views/pageTwo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
