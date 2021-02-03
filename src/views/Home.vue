<template>
  <div class="text-center">
    <v-toolbar
    dark
    outlined
    >
      <v-toolbar-title><v-img
          max-height="40"
          max-width="40"
          src="/img/logo.8ab74eac.svg"
          dark
          class="d-inline-block"
      ></v-img></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!user">
        <v-btn
            @click="$router.push( {name: 'Register'})"
        >
          Zarejestruj
        </v-btn>
        <v-btn
            @click="$router.push( {name: 'Login'})"
        >
          Zaloguj
        </v-btn>
      </div>
      <div v-else>
        <v-btn
            @click="$router.push( {name: 'WebApp'})"
        >
          Otwórz aplikacje
        </v-btn>
      </div>
    </v-toolbar>
    <div class="bg-1" style="width: 100%; height: 400px; padding: 15px;">
      <v-img
          max-height="150"
          max-width="150"
          src="/img/logo.8ab74eac.svg"
          dark
          class="d-inline-block"
      ></v-img>
      <h1 class="mb-5">Litty</h1>
      <h3 class="mb-4 mt-4">Miejsce spotkań wielu ludzi</h3>
    </div>
    <h1 class="mb-16 mt-16">Funkcje</h1>
    <v-row
      justify="center"
    >
      <v-col
          align-self="right"
          md="5"
      >
        <v-img
            max-height="350"
            max-width="350"
            src="/img/littyStatusy.0e51ba1f.gif"
            dark
            class="d-inline-block"
        ></v-img>
      </v-col>
      <v-col
          align-self="center"
          md="4"
      >
        <h4>Wiele dostępnych aktywności</h4>
        <p>Wybierz jedną z pośród 11 dostępnych</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data(){
    return{
      user: null,
    }
  },
  mounted() {
    if(localStorage.getItem("token")&&localStorage.getItem("user")){
      this.user = JSON.parse(localStorage.getItem("user"));
    }
  }
}
</script>
