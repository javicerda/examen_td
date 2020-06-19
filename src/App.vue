<template>
  <div id="app">
    <!-- call to navbar -->
    <navbar :brand="'pan.ico sourdough'"/>
    <router-view/>
    <!-- footer -->
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Navbar,
    Footer
  },
}
</script>
