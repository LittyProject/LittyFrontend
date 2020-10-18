<template>
  <v-app-bar app :color="colors.otherDark" >
    <v-icon :color="colors.white" class="mr-10" @click="updateDrawer">
      mdi-developer-board
    </v-icon>

    <v-toolbar-title
        class="dark-content"
    >
      <v-icon
          class="mr-5"
          :color="colors.white"
          medium
      >
        {{icon}}
      </v-icon> {{name}}
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
import colors from '@/assets/colors.json';
export default {
  name: 'Topbar',
  components: {},
  props: [
    'name', 'icon'
  ],
  data: () => {
    return {
      colors,
      drawer: true
    }
  },
  methods: {
    updateDrawer() {
      this.$store.commit("updateDrawer", !this.drawer)
      this.drawer = !this.drawer;
    }
  }
}

</script>