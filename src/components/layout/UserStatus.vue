
<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <div v-if="user.status>4">
          <button
              v-bind="attrs"
              v-on="on"
          >
            <v-tooltip
                bottom
                :offset-y="y"
                :offset-x="x"
            >
              <template v-slot:activator="{ on, attrs }">
                <div
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-badge
                      right
                      :color="utils.parseStatusToColor(user.status)"
                      style="z-index: 1"
                      :offset-y="y"
                      :offset-x="x"
                  >
                  </v-badge>
                </div>
              </template>
              <span v-html="utils.parseStatus(user)"></span>
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
                :color="utils.parseStatusToColor(user.status)"
                style="z-index: 3"
                :offset-y="y"
                :offset-x="x"
            >
            </v-badge>
          </button>
          <slot></slot>
        </div>
      </template>
      <v-list dark>
        <v-list-item @click="setStatus(2)">
          <v-list-item-title><span class="dot-green"></span> Dostępny/a</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setStatus(3)">
          <v-list-item-title><span class="doto"></span> Zaraz wracam</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setStatus(4)">
          <v-list-item-title><span class="dotr"></span> Nie przeszkadzać</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setStatus(1)">
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
      y: 19,
      x: -35,
      utils
    }
  },
  props: [
    'offsetx',
    'offsety'
  ],
  created() {
    if(this.offsetx){
      this.x=this.offsetx;
    }
    if(this.offsety) {
      this.y = this.offsety;
    }
  },
  mounted() {
    let i = JSON.parse(localStorage.getItem("user"));
    this.status=i.status;
    if(this.offsetx){
      this.x=this.offsetx;
    }
    if(this.offsety) {
      this.y = this.offsety;
    }
  },
  methods:{
    setStatus(status){
      this.$socket.emit('updateCustomStatus', {status: status});
    }
  },
  computed:{
    user:{
      get(){
        return this.$store.getters.getUser;
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/main/index.scss";
</style>
