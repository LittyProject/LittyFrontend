<template>
  <div>
    <HomeApp v-if="this.$store.getters.getTab===0" login="true"></HomeApp>
    <DirectMessage v-if="this.$store.getters.getTab===1" login="true"></DirectMessage>
    <Settings v-if="this.$store.getters.getTab===2" login="true"></Settings>
  </div>
</template>

<script>
import HomeApp from "@/components/tabs/HomeApp";
import DirectMessage from "@/components/tabs/DirectMessage";
import Settings from "@/components/tabs/Settings";

export default {
  name: "WebApp",
  components: {HomeApp, DirectMessage, Settings},
  data(){
    return{
      tab: 0,
    }
  },
  methods:{
    setTab(tab){
      localStorage.setItem("tab", tab);
      this.$store.commit("updateTab", tab);
      this.tab=tab;
    }
  },
  sockets: {
    connect: function () {
      this.$socket.emit('authentication', {token: localStorage.getItem("token")});
    },
    customEmit: function () {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    }

  },
  mounted() {
    if(localStorage.getItem("tab")) {
      this.tab=parseInt(localStorage.getItem("tab"));
      this.$store.commit("updateTab", parseInt(localStorage.getItem("tab")));
    }

    setTimeout(() => {
      setInterval(() => {
        if (!this.$socket.connected) {
          this.$socket.connect();
          setTimeout(() => {
            this.$socket.emit('authentication', {token: localStorage.getItem("token")});
          }, 1000);
        }
      }, 6000);
    }, 10000);
  }
}
</script>

<style scoped>

</style>
