<template>
  <form
      @submit="auth"
  >
    <div class="dark-error" id="feedback"></div>
    <label class="dark-content">
      <h1>Username</h1>
      <input name="username" type="text" class="dark-content" v-model="username" minlength="3" maxlength="24" required/>
    </label>
    <label class="dark-content">
      <h1>Email</h1>
      <input name="email" type="email" class="dark-content" v-model="email" required/>
    </label>
    <label>
      <h1>Password</h1>
      <input name="password" type="password" class="dark-content" v-model="password" minlength="8" maxlength="32" required/>
    </label>
    <label>
      <h1>Confirm Password</h1>
      <input name="confirmPassword" type="password" class="dark-content" v-model="confirmPassword" minlength="8" maxlength="32" required/>
    </label>
    <label>
      <input
          type="submit"
          value="Submit"
      >
    </label>
  </form>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      errors: [],
      email: null,
      password: null,
      username: null
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
        const response = await fetch("http://localhost:1920/auth/register", requestOptions);
        const data = await response.json();
        //document.getElementById("feedback").innerHTML = JSON.stringify(data);
        if(data.error) {
          document.getElementById("feedback").innerHTML = data.error;
        } else {
          if(!this.$store.getters.getIsAuth) this.$store.commit("authorization");
          this.$store.commit("updateToken", data.token);
          this.$store.commit("updateUser", data);
        }
      }

      this.errors = [];

      if (!this.email) {
        this.errors.push('Email required.');
      } else if (this.password !== this.confirmPassword) {
        this.errors.push('Password doesn\'t match.');
      } else if (!this.username) {
        this.errors.push('Username required.');
      }

      document.getElementById("feedback").innerHTML = this.errors.map(val => val).join("<br><br>");
      return false;
    }
  }
}
</script>

<style scoped>

</style>
