<template>
  <v-app>
    <Navbar v-if="isAuthorized" icon="mdi-comment-multiple" name="general"/>
    <Navbar v-else :icon="topbar[$route.name] ? topbar[$route.name].icon : 'mdi-comment-multiple'" :name="topbar[$route.name] ? topbar[$route.name].name : 'general'"/>
    <v-content
      class="dark-theme dark-content"
    >
     <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import colors from '@/assets/colors.json';
import topbar from '@/assets/topbar.json';

export default {
  name: 'Main',
  components: {
    Navbar
  },
  data: () => ({
    colors,
    topbar
  }),
  computed: {
    isAuthorized: {
      get() {
        return this.$store.getters.getIsAuth;
      },
      set() {
        return this.$store.commit("authorization");
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/main/index.scss";
</style>