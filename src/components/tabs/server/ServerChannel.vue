<template>
  <div>
    <Topbar icon="mdi-message" :name="channel.name"/>
    <div
      style="position: absolute; bottom: 0; width: 98%; margin-left: 13px;"
    >
      <v-text-field
          v-model="message"
          :append-icon="channel.icon"
          append-outer-icon="mdi-send"
          prepend-inner-icon="mdi-plus-circle"
          filled
          dark
          clear-icon="mdi-backspace"
          clearable
          label="Message"
          type="text"
          @click:append="changeIcon"
          @click:append-outer="sendMessage"
          @click:clear="clearMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/layout/Topbar";
export default {
  name: "ServerChannel",
  components: {Topbar},
  data: () => ({
    password: 'Password',
    show: false,
    message: 'Hey!',
    iconIndex: 0,
    icons: [
      'mdi-emoticon',
      'mdi-emoticon-cool',
      'mdi-emoticon-dead',
      'mdi-emoticon-excited',
      'mdi-emoticon-happy',
      'mdi-emoticon-neutral',
      'mdi-emoticon-sad',
      'mdi-emoticon-tongue',
    ],
  }),
  computed:{
    server: {
      get() {
        return this.$store.getters.getCurrentServer;
      },
    },
    channel: {
      get() {
        return this.$store.getters.getCurrentChannel;
      },
      set(id) {
        this.$store.dispatch("setCurrentChannelId", id);
      }
    }
  },
  methods:{
    sendMessage () {
      this.resetIcon()
      this.clearMessage()
    },
    clearMessage () {
      this.message = ''
    },
    resetIcon () {
      this.iconIndex = 0
    },
    changeIcon () {
      this.iconIndex === this.icons.length - 1
          ? this.iconIndex = 0
          : this.iconIndex++
    },
  },

}
</script>

<style scoped>

</style>