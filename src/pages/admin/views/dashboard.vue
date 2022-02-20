<template>
  <div id="dashboard" class="body-common">dashboard</div>
</template>
<script>
// import axios from 'axios'
import { epidemic } from '@/api/question'
export default {
  name: 'dashboard',
  mounted() {
    epidemic().then(res => {
      console.log(res);
    })
  }
}
</script>
<style lang='scss' scoped>
</style>