<template>
  <div class="common-grid">

    <slot name="toolbar">

      <div class="grid" v-show="toolbar">
        <div class="cell grid-refresh" v-show="refresh">
          <q-button :color="'primary'" :raised="true" :outline="true" :icon="'refresh'" @click="reloadRecords"></q-button>
        </div>
        <slot name="custom"></slot>
        <div class="cell grid-visible" v-show="visibility">
          <i>visibility</i>
          <q-dialog-select :options="controls.visibility.options" type="toggle" title="Visível" placeholder="Nenhum"
                           v-model="controls.visibility.model" @input="changeVisibility"></q-dialog-select>
        </div>
        <div class="cell grid-filter" v-show="filter">
          <i>filter_list</i>
          <q-dialog-select :options="controls.filter.options" type="toggle" title="Filtros" placeholder="Nenhum"
                           v-model="controls.filter.model" @input="changeFilter"></q-dialog-select>
        </div>
        <div class="cell grid-search" v-show="search">
          <q-search ref="search" placeholder="Pesquisar" autofocus :debounce="debounce" v-model="controls.search"
                    @input="changeSearch"></q-search>
        </div>
        <div class="cell grid-pagination align-right no-rotate" v-show="pagination">
          <q-pagination :min="1" :max="pages" v-model="controls.pagination"
                        @input="changePage"></q-pagination>
        </div>
      </div>

    </slot>

    <slot name="body">
      <div v-if="empty" class="grid-container">

        <div class="grid-header" v-if="header" :style="headerStyle">
          <div class="header-options" v-html="options.label"></div>
          <div class="grid">
            <div v-for="schema in available" v-html="schema.label" @click="changeOrder(schema)"
                 :class="parseClassHeader(schema)" :style="parseStyleHeader(schema)"></div>
          </div>
        </div>

        <common-grid-body v-show="records.length" :action="action" :actions="middle" :editable="editable"
                          :schemas="available" :records="records" :height="height" class="grid-body"
                          :widthFields="widthFields" :handler="handlerAction" :sortable="sortable" @sorted="changeSort"></common-grid-body>
      </div>

      <div v-else>
        <slot name="empty"></slot>
      </div>

      <div class="fixed-bottom-right">
        <slot name="action-floating">
          <q-button v-for="action in floating" :key="action.id" @click="handlerAction(action)"
                    v-bind="action" :round="true"></q-button>
        </slot>
      </div>

    </slot>
  </div>
</template>

<script type="text/javascript">
  import CommonGridBody from 'src/app/common/grid/components/Body.vue'

  import GeneralComputed from 'src/app/common/general/mixin-computed'
  import GeneralMethods from 'src/app/common/general/mixin-methods'

  import MixinComponents from 'src/app/common/grid/mixins/components'
  import MixinMethods from 'src/app/common/grid/mixins/methods'
  import MixinProps from 'src/app/common/grid/mixins/props'
  import MixinData from 'src/app/common/grid/mixins/data'
  import MixinHooks from 'src/app/common/grid/mixins/hooks'
  import MixinComputed from 'src/app/common/grid/mixins/computed'
  import MixinWatch from 'src/app/common/grid/mixins/watch'

  export default {
    components: {
      CommonGridBody
    },
    mixins: [
      GeneralComputed, GeneralMethods,
      MixinMethods, MixinProps, MixinData, MixinHooks, MixinComputed, MixinWatch, MixinComponents
    ],
    name: 'common-grid'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .common-grid
    display block
    .grid-refresh
      max-width 50px
      button
        min-height 38px
        padding 0 10px
        box-shadow 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24), 0 0 2px rgba(0, 0, 0, 0.2)
        &:disabled
          background #f0f0f0
          color #c0c0c0

    .grid-filter, .grid-visible
      position relative
      max-width 160px
      .q-picker-textfield
        min-height 38px
        padding-left 24px
        &.disabled
          background #f0f0f0
          color #c0c0c0
      > i
        position absolute
        z-index 3
        margin 7px 4px
        color #c8c8c8

    .grid-search
      .q-search-input
        border-top 1px solid #e8e8e8

    .grid-pagination
      min-width 240px
      max-width 240px
      .q-pagination input
        width 100px !important
        &:disabled
          border-bottom 1px solid transparent

    .grid-container
      width 100%
      position relative
      overflow-y auto
      overflow-x scroll
      border-width 1px
      border-style solid
      border-color #ddd
      margin 8px 0 0 4px
      padding 0 0 10px 0

    .grid-header
      padding 8px 4px 2px 4px
      border-width 0 0 2px 0
      border-style solid
      border-color #BDBDBD
      font-family Roboto
      color rgba(0, 0, 0, 0.54)
      font-size 12px
      font-weight bold
      text-transform uppercase
      .header-options
        padding 5px
        width 70px
      .cell
        padding 5px 10px
        white-space nowrap
        overflow hidden;
        text-overflow ellipsis
      .orderly
        cursor pointer
    .fixed-bottom-right
      margin 20px
    .q-if
      font-size 16px
      min-height 38px
      margin 0
      padding 4px
      box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
      &.q-if-focused
        box-shadow 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24), 4px 1px 5px 0 rgba(0,0,0,0.05), -4px 1px 5px 0 rgba(0,0,0,0.05)
    .q-pagination
      .q-if
        width 100px !important
    .q-if:before
      color white
    .q-if:before, .q-if:after
      bottom 0
</style>
