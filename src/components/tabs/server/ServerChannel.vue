<template>
  <div>
    <Topbar icon="mdi-message" :name="channel.name"/>
    <div
      style="position: absolute; bottom: 0; width: 98%; margin-left: 13px;"
    >
      <v-list
          dark
      >
        <v-list-item
            v-for="a in getMessages(server.id, channel.id)"
            :key="a.id"
        >
          <v-list-item-icon>
            <v-avatar>
              <img :src="getMember(a.authorId).avatarURL">
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title>{{getMember(a.authorId).username}}#{{getMember(a.authorId).tag}}</v-list-item-title>
              <v-list-item-subtitle>{{a.content}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
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
import {mapGetters} from "vuex";
export default {
  name: "ServerChannel",
  components: {Topbar},
  data: () => ({
    message: '',
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
  methods:{
    async sendMessage () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` },
        body: JSON.stringify({content: this.message, type: "NORMAL"})
      };
      await fetch(`http://localhost:1920/servers/${this.server.id}/channels/${this.channel.id}/messages`, requestOptions).then(()=>{
        console.log("ok sended");
      }).catch((a)=>{
        console.log(a);
        console.log("not sended");
      });
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
    },
    ...mapGetters(["getMessages", "getMember"])
  },

}
</script>

<style scoped>

</style>