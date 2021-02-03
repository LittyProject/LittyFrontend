<template>
  <div>
    <v-toolbar
        :color="colors.otherDark"
        dark
    >
      <v-toolbar-title>
        <button
            @click="setTab(0)"
        ><v-icon>mdi-home</v-icon> Kliknij, aby wrócić do aplikacji</button>
      </v-toolbar-title>
    </v-toolbar>
    <SettingsHome v-if="this.$store.getters.getSettingsTab===0" :user="this.user"></SettingsHome>
    <SettingsNotifications v-if="this.$store.getters.getSettingsTab===1" :user="this.user"></SettingsNotifications>
    <SettingsView v-if="this.$store.getters.getSettingsTab===2" :user="this.user"></SettingsView>
    <SettingsSupport v-if="this.$store.getters.getSettingsTab===3" :user="this.user"></SettingsSupport>
  </div>
</template>

<script>
import colors from '@/assets/colors.json';
import SettingsHome from "@/components/tabs/settings/SettingsHome";
import SettingsNotifications from "@/components/tabs/settings/SettingsNotifications";
import SettingsView from "@/components/tabs/settings/SettingsView";
import SettingsSupport from "@/components/tabs/settings/SettingsSupport";

export default {
  name: "Settings",
  components: {SettingsHome, SettingsNotifications, SettingsView, SettingsSupport},
  data(){
    return {
      colors,
      user: null,
      settingsTab: 0,
    }
  },
  mounted() {
    this.user=JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    setTab(tab) {
      localStorage.setItem("tab", tab);
      this.$store.commit("updateTab", tab);
    },
  }
}
</script>

<style scoped>

</style>