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
              <UserStatus>
                <v-avatar
                    :color="colors.grey"
                    size="50"
                    max-width="50"
                >
                  <img :src="this.user.avatarURL" alt="Avatar"/>
                </v-avatar>
              </UserStatus>
            </div>
            <div class="d-inline-block">
              <span style="font-size: 16px">{{ this.user.username }}</span><div style="display: inline-block; margin-left: 4px;" v-if="this.user.flags.includes('VERIFIED')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="aqua" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
              </svg>
            </div>
              <span style="font-size: 15px; display: block">#{{ this.user.tag }}</span>
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
                class="ml-3 dark-btn"
                v-if="this.$store.getters.getNav<=0"
                @click="setTab(1)"
            >
              mdi-email-edit
            </v-icon>
            <v-icon
                :color="colors.white"
                medium
                class="ml-3 dark-btn"
                v-if="this.$store.getters.getNav>=1"
                @click="setTab(0)"
            >
              mdi-human-greeting
            </v-icon>
            <v-icon
                :color="colors.white"
                medium
                class="ml-3 dark-btn"
            >
              mdi-bell
            </v-icon>
            <v-icon
                :color="colors.white"
                medium
                class="ml-3 dark-btn"
                @click="setTab(2)"
            >
              mdi-cog
            </v-icon>
            <v-icon
                :color="colors.red"
                medium
                class="ml-3 dark-btn"
                @click="to('Logout')"
            >
              mdi-logout-variant
            </v-icon>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>


      <v-list
          dense
          v-if="this.$store.getters.getNav<=0"
          nav
      >
        <v-list-item dark>
          <CreateServerModal></CreateServerModal>
        </v-list-item>
        <v-list-item
            v-for="server in this.servers"
            :key="server.id"
            link
            class="dark-list pa-1"
        >
          <v-list-item-icon>
            <v-avatar size="35">
              <img :src="server.iconURL" :alt="server.name"/>
            </v-avatar>
          </v-list-item-icon>

          <v-list-item-content @click="setActive({type: 1, id: server.id, data: server})" class="dark-content">
            <v-list-item-title
            >
              <h3 class="d-block">
                <v-icon v-if="server.flags.includes('VERIFIED')&&!server.flags.includes('PARTNERED')" small color="light-blue">mdi-check-decagram</v-icon>
                <v-icon v-if="!server.flags.includes('VERIFIED')&&server.flags.includes('PARTNERED')" small color="green accent-2">mdi-shield-star</v-icon>
                <v-icon v-if="server.flags.includes('VERIFIED')&&server.flags.includes('PARTNERED')" small color="yellow lighten-1">mdi-flash-circle</v-icon>
                {{ server.name }}
              </h3>
              <span class="d-block mt-2 ml-1"><div class="dot-green"></div> {{ server.members.filter(x => x.status>1).length }} <div class="ml-2 dot-grey"></div>{{server.members.filter(x => x.status===0||x.status===1).length }}</span></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list
          dense
          v-if="this.$store.getters.getNav>=1"
          nav
      >
        <v-list-item
            v-for="friend in this.friends"
            :key="friend.id"
            link
            class="dark-list pa-1"
        >
          <v-list-item-icon>
            <v-badge
                dot
                bottom
                :color="utils.parseStatusToColor(friend.status)"
                offset-x="7"
            >
              <v-avatar size="35">
                <img :src="friend.avatarURL" :alt="friend.username"/>
              </v-avatar>
            </v-badge>
          </v-list-item-icon>
          <v-list-item-content  class="dark-content">
            <v-list-item-title
            ><h4 class="d-block">{{ friend.username }}#{{friend.tag}}</h4></v-list-item-title>
            <h6 class="text--white"><span class="d-block"><v-icon v-if="friend.status>4" small dark>{{utils.parseStatusToIcon(friend.status)}}</v-icon> <span class="text--white" v-html="utils.parseStatus(friend)"></span></span></h6>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div>
        <button>

        </button>
      </div>

    </v-navigation-drawer>

    <Topbar :icon="icon" :name="name"/>
  </div>

</template>

<script>
import colors from '@/assets/colors.json';
import Topbar from "@/components/layout/Topbar";
import CreateServerModal from "@/components/layout/CreateServerModal";
import UserStatus from "@/components/layout/UserStatus";
import logo from '../../assets/logo.svg';
const utils = require('@/utils')

export default {
  name: 'Navbar',
  components: {Topbar, UserStatus, CreateServerModal},
  props: [
    'name', 'icon'
  ],
  data: () => {
    return {
      colors,
      logo,
      login: false,
      tab: 0,
      nav: 0,
      utils
    }
  },
  async mounted() {
    if(localStorage.getItem("token")){
      this.login=true;
      if(localStorage.getItem("tab")){
        this.tab=parseInt(localStorage.getItem("tab"));
      }
    }
  },
  methods: {
    to(value) {
      this.$router.push({name: value});
    },
    async setTab(tab){
      let a = parseInt(tab);
      if(a===1){
        if(this.$store.getters.getFriends.length===0){
          let friends = [];
          for(let a in this.$store.getters.getUser.friends){
            const requestOptions = {
              method: "GET",
              headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` }
            };
            const response = await fetch("http://localhost:1920/users/"+this.$store.getters.getUser.friends[a], requestOptions);
            const data = await response.json();
            friends.push(data);
          }
          this.$store.dispatch("userFriends", friends);
        }
      }
      if(a<=0){
        localStorage.setItem("nav", tab);
        this.$store.commit("updateNav", 0);
        this.nav=0;
      }else if(a>=1){
        localStorage.setItem("nav", tab);
        this.$store.commit("updateNav", 1);
        this.nav=1;
      }
      localStorage.setItem("tab", tab);
      this.$store.commit("updateTab", tab);
      this.tab=tab;
    },
    setActive(active){
      if(active.type===1){
        this.$store.commit("updateTab", 3);
        this.$store.dispatch("setCurrentServerId", active.id);
      }
      this.$store.commit("updateActive", active);
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
    isAuthorized: {
      get() {
        return this.$store.getters.getIsAuth;
      },
      set() {
        return this.$store.commit("authorization");
      }
    },
    getUser: {
      get() {
        return this.$store.getters.getUser;
      },
    },
    user: {
      get(){
        return this.$store.getters.getUser;
      },
      set(user){
        this.$store.dispatch("updateUser", user);
      }
    },
    servers:{
      get(){
        return this.$store.getters.getServersArray;
      },
    },
    friends:{
      get(){
        return this.$store.getters.getFriends;
      }
    }
  }
}

</script>
