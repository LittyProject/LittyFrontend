<template>
  <div>
    <ServerNavbar></ServerNavbar>
    <ServerChannel v-if="getActive().currentChannel"></ServerChannel>
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
                v-for="member in getServer(this.getActive().id).members.filter(x => x.status>1)"
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
                        <img :src="member.avatarURL"/>
                      </v-avatar>
                    </v-badge>
                  </div>
                </template>
                <span v-html="utils.parseStatus(member)"></span>
              </v-tooltip>
              <div class="d-block ml-2">
            <span class="d-block">
              <v-icon
                  v-if="getServer(getActive().id).ownerId===member.id"
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
                v-for="member in getServer(this.getActive().id).members.filter(x => x.status===0||x.status===1)"
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
                        <img :src="member.avatarURL"/>
                      </v-avatar>
                    </v-badge>
                  </div>
                </template>
                <span v-html="utils.parseStatus(member)"></span>
              </v-tooltip>
              <div class="d-block ml-2">
            <span class="d-block">
              <v-icon
                  v-if="getServer(getActive().id).ownerId===member.id"
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

import { mapGetters } from "vuex"
import ServerNavbar from "@/components/layout/ServerNavbar";
import Topbar from "@/components/layout/Topbar";
import ServerChannel from "@/components/tabs/server/ServerChannel";
import colors from '@/assets/colors.json';
import utils from '@/utils';

export default {
  name: "ServerHome",
  components: {ServerChannel, ServerNavbar, Topbar},
  data(){
    return {
      colors,
      utils
    }
  },
  computed:{
    ...mapGetters(['getServer'])
  },
  methods:{
    getActive(){
      return this.$store.getters.getActive;
    },
  }
}
</script>

<style scoped>

</style>
