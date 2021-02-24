<template>
  <div>
    <div v-if="this.$store.getters.isConnected&&this.$store.getters.getSocketState.auth&&this.$store.getters.getSocketState.user&&this.$store.getters.getSocketState.server&&!this.$store.getters.getUser.banned">
      <HomeApp v-if="this.$store.getters.getTab===0" login="true"></HomeApp>
      <DirectMessage v-if="this.$store.getters.getTab===1" login="true"></DirectMessage>
      <Settings v-if="this.$store.getters.getTab===2" login="true"></Settings>
      <ServerHome v-if="this.$store.getters.getTab===3&&this.$store.getters.getActive.type===1" login="true"></ServerHome>
    </div>
    <div class="text-center" v-else-if="this.$store.getters.getSocketState.banned">
      <img src="@/assets/logo.svg" width="200" height="200">
      <h1 class="mt-2">Litty</h1>
      <div class="mt-10 mb-16" style="background-color: #414551; height: 4px; width: 90%; margin-left: 5%"></div>
      <v-progress-circular
          :size="70"
          :width="7"
          color="red"
          class="mt-16"
          indeterminate
      ></v-progress-circular>
      <h3 class="mt-10">Twój dostęp do aplikacji został wzbroniony</h3>
    </div>
    <div class="text-center" v-else>
      <img src="@/assets/logo.svg" width="200" height="200">
      <h1 class="mt-2">Litty</h1>
      <div class="mt-10 mb-16" style="background-color: #414551; height: 4px; width: 90%; margin-left: 5%"></div>
      <v-progress-circular
          :size="70"
          :width="7"
          color="white"
          class="mt-16"
          indeterminate
      ></v-progress-circular>
      <h3 v-if="!this.$store.getters.getSocketState.auth" class="mt-10">Oczekuje na odpowiedź serwera</h3>
      <h3 v-if="this.$store.getters.getSocketState.auth&&!this.$store.getters.getSocketState.user" class="mt-10">Autoryzacja</h3>
      <h3 v-if="this.$store.getters.getSocketState.auth&&this.$store.getters.getSocketState.user&&!this.$store.getters.getSocketState.server" class="mt-10">Oczekiwanie na liste serwerów</h3>
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
    async setTab(tab){
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
        if(this.$socket.connected){
          this.$socket.emit('authentication', {token: localStorage.getItem("token"), type: 'BEARER'});
        }
      }
      if(this.$store.getters.isConnected){
        this.load=true;
      }else{
        this.error=true;
        this.load=false;
      }
    }
  },
  async mounted() {
    await this.init(true);
  },
  computed:{
    socket(){
      return this.$store.getters.getSocketState;
    }
  }
}
</script>

