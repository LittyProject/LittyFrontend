
<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div v-if="parseInt(status)>3">
          <button
              v-bind="attrs"
              v-on="on"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-badge
                      right
                      :color="color"
                      style="z-index: 1"
                      offset-y="19"
                      offset-x="-35"
                  >
                  </v-badge>
                </div>
              </template>
              <span><strong>{{type}}</strong> {{customStatus}}</span>
            </v-tooltip>
          </button>
          <slot></slot>
        </div>
        <div v-else>
          <button
              v-bind="attrs"
              v-on="on"
          >
            <v-badge
                right
                :color="color"
                style="z-index: 3"
                offset-y="19"
                offset-x="-35"
            >
            </v-badge>
          </button>
          <slot></slot>
        </div>
      </template>
      <v-list dark>
        <v-list-item @click="setStatus('1')">
          <v-list-item-title><span class="dot-green"></span> Dostępny/a</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setStatus('2')">
          <v-list-item-title><span class="doto"></span> Zaraz wracam</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setStatus('3')">
          <v-list-item-title><span class="dotr"></span> Nie przeszkadzać</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setStatus('-1')">
          <v-list-item-title><span class="dot-grey"></span> Niedostępny/a</v-list-item-title>
        </v-list-item>
        <v-spacer></v-spacer>
        <v-list-item>
          <CustomStatus></CustomStatus>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>

import CustomStatus from "@/components/layout/CustomStatus";
const utils = require('@/utils')

export default {
  name: "UserStatus",
  components: {CustomStatus},
  data(){
    return {
      color: "",
      customStatus: "",
      status: 0,
      type: ''
    }
  },
  sockets: {
    updateCustomStatus: function (data){
      if(data.status){
        this.color=utils.parseStatusToColor(data.status);
        this.status=parseInt(data.status);
        console.log(data);
      }
      if(data.customStatus&&data.status&&parseInt(this.status)>3){
        this.customStatus=data.customStatus;
        switch (parseInt(data.status)){
          case 4:
            this.type="Programuje w";
            return;
          case 5:
            this.type="Czyta";
            return;
          case 6:
            this.type="Uczy się";
            return;
          case 7:
            this.type="Robi zakupy w";
            return;
          case 8:
            this.type="Hackuje";
            return;
          case 9:
            this.type="Śpiewa";
            return;
          case 10:
            this.type="Gra w";
            return;
          case 11:
            this.type="Ogląda";
            return;
          case 12:
            this.type="Słucha";
            return;
          case 13:
            this.type="Rywalizuje";
            return;
          case 14:
            this.type="Ćwiczy";
            return;
          default:
            this.type="Coś robi w";
            return;
        }
      }
      console.log(data);
    }
  },
  mounted() {
    let i = JSON.parse(localStorage.getItem("user"));
    this.status=parseInt(i.status);
    this.color=utils.parseStatusToColor(this.status);
    if(this.status>3){
      this.customStatus=i.customStatus;
      switch (this.status){
        case 4:
          this.type="Programuje w";
          return;
        case 5:
          this.type="Czyta";
          return;
        default:
          this.type="Coś robi w";
          return;
      }
    }
  },
  methods:{
    setStatus(status){
      if(parseInt(status)===-1){
        this.$socket.emit('updateCustomStatus', {status: 0});
      }else{
        this.$socket.emit('updateCustomStatus', {status: parseInt(status)});
      }
      this.status=parseInt(status);
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/main/index.scss";
</style>
