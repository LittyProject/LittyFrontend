<template>
  <v-menu
      v-model="profile"
      dark
      rounded
      :nudge-width="200"
      :close-on-content-click="false"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
      >
        <slot></slot>
      </v-btn>
    </template>
    <v-card
        dark
        @contextmenu="show"
    >
      <v-list
          dark
          class="pa-3"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-badge
                dot
                bottom
                :color="utils.parseStatusToColor(user.status)"
                offset-x="7"

            >
              <v-avatar
                  size="45"
              >
                <img
                    :src="user.avatarURL"
                    :alt="user.username"
                    width="256"
                    height="256"
                >
              </v-avatar>
            </v-badge>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.username}}#{{user.tag}}</v-list-item-title>
            <v-spacer></v-spacer>
            <v-list-item-subtitle v-if="user.status<5">{{utils.parseStatus(user)}}</v-list-item-subtitle>
            <v-list-item-subtitle v-if="user.status>=5"><v-icon small>{{utils.parseStatusToIcon(user.status)}}</v-icon> <span v-html="utils.parseStatus(user)"></span></v-list-item-subtitle>
          </v-list-item-content>
          <div v-if="!this.$store.getters.getUser.friends.includes(`${user.id}`)">
            <v-btn outlined small class="mt-5 mb-5" color="white"><v-icon color="white">mdi-account-plus</v-icon></v-btn>
          </div>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-chip
                v-for="badge in user.badges"
                :key="badge.text"
                class="ma-2"
                :color="badge.color"
                label
                dark
                small
                outlined
            >
              <v-icon left>
                {{badge.icon}}
              </v-icon>
              <b v-if="!badge.link">{{badge.text}}</b>
              <b role="button" v-else @click="openNewTab(badge.link)">{{badge.text}}</b>
            </v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <UserRightClickMenu :x="x" :y="y" :user="user" :type="1" :showMenu="showMenu"></UserRightClickMenu>
  </v-menu>
</template>

<script>
const utils = require('@/utils');
import UserRightClickMenu from "@/components/layout/UserRightClickMenu";
import { mapGetters } from 'vuex'

export default {
  name: "ProfilePopover",
  components: {UserRightClickMenu},
  data(){
    return {
      profile: false,
      utils,
      showMenu: false,
      x: 0,
      y: 0,
    }
  },
  props: [
      'user'
  ],
  methods: {
    show (e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    openNewTab(link){
      window.open(link);
    },
  },
  computed:{
    u:{
      get(){
        return this.$store.getters.getUser;
      }
    },
    ...mapGetters(["isFriend"])
  }
}
</script>

<style scoped>

</style>