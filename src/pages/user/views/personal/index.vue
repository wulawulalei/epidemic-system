<template>
  <div id="personal">
    <Info/>
    <Card/>
  </div>
</template>
<script>
import Info from './components/info'
import Card from './components/outgoingcard'
export default {
  name: 'personal',
  components: {
    Info,
    Card
  }
}
</script>
<style lang='scss' scoped>
#personal {
  display: flex;
  justify-content: space-between;
  margin-top: 76px;
}
</style>
