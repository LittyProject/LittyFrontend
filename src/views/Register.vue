<template>
  <div class="ml-5 text-center">
    <img src="@/assets/logo.svg" width="200" height="200">
    <h1 class="mt-2">Dołącz do <strong>Litty</strong> właśnie teraz</h1>
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
            label="Nazwa użytkownika"
            v-model="username"
            hide-details="auto"
            outlined
            :rules="rules.username"
            class="mt-1 mb-1"
            dark
        ></v-text-field>
        <v-text-field
            label="Email"
            v-model="email"
            hide-details="auto"
            outlined
            :rules="rules.email"
            class="mt-2 mb-1"
            dark
        ></v-text-field>
        <v-row>
          <v-col>
            <v-text-field
                label="Hasło"
                outlined
                v-model="password"
                type="password"
                :rules="rules.password"
                class="mt-1 mb-1"
                dark
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                label="Powtórz hasło"
                outlined
                v-model="confirmPassword"
                type="password"
                :rules="rules.reapetPassword"
                class="mt-1 mb-1"
                dark
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
            depressed
            @click="auth"
            color="success"
            dark
            right
        >
          Zarejestruj
        </v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      error: "",
      email: null,
      password: null,
      confirmPassword: null,
      username: null,
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
          value => (value || '').length <= 16 || 'Max 16 characters',
        ],
        reapetPassword:[
          () => !!this.password || 'Najpierw podaj hasło',
          value => !!value || 'Wymagane.',
          value => (value || '').length <= 16 || 'Max 16 characters',
          value => value===this.password || 'Hasła nie są takie same'
        ],
        username: [
          value => !!value || 'Required.',
          value => (value || '').length <= 20 || 'Max 20 characters',
        ]
      },
    };
  },
  methods:{
    auth: async function (e) {
      e.preventDefault();
      if(this.email && this.password === this.confirmPassword && this.username){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: this.email, password: this.password, username: this.username })
        };
        const response = await fetch("http://192.168.8.42:1920/auth/register", requestOptions);
        const data = await response.json();
        //document.getElementById("feedback").innerHTML = JSON.stringify(data);
        if(data.error) {
          this.error="Wystąpił błąd podczas rejestracji. Sprawdź poprawność formularza"
        } else {
          if(!this.$store.getters.getIsAuth) this.$store.commit("authorization");
          this.$store.commit("updateToken", data.token);
          this.$store.commit("updateUser", data);
          await this.$router.push({name: "WebApp"});
        }
      }

      let error="";

      if (!this.email) {
        error= 'Email required.';
      } else if (this.password !== this.confirmPassword) {
        error= 'Password doesn\'t match.';
      } else if (!this.username) {
  error= 'Username required.';
      }

      this.error="Wystąpił błąd podczas rejestracji. Sprawdź poprawność formularza.<br><br>"+error;
      return false;
    }
  }
}
</script>

<style scoped>

</style>
