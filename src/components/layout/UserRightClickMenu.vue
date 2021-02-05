<template>
  <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      dark
      offset-y
  >
    <v-list v-if="type===1">
      <v-list-item>
        <v-list-item-icon><v-icon class="success--text">mdi-account-plus</v-icon></v-list-item-icon>
        <v-list-item-content class="success--text">Dodaj do znajomych</v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item role="button" v-clipboard:copy="user.id">
        <v-list-item-icon><v-icon>mdi-shield</v-icon></v-list-item-icon>
        <v-list-item-content>Zarządzaj użytkownikiem</v-list-item-content>
      </v-list-item>
      <v-list-item role="button" v-clipboard:copy="user.id">
        <v-list-item-icon><v-icon>mdi-shield-star</v-icon></v-list-item-icon>
        <v-list-item-content>Zarządzaj odznakami</v-list-item-content>
      </v-list-item>
      <v-list-item role="button" v-clipboard:copy="user.id">
        <v-list-item-icon><v-icon>mdi-shield-check</v-icon></v-list-item-icon>
        <v-list-item-content>Zweryfikuj serwery</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon class="red--text">mdi-gavel</v-icon></v-list-item-icon>
        <v-list-item-title class="red--text">Zbanuj {{user.username}} na Litty</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-icon><v-icon class="red--text">mdi-lock</v-icon></v-list-item-icon>
        <v-list-item-title class="red--text">Zablokuj {{user.username}}</v-list-item-title>
      </v-list-item>
      <v-list-item role="button" v-clipboard:copy="user.id">
        <v-list-item-icon><v-icon>mdi-content-copy</v-icon></v-list-item-icon>
        <v-list-item-content>Kopiuj ID</v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-if="type===2">
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
        <v-list-item-content>Oznacz jako przeczytane</v-list-item-content>
      </v-list-item>
      <v-list-item role="button" v-clipboard:copy="channel.id">
        <v-list-item-icon><v-icon>mdi-content-copy</v-icon></v-list-item-icon>
        <v-list-item-content>Kopiuj ID</v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list v-if="type===3">
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-shield</v-icon></v-list-item-icon>
        <v-list-item-content>Zarządzaj serwerem</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-shield-check</v-icon></v-list-item-icon>
        <v-list-item-content>Zweryfikuj serwer</v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
        <v-list-item-content>Oznacz jako przeczytane</v-list-item-content>
      </v-list-item>
      <v-list-item role="button" v-clipboard:copy="server.id">
        <v-list-item-icon><v-icon>mdi-content-copy</v-icon></v-list-item-icon>
        <v-list-item-content>Kopiuj ID</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "UserRightClickMenu",
  props: [
      'user',
      'channel',
      'server',
      'showMenu',
      'x',
      'y',
      'type'
  ],
  created() {
    if(!this.showMenu){
      this.showMenu=false;
    }
  },
}
</script>

<style scoped>

</style>