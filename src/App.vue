<template>
  <div id="app">
    <!-- call to navbar -->
    <navbar :brand="'pan.ico sourdough'"/>
    <!-- overlay modal -->
    <div class="modal" :class="{'is-active': overlay}">
      <div class="modal-background"></div>
        <div class="modal-content">
          <progress class="progress is-danger" max="100">30%</progress>
        </div>
    </div>
    <router-view/>
    <!-- footer -->
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import {mapState} from 'vuex'

export default {
  components: {
    Navbar,
    Footer
  },
  computed:{
        ...mapState([ 'overlay' ])
    },
}
</script>
