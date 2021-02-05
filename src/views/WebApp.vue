<template>
  <div>
    <div class="text-center mt-5" v-if="!load">
      <img src="@/assets/logo.svg" width="200" height="200">
      <h1 class="mt-2">Litty</h1>
      <div class="mt-10 mb-10" style="background-color: #414551; height: 4px; width: 90%; margin-left: 5%"></div>
      <v-progress-circular
          :size="70"
          :width="7"
          color="white"
          class="mt-16"
          indeterminate
      ></v-progress-circular>
      <h3 class="mt-10">Ładowanie aplikacji...</h3>
    </div>
    <div v-else>
      <v-snackbar>elo</v-snackbar>
      <HomeApp v-if="this.$store.getters.getTab===0" login="true"></HomeApp>
      <DirectMessage v-if="this.$store.getters.getTab===1" login="true"></DirectMessage>
      <Settings v-if="this.$store.getters.getTab===2" login="true"></Settings>
      <ServerHome v-if="this.$store.getters.getTab===3&&this.$store.getters.getActive.type===1" login="true"></ServerHome>
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
      load: false
    }
  },
  methods:{
    setTab(tab){
      localStorage.setItem("tab", tab);
      this.$store.commit("updateTab", tab);
      this.tab=tab;
    }
  },
  async mounted() {
    if(!localStorage.getItem("token")){
      return await this.$router.push({name: "Login"});
    }
    if(localStorage.getItem("tab")) {
      this.tab=parseInt(localStorage.getItem("tab"));
      this.$store.commit("updateTab", parseInt(localStorage.getItem("tab")));
    }
    let user = {};
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` }
    };
    const response = await fetch("http://localhost:1920/users/@me", requestOptions);
    user=await response.json();
    let servers = {};
    await Promise.all(
        user.servers.map(async (serverId) => {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": `BEARER ${user.token}` }
        };
        const response = await fetch("http://localhost:1920/servers/"+serverId, requestOptions);
        const data = await response.json();
        servers[data.id]=data;
    }));
    localStorage.setItem("servers", JSON.stringify(servers));
    await this.$store.dispatch("setToken", user.token);
    await this.$store.dispatch("setUser", user);
    await this.$store.dispatch("setServers", servers);
    // setTimeout(() => {
    //   setInterval(() => {
    //     if (!this.$socket.connected) {
    //       this.$socket.connect();
    //       setTimeout(() => {
    //         this.$socket.emit('authentication', {token: localStorage.getItem("token")});
    //       }, 1000);
    //     }
    //   }, 6000);
    // }, 10000);
    this.$socket.emit('authentication', {token: localStorage.getItem("token")});
    if(this.$store.getters.isConnected){
      this.load=true;
    }else{
      this.load=false;
    }
    console.log(this.$store.getters.getSocketMessage);
  }
}
</script>

