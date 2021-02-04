<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :color="colors.otherDark"
        app
    >
      <v-list-item>
        <v-list-item-content class="dark-content">
          <v-list-item-title class="title">
            <div class="mr-3 d-inline-block ds">
              <v-avatar
                  :color="colors.grey"
                  size="50"
                  max-width="50"
              >
                <img :src="this.getServer(this.$store.getters.getActive.id).iconURL" alt="Avatar"/>
              </v-avatar>
              <h5 class="d-inline-block">
                <div class="d-block mt-4 ml-3">
                  <span>{{this.getServer(this.$store.getters.getActive.id).name}}</span>
                  <span class="d-block"><div class="dot-green"></div> {{ this.getServer(this.$store.getters.getActive.id).members.filter(x => x.status>1).length }} <div class="ml-2 dot-grey"></div> {{ this.getServer(this.$store.getters.getActive.id).members.filter(x => x.status===0||x.status===1).length }}</span>
                </div>
              </h5>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-btn @click="switchMenu">Rozwiń menu</v-btn>
  </div>
</template>

<script>
import colors from '@/assets/colors.json';
import { mapGetters } from "vuex"

export default {
  name: "ServerNavbar",
  data(){
    return{
      drawer: false,
      colors
    }
  },
  computed: {
    ...mapGetters(['getServer'])
  },
  methods:{
    switchMenu(){
      if(this.drawer){
        this.drawer=false;
      }else{
        this.drawer=true;
      }
    }
  }
}
</script>

<style scoped>

</style>