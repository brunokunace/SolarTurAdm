/**
 * Vuex state
 */
import { APP_NAME, APP_USER } from 'src/support'
import { get } from 'src/support/storage'

const label = APP_NAME

let user = get(APP_USER)

export default {
  app: {
    name: label,
    title: label,
    menu: [],
    user: user
  }
}
