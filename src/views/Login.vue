<template>
  <div class="ml-5 text-center">
    <img src="@/assets/logo.svg" width="200" height="200">
    <h1 class="mt-2">Zaloguj się do litty</h1>
    <div class="mt-10 mb-10" style="background-color: #414551; height: 4px; width: 90%; margin-left: 5%"></div>
    <form
        @submit="auth"
        class="text-left ml-16"
    >

      <div style="width: 75%; margin-left: 10%;" class="mt-16 pa-5">
        <v-banner
            v-if="error.length>0"
            elevation="10"
            color="red"
            dark
            class="mb-5 pa-3 rounded"
            v-html="error"
        ></v-banner>
        <v-text-field
            label="Email"
            v-model="email"
            hide-details="auto"
            outlined
            :rules="rules.email"
            dark
        ></v-text-field>
        <v-text-field
            label="Hasło"
            outlined
            v-model="password"
            type="password"
            :rules="rules.password"
            class="mt-3"
            dark
        ></v-text-field>
        <v-btn
            depressed
            @click="auth"
            color="success"
            dark
            right
        >
          Zaloguj
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      error: "",
      email: null,
      password: null,
      login: false,
      rules: {
        email:[
          value => !!value || 'Required.',
          value => (value || '').length <= 20 || 'Max 20 characters',
          value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        ],
        password:[
          value => !!value || 'Required.',
          value => (value || '').length <= 20 || 'Max 20 characters',
        ]
      },
    };
  },
  mounted() {
    if(localStorage.getItem("token")){
      this.login=true;
    }
  },
  methods:{
    auth: async function (e) {
      e.preventDefault();
      if(this.email && this.password){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: `${this.email}`, password: `${this.password}`})
        };
        const response = await fetch("http://localhost:1920/auth/login", requestOptions);
        const data = await response.json();
        //document.getElementById("feedback").innerHTML = JSON.stringify(data);
        if(data.error) {
          this.error="Wprowadzono błędne dane spróbuj ponownie"
        } else {
          if(!this.$store.getters.getIsAuth) this.$store.commit("authorization");
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data));
          this.$store.dispatch("setToken", data.token);
          this.$store.dispatch("setUser", data);
          await this.$router.push({name: "WebApp"});
        }
        return false;
      }

      let error="";

      if (!this.email) {
        error= 'Email required.';
      } else if (!this.passwordd) {
        error= 'Password required.';
      }

      this.error=`Wystąpił błąd podczas logowania. Sprawdź poprawność formularza.<br><br><b>${error}</b>`;
    }
  }
}
</script>

<style scoped>

</style>
