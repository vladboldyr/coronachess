const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/Home', component: () => import('pages/Home.vue') },
      { path: '/Authorization', component: () => import('pages/Auth/AuthorizationForDesk') },
      { path: '', component: () => import('pages/Main.vue') },
      { path: '/Course', component: () => import('pages/Course.vue') },
      { path: '/Profile', component: () => import('pages/UserProfile.vue') }
    ]
  },
  {
    path: '/Board', component: () => import('components/wrapper-board/Board.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
  // {
  //   path: '/Login-1',
  //   component: () => import('pages/Login-1.vue')
  // }
]

// Always leave this as last one
// if (process.env.MODE !== 'ssr') {
//
//   routes.push({
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/Error404.vue')
//   })
// }

export default routes
