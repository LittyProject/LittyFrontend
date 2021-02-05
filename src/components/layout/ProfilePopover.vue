<template>
  <v-menu
      v-model="profile"
      dark
      rounded
      :nudge-width="200"
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
    >
      <v-list
          dark
          class="pa-5"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-badge
                dot
                bottom
                offset-x="10"
                offset-y="10"
                style="z-index: 10"
                :color="utils.parseStatusToColor(user.status)"
            >
              <v-avatar
                  size="35"
              >
                <img
                    :src="user.avatarURL"
                    :alt="user.username"
                >
              </v-avatar>
            </v-badge>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{user.username}}#{{user.tag}}</v-list-item-title>
            <v-spacer></v-spacer>
            <v-list-item-subtitle v-if="user.status>=5"><v-icon>{{utils.parseStatusToIcon(user.status)}}</v-icon> <span v-html="utils.parseStatus(user)"></span></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title><h3>Akcje</h3></v-list-item-title>
            <v-list-item-subtitle><v-btn outlined small class="mt-5 mb-5" color="success">Dodaj</v-btn></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
const utils = require('@/utils')
export default {
  name: "ProfilePopover",
  data(){
    return {
      profile: false,
      utils
    }
  },
  props: [
      'user'
  ]
}
</script>

<style scoped>

</style>