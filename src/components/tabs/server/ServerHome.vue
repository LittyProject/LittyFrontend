<template>
  <div>
    <ServerNavbar></ServerNavbar>
    <ServerChannel v-if="this.channel"></ServerChannel>
    <div v-else>
      <Topbar icon="mdi-account-group" name="Lista członków serwera"/>
      <v-row
          class="pa-5"
      >
        <v-col>
          <v-list
              color="transparent"
              dark
              class="ml-4 mt-10"
          >
            <v-list-item-title>
              <h2>Dostępni</h2>
            </v-list-item-title>
            <v-list-item
                v-for="member in server.members.filter(x => x.status>1)"
                :key="member.id"
                class="pa-3"
            >
              <v-tooltip
                  bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <div
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-badge
                        dot
                        bottom
                        offset-x="8"
                        offset-y="5"
                        :color="utils.parseStatusToColor(member.status)"
                    >
                      <v-avatar
                          size="35"
                      >
                        <ProfilePopover :user="member"><v-avatar><img :src="member.avatarURL"/></v-avatar></ProfilePopover>
                      </v-avatar>
                    </v-badge>
                  </div>
                </template>
                <v-icon>{{utils.parseStatusToIcon(member.status)}}</v-icon> <span v-html="utils.parseStatus(member)"></span>
              </v-tooltip>
              <div class="d-block ml-4">
            <span class="d-block">
              <v-icon
                  v-if="server.ownerId===member.id"
                  color="warning"
                  size="22"
                  class="mr-1"
              >
                mdi-crown
              </v-icon>
              <strong>{{member.username}}#{{member.tag}}</strong></span>
                <v-icon small class="d-inline-block">{{utils.parseStatusToIcon(member.status)}}</v-icon> <span class="d-inline-block color-0" v-html="utils.parseStatus(member)"></span>
              </div>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <v-list
              color="transparent"
              dark
              class="ml-4 mt-10"
          >
            <v-list-item-title>
              <h2>Offline</h2>
            </v-list-item-title>
            <v-list-item
                v-for="member in server.members.filter(x => x.status===0||x.status===1)"
                :key="member.id"
                class="pa-3"
            >
              <v-tooltip
                  bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <div
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-badge
                        dot
                        bottom
                        offset-x="8"
                        offset-y="5"
                        :color="utils.parseStatusToColor(member.status)"
                    >
                      <v-avatar
                          size="35"
                      >
                        <ProfilePopover :user="member"><v-avatar><img :src="member.avatarURL"/></v-avatar></ProfilePopover>
                      </v-avatar>
                    </v-badge>
                  </div>
                </template>
                <span v-html="utils.parseStatus(member)"></span>
              </v-tooltip>
              <div class="d-block ml-2">
            <span class="d-block">
              <v-icon
                  v-if="server.ownerId===member.id"
                  color="warning"
                  size="22"
                  class="mr-1"
              >
                mdi-crown
              </v-icon>
              <strong>{{member.username}}#{{member.tag}}</strong></span>
                <span class="d-block color-0" v-html="utils.parseStatus(member)"></span>
              </div>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

import ServerNavbar from "@/components/layout/ServerNavbar";
import Topbar from "@/components/layout/Topbar";
import ProfilePopover from "@/components/layout/ProfilePopover";
import ServerChannel from "@/components/tabs/server/ServerChannel";
import colors from '@/assets/colors.json';
import utils from '@/utils';

export default {
  name: "ServerHome",
  components: {ServerChannel, ServerNavbar, Topbar, ProfilePopover},
  data(){
    return {
      colors,
      utils,
    }
  },
  computed:{
    server: {
      get() {
        return this.$store.getters.getCurrentServer;
      },
      set(server) {
        this.$store.dispatch("setServer", server);
      }
    },
    channel: {
      get() {
        return this.$store.getters.getCurrentChannel;
      }
    }
  },
}


</script>

<style scoped>

</style>
