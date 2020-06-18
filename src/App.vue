<template>
  <div id="app">
    <navbar :brand="'pan.ico sourdough'"/>
    <router-view/>
    <router-link to="Footer"></router-link>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>

<style lang="scss">
</style>
