<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :color="colors.otherDark"
        app
    >
      <div v-if="login">
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
                <span style="font-size: 16px">{{ this.user.username }}</span><div style="display: inline-block; margin-left: 4px;" v-if="this.user.badges.includes('VERIFIED')">
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
          <v-list-item
              v-for="server in servers"
              :key="server.name"
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
              ><h3 class="d-block">{{ server.name }}</h3><span class="d-block mt-2 ml-1"><div class="dot-green"></div> {{ getServer(server.id).members.filter(x => x.status>1).length }} <div class="ml-2 dot-grey"></div>{{getServer(server.id).members.filter(x => x.status===0||x.status===1).length }}</span></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div>
          <button>

          </button>
        </div>
      </div>
      <div v-else>
        <v-list-item>
          <v-list-item-content class="dark-content" @click="to('Home')">
            <v-list-item-title class="title">
              <v-avatar
                  :color="colors.grey"
                  size="32"
                  max-width="32"
                  class="mr-5"
              >
                <img :src="logo" alt="Litty"/>
              </v-avatar>
              Litty
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
          <v-list-item
              link
              class="dark-list"
              @click="to('About')"
          >
            <v-icon
                :color="colors.white"
                class="mr-5"
                medium
            >
              mdi-information
            </v-icon>

            <v-list-item-content class="dark-content">
              <v-list-item-title>About us</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
          <v-list-item
              link
              class="dark-list"
              @click="to('Login')"
          >
            <v-icon
              :color="colors.white"
              class="mr-5"
              medium
            >
              mdi-login-variant
            </v-icon>

            <v-list-item-content class="dark-content">
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
              link
              class="dark-list"
              @click="to('Register')"
          >
            <v-icon
                :color="colors.white"
                class="mr-5"
                medium
            >
              mdi-account-plus
            </v-icon>

            <v-list-item-content class="dark-content">
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
          <v-list-item
              link
              class="dark-list"
              @click="to('Colors')"
          >
            <v-icon
                :color="colors.white"
                class="mr-5"
                medium
            >
              mdi-palette
            </v-icon>

            <v-list-item-content class="dark-content">
              <v-list-item-title>Colors</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <Topbar :icon="icon" :name="name"/>
  </div>

</template>

<script>
import colors from '@/assets/colors.json';
import Topbar from "@/components/layout/Topbar";
import UserStatus from "@/components/layout/UserStatus";
import logo from '../../assets/logo.svg';
import { mapGetters } from "vuex"

export default {
  name: 'Navbar',
  components: {Topbar, UserStatus},
  props: [
    'name', 'icon'
  ],
  data: () => {
    return {
      colors,
      logo,
      servers: [],
      user: {},
      login: false,
      tab: 0,
      nav: 0,
    }
  },
  async mounted() {
    if(localStorage.getItem("token")){
      this.login=true;
      this.user=JSON.parse(localStorage.getItem("user"));
      this.servers=JSON.parse(localStorage.getItem("servers"));
      if(localStorage.getItem("tab")){
        this.tab=parseInt(localStorage.getItem("tab"));
      }
    }
  },
  methods: {
    to(value) {
      this.$router.push({name: value});
    },
    setTab(tab){
      let a = parseInt(tab);
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
      }
      this.$store.commit("updateActive", active);
    }
  },
  sockets:{
    updateCustomStatus: function (data){
      if(data.status) {
        let s = this.$store.getters.getServersData;
        for(let a in s){
          s[a].members.map(b=>{
            if(b.id===data.id){
              b.status=data.status;
            }
          });
        }
        if(data.customStatus) {
          let s = this.$store.getters.getServersData;
          for (let a in s) {
            s[a].members.map(b => {
              if (b.id === data.id) {
                b.customStatus = data.customStatus;
              }
            });
          }
        }
        this.$store.commit("updateServersData", s);
      }
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
    ...mapGetters(['getServer'])
  }
}

</script>
