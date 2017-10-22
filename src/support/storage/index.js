// quasar wrappers
import {LocalStorage, SessionStorage} from 'quasar-framework'

export const get = (index) => {
  if (LocalStorage.get.item(index)) {
    return LocalStorage.get.item(index)
  }
  if (SessionStorage.get.item(index)) {
    return SessionStorage.get.item(index)
  }
}
