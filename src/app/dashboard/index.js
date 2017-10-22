export { default as router } from 'src/app/dashboard/router'
export { default as store } from 'src/app/dashboard/store'
export const menu = [
  {
    to: '/dashboard',
    label: 'Início',
    exact: true,
    left: {
      icon: 'home'
    }
  },
  {
    to: '/dashboard/category',
    label: 'Categorias',
    left: {
      icon: 'flag'
    }
  },
  {
    to: '/dashboard/establishment',
    label: 'Estabelecimentos',
    left: {
      icon: 'location_city'
    }
  },
  {
    to: '/dashboard/leftmenu',
    label: 'Menu Lateral',
    left: {
      icon: 'menu'
    }
  },
  {
    to: '/dashboard/options',
    label: 'Opções',
    left: {
      icon: 'settings'
    }
  }
]
