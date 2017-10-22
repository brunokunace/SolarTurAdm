/**
 * @param _item
 * @return {{value, label}}
 */
const mapOptions = _item => {
  return {
    value: _item.name,
    label: _item.label
  }
}

/**
 * @param _item
 */
const mapName = _item => _item.name

/**
 * @param property
 * @return {function(*)}
 */
const filterByProperty = property => {
  return _item => {
    return (_item[property] === true || _item[property] === undefined)
  }
}

export default {
  /**
   */
  mounted () {
    this.controls.pagination = this.page

    const filter = this.schemas.filter(filterByProperty('filter'))
    this.controls.filter.options = filter.map(mapOptions)
    this.controls.filter.model = filter.filter(filterByProperty('filtering')).map(mapName)

    const visibility = this.schemas.filter(filterByProperty('visibility'))
    this.controls.visibility.options = visibility.map(mapOptions)
    this.controls.visibility.model = visibility.filter(filterByProperty('visible')).map(mapName)

    this.controls.search = this.$route.query.search

    this.$refs.search.focus()
  }
}
