<template>
  <common-card>
    <div slot="title">
      Início
    </div>
    <div slot="content">
      <q-icon name="home"></q-icon>
      <div class="text-center">
        <img src="statics/logo/logo.png" alt="logo" style="width: 70%">
      </div>
    </div>
  </common-card>
</template>

<script type="text/javascript">
  import CommonCard from 'src/app/common/card/index.vue'

  export default {
    components: {
      CommonCard
    },
    name: 'dashboard-home'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
