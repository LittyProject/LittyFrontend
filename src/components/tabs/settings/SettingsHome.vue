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
            @click="updateAvatar=true"
        >
          <img :src="user.avatarURL" alt="Avatar"/>
          <UpdateAvatarModal></UpdateAvatarModal>
        </v-avatar>
      </UserStatus>
      <h2 class="mt-2">{{user.username}}<span>#{{user.tag}}</span></h2>
      <div class="mt-5">
        <v-chip
            v-for="badge in user.badges"
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
          @submit="editUserData"
      >
        <v-alert
            v-model="userdata.dimisableError"
            dense
            v-if="userdata.error.exist"
            type="error"
            dismissible
        >
          {{userdata.error.message}}
        </v-alert>
        <v-alert
            v-model="userdata.dimisableSuccess"
            dense
            v-if="userdata.success.exist"
            type="success"
            dismissible
        >
          {{userdata.success.message}}
        </v-alert>
        <v-row>
          <v-col>
            <v-text-field
                v-model="userdata.data.username"
                label="Nazwa użytkownika"
                type="text"
                outlined
                :rules="rules.username"
                dark
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
                v-model="userdata.data.tag"
                label="Tag"
                type="text"
                :rules="rules.tag"
                outlined
                dark
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
            label="Email"
            type="email"
            outlined
            disabled
            dark
        ></v-text-field>
        <v-btn
            absolute
            right
            color="success"
            class="mr-2"
            dark
            @click="editUserData"
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
import UpdateAvatarModal from "@/components/layout/UpdateAvatarModal";

export default {
  name: "SettingsHome",
  components: {UserStatus, UpdateAvatarModal},
  computed:{
    user:{
      get(){
        return this.$store.getters.getUser;
      }
    },
    updateAvatar:{
      get(){
        return this.$store.getters.isEditingAvatar;
      },
      set(val){
        this.$store.commit("editAvatar", val);
      }
    }
  },
  data(){
    return {
      avatar: false,
      userdata: {
        data:{
          username: this.$store.getters.getUser.username,
          tag: this.$store.getters.getUser.tag,
        },
        dimisableError: true,
        dimisableSuccess: true,
        error:{
          exist: false,
          message: null,
        },
        success:{
          exist: false,
          message: null
        }
      },
      rules: {
        username:[
          value => !!value || 'Username required.',
          value => (value || '').length > 2 || 'Must be 3 or more characters long',
          value => (value || '').length <= 24 || 'Must be 24 or fewer characters long',
        ],
        tag:[
          value => !!value || 'Tag required.',
          value => (value || '').length===4 || 'Must be 4 characters long',
        ]
      },
      colors,
      dev: false,
      changePasswordSwitched: false,
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
    },
    async editUserData(){
      if(!this.userdata.data.username||!this.userdata.data.tag){
        this.userdata.error.exist=true;
        this.userdata.error.message="Wypełnij poprawnie formularz";
        this.userdata.dimisableError=true;
        return;
      }
      if(!this.userdata.data.username){
        this.userdata.error.exist=true;
        this.userdata.error.message="Username required.";
        this.userdata.dimisableError=true;
        return;
      }
      if(!this.userdata.data.tag){
        this.userdata.error.exist=true;
        this.userdata.error.message="Tag required.";
        this.userdata.dimisableError=true;
        return;
      }
      if(this.userdata.data.username.length<3){
        this.userdata.error.exist=true;
        this.userdata.error.message="Username must be 3 or more characters long";
        this.userdata.dimisableError=true;
        return;
      }
      if(this.userdata.data.username.length>24){
        this.userdata.error.exist=true;
        this.userdata.error.message="Username must be 24 or fewer characters long";
        this.userdata.dimisableError=true;
        return;
      }
      if(this.userdata.data.tag.length !==4){
        this.userdata.error.exist=true;
        this.userdata.error.message="Tag must be 4 characters long";
        return;
      }
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` },
        body: JSON.stringify(this.userdata.data)
      };
      await fetch("http://localhost:1920/users/@me/edit", requestOptions).then(()=>{
        this.userdata.success.exist=true;
        this.userdata.success.message="Pomyślnie edytowano twoje dane";
        this.userdata.dimisableSuccess=true;
      }).catch(()=>{
        this.userdata.error.exist=true;
        this.userdata.error.message="Błędne dane lub użytkownik o tej nazwie i tagu już istnieją";
        this.userdata.dimisableSuccess=true;
      });
    }
  },
}
</script>

<style scoped>

</style>