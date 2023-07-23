import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import { api } from './services/AxiosService'
import Pop from './utils/Pop'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/profile/:profileId',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: async (to) => {
      try {
        const profileId = to.params.profileId
        await api.get(`api/profiles/${profileId}`)
      }
      catch (error) {
        Pop.error('That user does not exist!')
        return { name: 'UserNotFound' }
      }
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/search',
    name: 'Search',
    component: loadPage('SearchPage'),
    beforeEnter: (to) => {
      if (!to.query.search) {
        return false
      }
    }
  },
  {
    path: '/usernotfound',
    name: 'UserNotFound',
    component: loadPage('UserNotFound')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: loadPage('NotFound')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
