<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :color="colors.otherDark"
        app
    >
      <div v-if="isAuthorized">
        <v-list-item>
          <v-list-item-content class="dark-content">
            <v-list-item-title class="title">
              <v-avatar
                  :color="colors.grey"
                  size="32"
                  max-width="32"
                  class="mr-5"
              >
                <img :src="user.avatarURL" alt="Avatar"/>
              </v-avatar>
              {{ user.username }}#{{ user.tag }}
            </v-list-item-title>
            <v-list-item-subtitle>
              <span
                  class="ml-16"
              >
              </span>
              <span
                  class="ml-8"
              >
              </span>
              <v-icon
                  :color="colors.white"
                  medium
                  class="ml-3 dark-btn"
              >
                mdi-cog
              </v-icon>
              <v-icon
                  :color="colors.white"
                  medium
                  class="ml-3 dark-btn"
              >
                mdi-cog
              </v-icon>
              <v-icon
                  :color="colors.white"
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
            nav
        >
          <v-list-item
              v-for="server in servers"
              :key="server.name"
              link
              class="dark-list"
          >
            <v-list-item-icon>
              <v-avatar size="24">
                <img :src="server.iconURL" :alt="server.name"/>
              </v-avatar>
            </v-list-item-icon>

            <v-list-item-content class="dark-content">
              <v-list-item-title>{{ server.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
import logo from '../../../public/logo.svg';
export default {
  name: 'Navbar',
  components: {Topbar},
  props: [
    'name', 'icon'
  ],
  data: () => {
    return {
      colors,
      logo,
      servers: [
        {name: 'a', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'b', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'a', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'b', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'a', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'b', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'a', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'b', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'a', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'},
        {name: 'b', iconURL: 'https://cdn.discordapp.com/attachments/761583370916200461/766982399946915840/paleta1.png'}
      ],
      user: {username: "Mespi", tag: 6377}
    }
  },
  methods: {
    to(value) {
      this.$router.push({name: value});
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
    }
  }
}

</script>