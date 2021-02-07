<template>
  <div>
    <div class="text-center mt-5" v-if="!load">
      <img v-if="!error" src="@/assets/logo.svg" width="200" height="200">
      <v-icon v-if="error" :size="120" color="red">
        mdi-alert
      </v-icon>
      <h1 class="mt-2">Litty</h1>
      <div class="mt-10 mb-16" style="background-color: #414551; height: 4px; width: 90%; margin-left: 5%"></div>
      <v-progress-circular
          :size="70"
          :width="7"
          v-if="!error"
          color="white"
          class="mt-16"
          indeterminate
      ></v-progress-circular>
      <h3 v-if="!error" class="mt-10">Ładowanie aplikacji...</h3>
      <h1 v-if="error" class="mt-16 mb-16">Błąd podczas ładowania</h1>
      <v-btn @click="init" v-if="error" outlined color="success" class="mt-16">Spróbuj ponownie</v-btn>
    </div>
    <div v-else>
      <div v-if="this.$store.getters.isConnected">
        <HomeApp v-if="this.$store.getters.getTab===0" login="true"></HomeApp>
        <DirectMessage v-if="this.$store.getters.getTab===1" login="true"></DirectMessage>
        <Settings v-if="this.$store.getters.getTab===2" login="true"></Settings>
        <ServerHome v-if="this.$store.getters.getTab===3&&this.$store.getters.getActive.type===1" login="true"></ServerHome>
      </div>
      <div v-else class="text-center">
        <v-icon class="mt-16" :size="120" color="red">
          mdi-alert
        </v-icon>
        <h1 class="mt-2">Litty</h1>
        <div class="mt-10 mb-16" style="background-color: #414551; height: 4px; width: 90%; margin-left: 5%"></div>
        <h2 class="mt-16 mb-16 pt-16">Nie można nawiązać połączenia z serwerem Litty</h2>
        <v-btn @click="init" outlined color="success" class="mt-5">Spróbuj ponownie</v-btn>
        <div style="padding-top:5%;display: table;text-align: center;margin-left: auto;margin-right: auto;">
          <b><a>Zgłoś problem</a></b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeApp from "@/components/tabs/HomeApp";
import DirectMessage from "@/components/tabs/DirectMessage";
import Settings from "@/components/tabs/Settings";
import ServerHome from "@/components/tabs/server/ServerHome";

export default {
  name: "WebApp",
  components: {HomeApp, DirectMessage, Settings, ServerHome},
  data(){
    return{
      tab: 0,
      load: false,
      error: false
    }
  },
  methods:{
    setTab(tab){
      localStorage.setItem("tab", tab);
      this.$store.commit("updateTab", tab);
      this.tab=tab;
    },
    async init(load){
      if(load)this.load=false;
      this.error=false;
      if(!localStorage.getItem("token")){
        return await this.$router.push({name: "Login"});
      }
      if(localStorage.getItem("tab")) {
        this.tab=parseInt(localStorage.getItem("tab"));
        this.$store.commit("updateTab", parseInt(localStorage.getItem("tab")));
      }
      if(load){
        let user = {};
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` }
        };
        const response = await fetch("http://localhost:1920/users/@me", requestOptions).catch(()=> {this.error=true;console.error("Błąd podczas pobierania informacji o użytkowniku")});
        user=await response.json();
        user.token=localStorage.getItem("token");
        let servers = {};
        let friends = [];
        await Promise.all(
            user.servers.map(async (serverId) => {
              const requestOptions = {
                method: "GET",
                headers: { "Content-Type": "application/json", "Authorization": `BEARER ${user.token}` }
              };
              const response = await fetch("http://localhost:1920/servers/"+serverId, requestOptions).catch(()=> {this.error=true;console.error("Błąd podczas pobierania informacji o serwerze")});
              const data = await response.json();
              servers[data.id]=data;
            })
        );
        for(let a in user.friends){
          const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": `BEARER ${user.token}` }
          };
          const response = await fetch("http://localhost:1920/users/"+user.friends[a], requestOptions).catch(()=> {this.error=true;console.error("Błąd podczas pobierania informacji o serwerze")});
          const data = await response.json();
          friends.push(data);
        }
        await this.$store.dispatch("setToken", user.token);
        await this.$store.dispatch("setUser", user);
        await this.$store.dispatch("setServers", servers);
        await this.$store.dispatch("userFriends", friends);
      }
      this.$socket.emit('authentication', {token: this.$store.getters.getToken});
      if(this.$store.getters.isConnected){
        this.load=true;
      }else{
        this.error=true;
        this.load=false;
      }
    }
  },
  async created(){
    if(!localStorage.getItem("token")){
      return await this.$router.push({name: "Login"});
    }
    this.$socket.emit('authentication', {token: localStorage.getItem("token")});
  },
  async mounted() {
    await this.init(true);
  }
}
</script>

