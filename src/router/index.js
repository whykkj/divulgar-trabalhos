import { createRouter, createWebHistory } from 'vue-router'

import InicioView from '../views/InicioView.vue'
import ConstrucaoView from '../views/ConstrucaoView.vue'
import BelezaView from '../views/BelezaView.vue'
import ServicosGeraisView from '../views/ServicosGeraisView.vue'
import TecnologiaView from '../views/TecnologiaView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'inicio',
      component: InicioView
    },
    {
      path: '/construcao',
      name: 'construcao',
      component: ConstrucaoView
    },
    {
      path: '/beleza',
      name: 'beleza',
      component: BelezaView
    },
    {
      path: '/servicos-gerais',
      name: 'servicos-gerais',
      component: ServicosGeraisView
    },
    {
      path: '/tecnologia',
      name: 'tecnologia',
      component: TecnologiaView
    }
  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router