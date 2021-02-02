<template>
  <div class="ml-5 text-center">
    <h1 class="mt-16 mb-5">Zaloguj się do Litty</h1>
    <form
        @submit="auth"
        class="text-left ml-16"
    >
      <div class="dark-error" id="feedback"></div>
      <label class="dark-content">
        <h1>Email</h1>
        <input name="email" type="email" class="dark-content" v-model="email" required/>
      </label>
      <label>
        <h1>Password</h1>
        <input name="password" type="password" class="dark-content" v-model="password" minlength="8" maxlength="32" required/>
      </label>
      <label>
        <input
            type="submit"
            value="Submit"
        >
      </label>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      errors: [],
      email: null,
      password: null,
      login: false,
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
          body: JSON.stringify({ email: this.email, password: this.password })
        };
        const response = await fetch("http://localhost:1920/auth/login", requestOptions);
        const data = await response.json();
        //document.getElementById("feedback").innerHTML = JSON.stringify(data);
        if(data.error) {
          document.getElementById("feedback").innerHTML = data.error;
          document.getElementById("feedback").innerHTML = JSON.stringify(data) + " Contact with support with providing this error";
        } else {
          if(!this.$store.getters.getIsAuth) this.$store.commit("authorization");
          this.$store.commit("updateToken", data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data));
          this.$store.commit("updateUser", data);
          await this.$router.push({name: "WebApp"});
        }
        return false;
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push('Email required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }

      document.getElementById("feedback").innerHTML = this.errors.map(val => val).join("<br><br>");
    }
  }
}
</script>

<style scoped>

</style>
