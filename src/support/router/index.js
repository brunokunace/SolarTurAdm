import Vue from 'vue'
import VueRouter from 'vue-router'

import { router as auth } from 'src/app/auth'
import { router as dashboard } from 'src/app/dashboard'
import { router as errors } from 'src/app/errors'

Vue.use(VueRouter)

function load (component) {
  if (!component) {
    return
  }
  return () => System.import(`src/${component}.vue`)
}

const configure = (routes) => {
  return routes.map(route => {
    route.component = load(route.component)
    if (route.children) {
      route.children = configure(route.children)
    }
    return route
  })
}

const routes = configure([
  ...auth,
  ...dashboard,
  ...errors
])

export default new VueRouter({
  routes: routes
})
