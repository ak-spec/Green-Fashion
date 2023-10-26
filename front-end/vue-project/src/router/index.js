import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue';
import Chat from "../components/Chat.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path : '/Upstyling',
      name: 'Upstyling',
      component: () => import('@/components/Upstyling.vue')
    },
    {
      path : '/Salvation',
      name: 'Salvation',
      component: () => import('@/components/Salvation.vue')
    },
    {
      path : '/Chat',
      name: 'Chat',
      component: Chat
    },
    
  ]
})

export default router
