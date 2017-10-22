import category from 'src/domains/content/category/router/index'
import establishment from 'src/domains/content/establishment/router/index'
import leftMenu from 'src/domains/options/leftMenu/router/index'
import options from 'src/domains/options/options/router/index'

export default [
  {
    path: '/dashboard',
    component: 'app/dashboard/index',
    children: [
      {
        path: '',
        component: 'app/dashboard/components/Home',
        name: 'dashboard.home'
      },
      ...category,
      ...establishment,
      ...leftMenu,
      ...options
    ]
  }
]
