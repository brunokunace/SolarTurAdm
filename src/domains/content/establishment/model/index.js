
import { field } from 'src/support/model/index'
import { http, source } from 'src/support/services/http'

export const entity = 'establishment'

export const title = 'Estabelecimentos'

export const api = '/establishment'

export const path = '/dashboard/establishment'

export const service = http(api)

export const fields = () => {
  return [
    field('id', 'Código', '').$in('index').$grid({width: 10}).$(),
    field('name', 'Nome', 'field-text').$(),
    field('description', 'Descrição', 'field-wysiwyg').$scopes(['view', 'create', 'edit']).$(),
    field('photo', 'Foto', 'field-file').$out('index').$(),
    field('facebook', 'Facebook', 'field-text').$out('index').$(),
    field('instagram', 'Instagram', 'field-text').$out('index').$(),
    field('site', 'Site', 'field-text').$out('index').$(),
    field('phone', 'Telefone', 'field-text').$out('index').$(),
    field('address', 'Endereço', 'field-text').$out('index').$(),
    field('categories_id', 'Categoria', 'field-select').$form({source: source('/category/list', {label: 'name', value: 'id'})}).$out('index').$()
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
