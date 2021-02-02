
<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <button
            v-bind="attrs"
            v-on="on"
        >
          <v-badge
              right
              style="z-index: 1"
              offset-y="19"
              offset-x="-35"
              color="cyan lighten-2"
              :title="status"
          >
          </v-badge>
        </button>
        <slot></slot>
      </template>
      <v-list dark>
        <v-list-item @click="setStatus('1')">
          <v-list-item-title><span class="dot-green"></span> Dostępny/a</v-list-item-title>
        </v-list-item>
        <v-list-item @click="setStatus('0')">
          <v-list-item-title><span class="dot-grey"></span> Niedostępny/a</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "UserStatus",
  props: [
      'status'
  ],
  methods:{
    setStatus(status){
      this.$socket.emit('updateCustomStatus', {status: parseInt(status)});
    }
  }
}
</script>

<style scoped>

</style>