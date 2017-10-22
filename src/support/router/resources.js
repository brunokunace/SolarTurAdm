/**
 * @param {Function} props
 * @param {string} entity
 * @param {Array} scope
 * @param {string} path
 * @param {string} component
 * @returns {Object}
 */
export const crud = (props, entity, scope, path, component) => {
  return {
    path: path,
    component: component,
    name: entity + '.' + scope,
    props: (route) => {
      return props(scope, route)
    }
  }
}
