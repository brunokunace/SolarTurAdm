import api from 'src/support/services/api'
import { actions } from 'src/app/common/crud/model'
import { map as _map } from 'lodash'
import { defaults } from 'src/app/common/crud/components/grid/data'
import { toast, undo } from 'src/support/message'

export default {
  methods: {
    /**
     */
    mount () {
      Object.keys(defaults).forEach(property => {
        let value = defaults[property]
        if (this.data[property] !== undefined) {
          value = this.data[property]
        }
        this[property] = value
      })

      if (typeof this.actions === 'function') {
        this.actions = this.actions(this, actions(this))
      }
      if (!this.actions.length) {
        this.actions = actions(this)
      }
    },
    /**
     * @param {Array} schemas
     * @return {Array}
     */
    prepareFields (schemas) {
      let data = []
      schemas.forEach(schema => {
        if (schema.scopes.includes('index')) {
          data.push(schema.name)
        }
      })

      return data
    },
    /**
     * @param {Object} extraParams
     */
    fetchAll (extraParams = {}) {
      if (!this.api) {
        return
      }

      const query = {
        per_page: 5
      }
      Object.keys(this.$route.query).forEach((_item) => {
        if (this.$route.query[_item]) {
          query[_item] = this.$route.query[_item]
        }
      })

      const params = {
        params: {
          fields: this.prepareFields(this.schemas),
          ...query
        }
      }

      api.get(this.api, Object.assign(params, extraParams))
        .then(response => {
          this.populate(response.data)
          this.loaded = 'complete'
        })
        .catch(error => {
          this.loaded = 'error'
          console.error(error)
        })
    },
    /**
     * @param {Object} response
     */
    populate (response) {
      let records = []
      if (this.pagination) {
        if (!response.data) {
          return
        }
        records = response['data']
        this.page = response['current_page']
        this.pages = response['last_page']
      }
      if (!records.length && Array.isArray(response)) {
        records = response
      }
      this.records = records

      this.$emit('populate', response)
    },
    /**
     * @param {String} _id
     */
    remove (_id) {
      api.delete(this.api + '/' + _id)
        .then(response => {
          if (response.status === 204) {
            this.records.splice(this.records.findIndex(_record => _id === _record._id), 1)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * @param {String} query
     */
    changeSearch (query) {
      if (typeof query === 'string') {
        return this.$router.push({query: Object.assign({}, this.$route.query, {search: query})})
      }
    },
    /**
     * @param {int} pagination
     */
    changePage (pagination) {
      this.$router.push({query: Object.assign({}, this.$route.query, {page: pagination})})
    },
    /**
     * @param {Array} sorted
     */
    changeSort (sorted) {
      if (this.api) {
        api.patch(this.api, {op: 'sort', docs: _map(sorted, '_id')})
          .then(response => {
            if (response.status === 204) {
              this.records = sorted
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      this.records = sorted
      this.$emit('input', sorted)
    },
    /**
     * @param method
     * @param url
     * @param data
     * @param callback
     */
    request (method, url, data, callback) {
      const settings = {
        method: method,
        url: url,
        data: data
      }

      const run = (response) => {
        if (callback) {
          return callback(response)
        }
        toast(this.$t('crud.run.success'))
      }

      const error = () => {
        undo(this.$t('crud.run.error'), () => {
          api(settings).then(run).catch(error)
        })
      }

      api(settings).then(run).catch(error)
    }
  }
}
