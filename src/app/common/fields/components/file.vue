<template>
  <field :class="classNames"
         v-bind="{dependsIsOk, id, inline, problem, problems, label, validate, title, tooltip, editable}">
    <div slot="component">
      <q-uploader ref="input" v-bind="options" @add="add" @fail="fail" @uploaded="uploaded" @start="start"
                  @finish="finish"></q-uploader>
    </div>
  </field>
</template>

<script type="text/javascript">
  import Field from 'src/app/common/fields/components/field.vue'
  import FieldAbstract from 'src/app/common/fields/abstract'
  import { URL_FILE_UPLOAD } from 'src/support/index'

  export default {
    extends: FieldAbstract,
    components: {
      Field
    },
    name: 'field-file',
    data: () => ({}),
    props: {
      title: 'Este campo possui critérios de validação',
      options: {
        default: () => ({
          url: URL_FILE_UPLOAD
        })
      }
    },
    methods: {
      add (files) {
        console.log('@add(files)')
        // noinspection JSUnresolvedVariable
        window.setTimeout(this.$refs.input.upload, 500)
      },
      fail (file, xhr) {
        console.log('@fail(file, xhr)')
      },
      uploaded (file, xhr) {
        this.updateValue(xhr.responseText)
        console.log(file, xhr)
      },
      start () {
        console.log('@start')
      },
      finish () {
        console.log('@finish')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .field-file
    .error-message, .label-with-error
      color darkred
    .error-message
      font-size 12px
      i
        font-size 14px
        cursor pointer
</style>
