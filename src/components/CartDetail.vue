<template>
  <div class="modal" v-bind:class="{'is-active':  showModal}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Estos son tus productos</p>
        <button class="delete" aria-label="close" @click="showModal=false"></button>
      </header>
      <section class="modal-card-body">
        <div>
          <ul>
            <li v-for="p in $store.getters.shoppingCart.list" :key="p.id">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <!-- img -->
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <!-- product -->
                    <div class="media-content">
                      <p class="title is-5">{{ p.data.name }}</p>
                      <p class="subtitle is-6">$ {{ p.data.price * p.qty }}</p>
                    </div>
                     <div class="counter">
                      <button @click="decrQty(p.id)" :disabled="p.qty === 1"><i class="mdi mdi-minus"></i></button>
                      {{ p.qty }}
                      <button @click="incrQty(p.id)"><i class="mdi mdi-plus"></i></button>
                      <p>
                           {{ p.qty }} x $ {{ p.data.price }} &nbsp;
                      </p>
                    </div>                   
                    <button class="button is-danger is-small" @click="$store.dispatch('removeFromCart', p.id)">
                      <span class="icon is-small is-left">
                        <i class="mdi mdi-18px mdi-delete"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <hr>
        <!-- Total -->
        <div>
          <div>
            <div class="is-pulled-right">
              <p class="title is-4">
                Total: $ {{ $store.getters.shoppingCart.total }}
              </p>
            </div>
            <div>
              <button class="button is-warning" @click="$store.dispatch('clearCart')">
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>
        <!-- Content ... -->
      </section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="showModal=false">Volver</button>
        <button class="button is-success is-pulled-right">Finalizar Compra</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'CartDetail',
  components: {},
  props: {},
  data() {
    return {}
  },
  methods: {
     incrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      this.products[idx].qty++
      let prod = this.products[idx]
      let p = JSON.parse(JSON.stringify(prod))
      this.$store.dispatch('addToCart', p)
    },
    decrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      if(this.products[idx].qty > 1) {
        this.products[idx].qty--
        }
    },
  },
  computed: {
     ...mapState(['products']),
    showModal: {
      get () { return this.$store.getters.showCart },
      set (val) { this.$store.dispatch('updateShowCart', val) }
    },
  },
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>

</style>