<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="container">
    <!-- Brand -->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
       <i class="mdi mdi-barley mr-1"/>
        {{ brand }}
        </router-link>
        <a role="button"
        class="navbar-burger burger" aria-label="menu" aria-expanded="false"
        :class='{"is-active" :displayMenu}'
        data-target="navbarMenu"
        @click="displayMenu = !displayMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!-- NavBar Logic -->
    <div id="navbarMenu" class="navbar-menu" :class='{"is-active" : displayMenu}'>
        <div class="navbar-start">
        </div>
        <div class="navbar-end">
          <a data-testId='cart' class="navbar-item" @click="showCart">
            <span class="icon">
              <i class="mdi mdi-32px mdi-cart"></i>
              <span class="tag is-danger" v-if="$store.getters.shoppingCart.list.length > 0">
                {{ $store.getters.shoppingCart.list.length }}
              </span>
            </span>
          </a>
          <router-link v-if="!isLoggedIn" to="/login" class="navbar-item">
            Login
          </router-link>
          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                <span class="icon">
                  <i class="mdi mdi-32px mdi-account"></i>
                </span> Hola! {{ getCurrentUser ? getCurrentUser.email : ''}}
            </a>
            <!-- NavBar DropDown -->
            <div class="navbar-dropdown">
              <a class="navbar-item">
                Preferencias
              </a>
              <a class="navbar-item" @click="showCart">
                Ver Carrito
              </a>
               <a class="navbar-item">
                <router-link to="/create">Crear Producto</router-link>
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: '',
  components: {},
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      displayMenu: false,
    }
  },
  methods: {
    showCart(event) {
      event.preventDefault();
      this.$store.dispatch('updateShowCart', true)
    },
    logout() {
      Firebase.auth().signOut().then(()=>{
       this.$router.push('login')  
       this.$store.dispatch('updateUser', false)
      })
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    getCurrentUser(){
      return Firebase.auth().currentUser ? Firebase.auth().currentUser : ''
    }
  },
  watch: {},
  created() {},
  updated() {},
  mounted() {}
}
</script>