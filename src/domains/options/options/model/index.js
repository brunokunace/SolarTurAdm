
import { field } from 'src/support/model/index'
import { http } from 'src/support/services/http'

export const entity = 'options'

export const title = 'Opções'

export const api = '/options'

export const path = '/dashboard/options'

export const service = http(api)

export const fields = () => {
  return [
    field('id', 'Código', '').$in('index').$grid({width: 10}).$(),
    field('name', 'Nome', 'field-text').$(),
    field('value', 'Valor', 'field-text').$()
  ]
}

export const grid = () => {
  return {
    api: api,
    path: path,
    data: {
      pagination: true,
      search: true,
      schemas: fields(),
      actions: ($this, actions) => {
        return actions
      }
    }
  }
}

export const form = (scope) => {
  return {
    api: api,
    path: path,
    data: {
      scope: scope,
      schemas: fields(),
      actions: ($this, actions) => {
        return actions
      }
    }
  }
}
