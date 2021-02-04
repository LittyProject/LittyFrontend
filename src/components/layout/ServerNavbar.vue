<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :color="colors.otherDark"
        app
    >
      <v-list-item>
        <v-list-item-content class="dark-content">
          <v-list-item-title class="title">
            <div class="mr-3 d-inline-block ds">
              <v-avatar
                  :color="colors.grey"
                  size="50"
                  max-width="50"
              >
                <img :src="this.getServer(getActive().id).iconURL" alt="Avatar"/>
              </v-avatar>
              <h5 class="d-inline-block">
                <div class="d-block mt-4 ml-3">
                  <span>{{this.getServer(getActive().id).name}}</span>
                  <span class="d-block"><div class="dot-green"></div> {{ this.getServer(getActive().id).members.filter(x => x.status>1).length }} <div class="ml-2 dot-grey"></div> {{ this.getServer(getActive().id).members.filter(x => x.status===0||x.status===1).length }}</span>
                </div>
              </h5>
            </div>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span
                class="ml-16"
            >
              </span>
            <v-icon
                :color="colors.white"
                medium
                title="Wróć do listy serwerów"
                class="ml-3 dark-btn"
                @click="goToServers"
            >
              mdi-arrow-left-bold-circle
            </v-icon>
            <v-icon
                :color="colors.white"
                medium
                title="Lista członków serwera"
                class="ml-3 dark-btn"
                @click="setActive({type: 1, id: getActive().data.id, data: getActive().data, currentChannel: null})"
            >
              mdi-account-group
            </v-icon>
            <v-icon
                :color="colors.white"
                medium
                class="ml-3 dark-btn"
            >
              mdi-cog
            </v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="channel in this.getServer(getActive().id).channels"
        :key="channel.name"
        link
        class="dark-list pa-1"
      >
        <v-list-item-icon>
          <v-avatar size="35">
            <v-icon
                :color="colors.white"
                medium
                class="ml-3 dark-btn"
            >
              {{ getActive().currentChannel != null ? "mdi-message" : "mdi-message-outline" }}
            </v-icon>
          </v-avatar>
        </v-list-item-icon>

        <v-list-item-content @click="setActive({type: 1, id: getActive().data.id, data: getActive().data, currentChannel: channel})" class="dark-content">
          <h3 class="dark-content">{{ channel.name }}</h3>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </div>
</template>

<script>
import colors from '@/assets/colors.json';
import { mapGetters } from "vuex"

export default {
  name: "ServerNavbar",
  data(){
    return{
      colors
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.getters.getDrawer;
      },
      set(value) {
        return this.$store.commit("updateDrawer", value)
      }
    },
    ...mapGetters(['getServer'])
  },
  methods:{
    switchMenu(){
      this.drawer = !this.drawer;
    },
    setActive(a){
      this.$store.commit('updateActive', a);
    },
    getActive(){
      return this.$store.getters.getActive;
    },
    goToServers(){
      this.$store.commit("updateTab", 0);
      this.$store.commit("updateActive", {});
    },
  }
}
</script>

<style scoped>

</style>
