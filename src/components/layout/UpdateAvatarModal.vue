<template>
  <v-row justify="center">
    <v-dialog
        v-model="updateAvatar"
        max-width="600px"
        dark
    >
      <v-card>
        <v-card-title>
          <span class="headline">Zmień avatar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="text-center">
              <v-avatar
                size="120"
                color="grey"
              >
                <img :src="url" alt="Avatar"/>
              </v-avatar>
              <small class="d-block">Wizualizacja avataru</small>
            </div>
            <v-alert
                v-model="dimisable"
                dense
                v-if="exist"
                :type="type"
                dismissible
            >
              {{message}}
            </v-alert>
            <v-text-field
                label="Link do avataru"
                required
                v-model="url"
                :value="user.avatarURL"
                :disabled=" type&&type === 'success'"
                :rules="rules"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="cancel"
          >
            {{type === 'success' ? 'Zamknij' : 'Anuluj'}}
          </v-btn>
          <v-btn
              color="success darken-1"
              text
              @click="save"
              v-if="type !=='success'"
          >
            Zapisz
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  name: "UpdateAvatarModal",
  data(){
    return {
      url: null,
      dimisable: true,
      exist: false,
      type: null,
      message: null,
      rules: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim
          return pattern.test(value) || 'Invalid url.'
        },
      ]
    }
  },
  methods:{
    async save(){
      if(!this.url){
        this.exist=true;
        this.message="Reguired.";
        this.type="error";
        this.dimisable=true;
        return;
      }
      const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim
      if(!pattern.test(this.url)){
        this.exist=true;
        this.message="Invalid avatar url";
        this.type="error";
        this.dimisable=true;
        return;
      }
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` },
        body: JSON.stringify({avatarURL: this.url, username: this.user.username, tag: this.user.tag})
      };
      await fetch("http://localhost:1920/users/@me/edit", requestOptions).then(()=>{
        this.exist=true;
        this.message="Pomyślnie edytowano twój avatar";
        this.type="success";
        this.dimisable=true;
      }).catch(()=>{
        this.exist=true;
        this.message="Błąd podczas zmiany avatara";
        this.type="error";
        this.dimisable=true;
      });
    },
    cancel(){
      this.url=null;
      this.type=null;
      this.dimisable=true;
      this.message=null;
      this.exist=false;
      this.updateAvatar=false;
    },
  },
  mounted() {
    this.type=null;
    this.dimisable=true;
    this.message=null;
    this.exist=false;
  },
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
  }
}
</script>

<style scoped>

</style>