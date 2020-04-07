<template>
  <v-container>
    <v-flex >
          <v-card-actions>
            <div>
              <v-btn color="light-blue darken-4" dark large @click="dialog=true">Agregar</v-btn>
            </div>
         </v-card-actions>
    </v-flex>   
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
           <th class="text-uppercase">#</th>
           <th class="text-uppercase">Placas</th>
           <th class="text-uppercase">Marca</th>
           <th class="text-uppercase">Color</th>
           <th class="text-uppercase">Modelo</th>
           <th class="text-uppercase">Posición</th>
           <th class="text-uppercase">Accciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in autos" :key="index">
        <th scope="row">{{item._id}}</th>
        <td>{{item.placas}}</td>
        <td>{{item.marca}}</td>
        <td>{{item.color}}</td>
        <td>{{item.modelo}}</td>
        <td>{{item.posicion}}</td>
        <td>
          <v-btn class="btn-warning btn-sm mx-2" @click="activarEdicion(item._id)">Actualizar</v-btn>
          <v-btn class="btn-danger btn-sm mx-2" @click="deleteA(item._id)">Eliminar</v-btn>
        </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <v-dialog v-model="dialog" persistent width="400px" height="150px">
      <v-card>
        <v-card-title>
          <v-btn
             icon
             @click="dialog = false">
             <v-icon>mdi-close</v-icon>
          </v-btn>
          <span class="headline" aling="center">Datos del Vehículo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  class="text-uppercase"
                  id="placas"
                  label="Placas"
                  v-model="auto.placas">
                </v-text-field>
                  <v-text-field 
                  class="text-uppercase"
                  id="marca"
                  label="Marca"
                  v-model="auto.marca">
                </v-text-field>
                <v-select
                  class="text-uppercase"
                  :items="items"
                  id="Color"
                  label="Color"
                  v-model="auto.color"
                ></v-select>
                 <v-text-field 
                  class="text-uppercase"
                  id="modelo"
                  label="Modelo"
                  v-model="auto.modelo">
                </v-text-field>
                  <v-text-field 
                  class="text-uppercase"
                  id="posicion"
                  label="Posicion"
                  v-model="auto.posicion">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn  color="success" @click="insert(auto)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEditar" persistent width="400px" height="150px">
      <v-card>
        <v-card-title>
          <v-btn
             icon
             @click="dialogEditar = false">
             <v-icon>mdi-close</v-icon>
          </v-btn>
          <span class="headline" aling="center">Datos del Vehículo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field 
                  class="text-uppercase"
                  id="placas"
                  label="Placas"
                  v-model="autoEditar.placas">
                </v-text-field>
                <v-text-field 
                  class="text-uppercase"
                  id="marca"
                  label="Marca"
                  v-model="autoEditar.marca">
                </v-text-field>
                <v-select
                  class="text-uppercase"
                  :items="items"
                  id="Color"
                  label="Color"
                  v-model="autoEditar.color"
                ></v-select>
                <v-text-field 
                  class="text-uppercase"
                  id="modelo"
                  label="Modelo"
                  v-model="autoEditar.modelo">
                </v-text-field>
                <v-text-field 
                  class="text-uppercase"
                  id="posicion"
                  label="Posicion"
                  v-model="autoEditar.posicion">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn  color="success" @click="updateA(autoEditar._id)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
    <Mapa class="mapa"/>
  </div>
  </v-container>
</template>
<script>
import Mapa from "./maps/Mapa";
export default {
   name: 'Automovil',
   data() {
    return {
       components: {
        Mapa
      },
      auto:{},
      autos:[],
      autoEditar:{},
      dialog:false,
      dialogEditar:false,
      items:['Rojo','Azul','Amarillo']
    };
  },
  created(){
    this.listarAutos();
  },
  methods:{
    listarAutos(){
      this.axios.get('autos')
      .then((response) => {
        this.autos = response.data;
      })
      .catch((e)=>{
        console.log('error' + e);
      })
    },
    insert(item){
       this.axios.post('nuevo-auto', item)
       .then(res => {
          this.auto=[]
          this.listarAutos();
          this.dialog=false
        })
        .catch(e=>{
          console.log(e.response.data.error.errors.nombre.message);
        })  
    },
    deleteA(id){
       this.axios.delete(`/auto/${id}`)
      .then((res)=>{
        let index= this.autos.findIndex(item => item._id === res.data._id)
        this.autos.splice(index, 1)
      })
      .catch(e=>{
        console.log(e.response)
      })  
    },
    activarEdicion(id){
       this.dialogEditar=true
       this.axios.get(`/auto/?_id=${id}`)
      .then(res => {
        this.autoEditar = res.data;
      })
      .catch(e => {
        console.log(e.response);
      })
    },
    updateA(item){
        this.axios.put(`auto/${item._id}`, item)
      .then(res => {
        let index= this.autos.findIndex(itemA => itemA._id === this.autoEditar._id)
        this.autos[index].placas = this.autoEditar.placas;
        this.autos[index].marca = this.autoEditar.marca;
        this.autos[index].color = this.autoEditar.color;
        this.autos[index].modelo = this.autoEditar.modelo;
        this.autos[index].posicion = this.autoEditar.posicion;
        this.autoEditar={}
      })
      .catch(e => {
        console.log(e);
      })
    }

  }  
}
</script>
 
<style lang="scss" scoped>
  .mapa {
    height: 425px;
  }
</style>