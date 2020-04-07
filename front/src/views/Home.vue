<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Prueba Técnica</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" @click="logUserOut"> Salir</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section>
       <automovil/>
    </section>
  </div>

</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import Automovil from "../components/Automovil";
export default {
  name:'home',
  data() {
    return {
      user: {},
      components:{
        Automovil
      }
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem("jwt");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem("jwt");
      this.$router.push("/");
    }
  },

  created() {
    this.getUserDetails();
  }
};
</script>

<style scoped></style>
