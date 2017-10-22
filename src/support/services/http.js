import api from 'src/support/services/api'

/**
 * @param {object} object
 * @param {string} prefix
 * @returns {string}
 */
export const serialize = (object, prefix) => {
  const string = []
  for (let property in object) {
    if (!object.hasOwnProperty(property)) {
      continue
    }
    let key = prefix ? prefix + '[' + property + ']' : property
    let value = object[property]
    let serialized = ''
    if (value && typeof value === 'object') {
      serialized = serialize(value, key)
    }
    else {
      serialized = encodeURIComponent(key) + '=' + encodeURIComponent(value)
    }
    string.push(serialized)
  }
  return string.join('&')
}

/**
 * @param {string} base
 * @param {string} uri
 * @param {object} parameters
 * @returns {string}
 */
export const url = (base, uri, parameters) => {
  return base + (uri ? '/' + uri : '') + (parameters ? '?' + serialize(parameters) : '')
}

/**
 * @param {string} path
 * @returns {function(data, uri, parameters)}
 */
export const create = (path) => {
  /**
   * @param {object} data
   * @param {string} uri
   * @param {object} parameters
   */
  return (data, uri, parameters) => {
    return api.post(url(path, uri, parameters), data)
  }
}

/**
 * @param {string} path
 * @returns {function(uri, parameters)}
 */
export const read = (path) => {
  /**
   * @param {string} uri
   * @param {object} parameters
   */
  return (uri, parameters) => {
    return api.get(url(path, uri, parameters))
  }
}

/**
 * @param {string} path
 * @returns {function(id, data, parameters)}
 */
export const update = (path) => {
  /**
   * @param {string} id
   * @param {object} data
   * @param {object} parameters
   */
  return (id, data, parameters) => {
    return api.put(url(path, id, parameters), data)
  }
}

/**
 * @param {string} path
 * @returns {function(id, parameters)}
 */
export const destroy = (path) => {
  /**
   * @param {object} path
   * @param {string} id
   * @param {object} parameters
   */
  return (id, parameters) => {
    return api.delete(url(path, id, parameters))
  }
}

/**
 * @param path
 * @returns {{post: (function(data, uri, parameters)), get: (function(uri, parameters)), put: (function(id, data, parameters)), patch: (function(id, data, parameters)), delete: (function(id, parameters))}}
 */
export const http = path => {
  return {
    post: create(path),
    get: read(path),
    put: update(path),
    patch: update(path),
    delete: destroy(path)
  }
}

/**
 * @param {string} api - endpoint of api
 * @param {string} value - property what is the value in options
 * @param {string} label - property what is the label in options
 * @param {string} extra - property what is the extra options in options
 * @return {function}
 */
export const source = (api, options = {}) => {
  /**
   * @param {function} callback
   */
  return (callback) => {
    return read(api)('')
      .then((response) => {
        let source = []
        if (Array.isArray(response.data)) {
          source = response.data.map((item) => {
            return Object.keys(options).reduce((accumulate, key) => {
              if (item[options[key]]) {
                accumulate[key] = item[options[key]]
              }
              return accumulate
            }, {})
          })
        }
        callback(source)
      })
  }
}
