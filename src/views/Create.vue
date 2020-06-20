<template>
    <div>
         <div class="container pt-6" >   
              <h1 class="title">Ingresa tu producto</h1>      
              <!--Ingresa el nombre del producto-->
              <div class="field is-horizontal mt-6">
                <div class="field-label is-normal">
                  <label class="label">Nombre</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <input class="input is-small" type="text" v-model="name"
                      placeholder="Ingresa el nombre de tu producto aquí">
                    </p>
                  </div>
                </div>
              </div>
              <!--ingresa el link de la foto con el producto-->
              <div class="field is-horizontal mt-5">
                <div class="field-label is-normal">
                  <label class="label">Fotografía</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <input class="input is-small" type="text" v-model="picture"
                      placeholder="Ingresa el Link de la foto del producto aquí">
                    </p>
                  </div>
                </div>
              </div>
              <!--Ingresa el Precio del producto-->
              <div class="field is-horizontal mt-5">
                <div class="field-label is-normal">
                  <label class="label">Precio</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <input class="input is-small" type="text" v-model="price"
                      placeholder="Ingresa el precio de tu producto aquí">
                    </p>
                  </div>
                </div>
              </div>
              <!--Ingresa la descripcion producto-->
              <div class="field is-horizontal mt-5">
                <div class="field-label is-normal">
                  <label class="label">Descripcion</label>
                </div>
                <div class="field-body">
                  <div class="field">
                    <p class="control is-expanded">
                      <input class="input is-small" type="text" v-model="description"
                      placeholder="Ingresa la descripción de tu producto aquí">
                    </p>
                  </div>
                </div>
              </div>


              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <button class="button is-pulled-right is-black is-small mt-4" @click="createProduct">
                        Agregar
                      </button>
                      <button class="button is-pulled-right is-danger is-small mt-4 mx-4" v-if="edit" @click="updateProduct(id)">
                        Actualizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
              <div class="container pt-6">
                  <h1 class="title">Productos</h1>
                  <table class='table table-striped'>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Imagen</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th colspan='2'> </th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr v-for='p in productList' :key='p.id'>
                          <td>{{ p.data.name }}</td>
                          <td><img :src="p.data.picture"></td>
                          <td>{{ p.data.price }}</td>
                          <td>{{ p.data.description }}</td>
                          <td>
                              <button class='button is-light is-small' @click="editProduct(p.id)">
                              <i class="mdi mdi-lead-pencil mr-1"/>Editar</button>
                            <div class='is-clearfix'></div>

                              <button class='button is-danger is-light is-small' @click="deleteProduct(p.id)">
                              <i class="mdi mdi-trash-can mr-1"/>Borrar</button>
                            <div class='is-clearfix'></div>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return{
        name:'',
        picture:'',
        price: '',
        description: '',
        id: undefined
        }
    },
    methods: {
        ...mapActions(['updateEdit']),
        createProduct(){
         let music = {
                name: this.name,
                picture: this.picture,
                price: this.price,
                description: this.description
                }
                axios.post('https://us-central1-tdg3-a200f.cloudfunctions.net/products/product', music,
                {headers: {'Content-type':'application/json'}})
                        .then((response) => {
                            console.log(response);
                            this.$store.dispatch('getProducts')
                        })
                        .catch((error) => {
                         console.log(error);
                        });
        },
        deleteProduct(id){
            let confirmation = confirm('Estás seguro que deseas eliminar?')
            if(confirmation) {
            axios.delete(`https://us-central1-tdg3-a200f.cloudfunctions.net/products/product/${id}`,
            {headers: {'Content-type':'application/json'}})
            .then(() => {
                alert('Producto eliminado exitosamente')
                this.$store.dispatch('getProducts')
            })     
            } 
        },
        editProduct(id){
            this.updateEdit()
            this.findProduct(id)
        },
        findProduct(id){
             axios.get(`https://us-central1-tdg3-a200f.cloudfunctions.net/products/product/${id}`,
            {headers: {'Content-type':'application/json'}})
            .then((response) => {
                this.name = response.data.name
                this.picture = response.data.picture
                this.price = response.data.price
                this.description = response.data.description
                this.id = id
            })
        },
        updateProduct(id){
          let music = {
                name: this.name,
                picture: this.picture,
                price: this.price,
                description: this.description
                }
                axios.put(`https://us-central1-tdg3-a200f.cloudfunctions.net/products/product/${id}`, music,
                {headers: {'Content-type':'application/json'}})
                        .then(() => {
                            this.name = ''
                            this.price = ''
                            this.picture = ''
                            this.id = ''
                            this.description = ''
                            this.$store.dispatch('getProducts')
                        })
                        .catch((error) => {
                         console.log(error);
                        });
        }, 
    },
    computed: {
        ...mapState(['products','edit']),
        productList(){
            return this.products
        }
    },
    mounted(){
        this.$store.dispatch('getProducts')
    },
}
</script>

<style scoped>
.column{
    width: 500px;
    padding-top: 20px;
    align-items: center;
}
table{
    width: 80vw;
}
img{
    height: 6vh;
}
</style>>