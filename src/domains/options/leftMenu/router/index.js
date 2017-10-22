import { entity, title, grid, form } from 'src/domains/options/leftMenu/model'
import { crud } from 'src/support/router/resources'

export default [
  {
    path: entity,
    component: 'app/common/crud/index',
    props: {
      title: title
    },
    children: [
      crud(grid, entity, 'index', '', 'app/common/crud/grid'),
      crud(form, entity, 'create', 'create', 'app/common/crud/form'),
      crud(form, entity, 'view', ':id', 'app/common/crud/form'),
      crud(form, entity, 'edit', ':id/edit', 'app/common/crud/form')
    ]
  }
]
