<template>
  <v-content class="pa-10">
    <div :style="'background-color: '+colors.dark+'; width: 100%'" class="rounded text-center pa-10">
      <UserStatus
          offsety="60"
          offsetx="-80"
      >
        <v-avatar
            :color="colors.grey"
            size="120"
        >
          <img :src="user.avatarURL" alt="Avatar"/>
        </v-avatar>
      </UserStatus>
      <h2 class="mt-2">{{user.username}}<span>#{{user.tag}}</span></h2>
      <div class="mt-5">
        <v-chip
            v-for="badge in badge"
            :key="badge.text"
            class="ma-2"
            :color="badge.color"
            label
            dark
            outlined
        >
          <v-icon left>
            {{badge.icon}}
          </v-icon>
          <b v-if="!badge.link">{{badge.text}}</b>
          <b role="button" v-else @click="openNewTab(badge.link)">{{badge.text}}</b>
        </v-chip>
      </div>
      </div>
    <div class="pa-0 pa-md-10">
      <h1>Moje konto</h1>
      <form
          class="pa-2 mt-5"
      >
        <v-row>
          <v-col>
            <v-text-field
                label="Nazwa użytkownika"
                type="text"
                outlined
                :value="user.username"
                dark
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                label="Tag"
                type="text"
                outlined
                :value="user.tag"
                dark
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
            label="Email"
            type="email"
            outlined
            dark
        ></v-text-field>
        <v-btn
            absolute
            right
            color="success"
            class="mr-2"
            dark
        >
          Zapisz
        </v-btn>
      </form>
      <v-progress-linear class="mt-16 mb-5" color="grey"></v-progress-linear>
      <h1 class="mt-16">Hasło <v-btn
          color="red"
          outlined
          @click="switchPasswordForm"
      >Zmień hasło</v-btn></h1>
      <form class="mt-5" v-if="changePasswordSwitched">
        <v-row>
          <v-col>
            <v-text-field
                label="Hasło"
                type="password"
                outlined
                dark
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                label="Powtórz hasło"
                type="password"
                outlined
                dark
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
            absolute
            right
            color="success"
            class="mr-2"
            dark
        >
          Zapisz
        </v-btn>
      </form>
      <v-progress-linear class="mt-16 mb-5" color="grey"></v-progress-linear>
      <h1 class="mt-16">Akcje konta</h1>
      <div class="mt-10 pa-2 pa-md-4">
        <v-btn
            color="warning"
            outlined
        >Wyłącz konto</v-btn>
        <v-btn
            color="red"
            class="ml-3"
            outlined
        >Usuń konto</v-btn>
        <v-switch
            v-model="dev"
            label="Funkcje developera"
            color="red"
            dark
            class="mt-10"
        ></v-switch>
      </div>
      <v-progress-linear class="mt-16 mb-5" color="grey"></v-progress-linear>
      <h1 class="mt-16">Inne ustawienia</h1>
      <div class="mt-10 pa-2 pa-md-4">
        <v-btn
            color="success"
            outlined
            @click="setSettingsPage(1)"
        >Powiadomienia</v-btn>
        <v-btn
            color="red"
            class="ml-3"
            outlined
            @click="setSettingsPage(2)"
        >Wygląd</v-btn>
        <v-btn
            color="blue"
            class="ml-3"
            outlined
            @click="setSettingsPage(3)"
        >Support</v-btn>
        <v-btn
            v-if="dev"
            color="warning"
            class="ml-3"
            outlined
            @click="setSettingsPage(4)"
        >Portal developera</v-btn>
      </div>
    </div>
  </v-content>
</template>

<script>
import colors from '@/assets/colors.json';
import UserStatus from "@/components/layout/UserStatus";

export default {
  name: "SettingsHome",
  props: [
      'user'
  ],
  components: {UserStatus},
  data(){
    return {
      colors,
      dev: false,
      changePasswordSwitched: false,
      badge:[
        {text: "Staff", icon: "mdi-wrench", color: "red"},
        {text: "Zweryfikowany", icon: "mdi-check-circle", color: "blue", link: "https://dlist.top/"}
      ]
    }
  },
  methods:{
    setSettingsPage(tab){
      this.$store.commit("updateSettingsTab", tab);
    },
    switchPasswordForm(){
      if(this.changePasswordSwitched){
        this.changePasswordSwitched=false;
      }else{
        this.changePasswordSwitched=true;
      }
    },
    openNewTab(link){
      window.open(link);
    }
  }
}
</script>

<style scoped>

</style>