
import { field } from 'src/support/model/index'
import { http, source } from 'src/support/services/http'

export const entity = 'category'

export const title = 'Categorias'

export const api = '/category'

export const path = '/dashboard/category'

export const service = http(api)

export const fields = () => {
  return [
    field('id', 'Código', '').$in('index').$grid({width: 10}).$(),
    field('name', 'Nome', 'field-text').$(),
    field('marker', 'Marcador', 'field-select').$form({source: source('/category/markers', {label: 'name', value: 'marker', image: 'marker'})}).$(),
    field('color', 'Cor', 'field-color').$()
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
