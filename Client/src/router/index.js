import { createRouter, createWebHistory } from 'vue-router'
import AdminDashboard from '@/views/AdminDashboard.vue'
import Dashboard from '../views/Dashboard.vue'
import Drag from '../views/Drag.vue'
import DragAndDrop from '../views/DragAndDrop.vue'
import ToDoView from '@/views/ToDoView.vue'
import Profile from '../views/Profile.vue'
import NotesView from '@/views/NotesView.vue'
import SettingsView from '@/views/SettingsView.vue'
import MessagesView from '@/views/MessagesView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginRegView from '@/views/LoginRegView.vue'
import StatsView from '@/views/StatsView.vue'
import { useAuthStore } from '@/stores/auth.store'
import TimerView from '@/views/TimerView.vue'
import ShopView from '@/views/ShopView.vue'
import BossView from '@/views/BossView.vue'
import AdminSpawnCommands from '@/views/AdminSpawnCommands.vue'
import MapsView from '@/views/MapsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: '/login',
      name: 'login',
      component: LoginRegView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'dashboard',
      component: Profile
    },
    {
      path: '/drag',
      name: 'drag',
      component: Drag
    },
    {
      path: '/draganddrop',
      name: 'draganddrop',
      component: DragAndDrop
    },
    {
      path: '/timers',
      name: 'timers',
      component: TimerView
    },
    {
      path: '/todo',
      name: 'todo',
      component: ToDoView
    },
    {
      path: '/todo/category/:category',
      name: 'todoCategory',
      component: ToDoView,
      props: true
    },
    {
      path: '/user',
      name: 'profile',
      component: Dashboard
    },
    // {
    //   path: '/notes',
    //   name: 'notes',
    //   component: NotesView
    // },
    {
      path: '/maps',
      name: 'maps',
      component: MapsView
    },
    {
      path: '/messages',
      name: 'messages',
      component: MessagesView
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
    {
      path: '/boss',
      name: 'boss',
      component: BossView,
      children: [
        {
          path: '/boss/all',
          component: () => import('@/views/boss/AllTributes.vue')
        },
        {
          path: '/boss/broodmother',
          component: () => import('@/views/boss/Broodmother.vue')
        },
        {
          path: '/boss/megapithecus',
          component: () => import('@/views/boss/Megapithecus.vue')
        },
        {
          path: '/boss/dragon',
          component: () => import('@/views/boss/Dragon.vue')
        },
        {
          path: '/boss/overseer',
          component: () => import('@/views/boss/Overseer.vue')
        }
      ]
    },
    {
      path: '/spawnCommands',
      name: 'spawnCommands',
      component: AdminSpawnCommands
    }
  ]
})

router.beforeEach(async (to) => {
  console.log('redirecting you to :', to.path)

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
