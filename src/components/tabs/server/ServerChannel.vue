<template>
  <div>
    <Topbar icon="mdi-message" :name="channel.name"/>
    <div style="height: 670px; overflow-y: auto">
      <div><v-btn color="warning" outlined @click="getMoreMessages">Załaduj więcej wiadomości</v-btn> </div>
      <div
          v-for="item in this.messages"
          :key="item.id"
      >
        <Message :item="item"></Message>
      </div>
    </div>
    <v-text-field
        style="position: relative; z-index: 1000"
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
        @click:prepend-inner="getMoreMessages"
        @click:append="changeIcon"
        @click:append-outer="sendMessage"
        @click:clear="loadFirst"
    ></v-text-field>
  </div>
</template>

<script>
import Topbar from "@/components/layout/Topbar";
import Message from "@/components/layout/Message";
import {mapGetters, mapActions} from "vuex";
export default {
  name: "ServerChannel",
  components: {Topbar, Message},
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
      });
      this.message = '';
    },
    async getMoreMessages() {
      let d = this.messages[0].timestamp;
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` },
      };
      const response = await fetch(`http://localhost:1920/servers/${this.server.id}/channels/${this.channel.id}/messages?before=${d}&limit=10`, requestOptions).catch((a)=>{
        console.log(a);
      });
      const data = await response.json();
      this.$store.dispatch("addPrependMessages",data);

    },
    async loadFirst(){
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` },
      };
      const response = await fetch(`http://localhost:1920/servers/${this.server.id}/channels/${this.channel.id}/messages?after=1&limit=10`, requestOptions).catch((a)=>{
        console.log(a);
      });
      const data = await response.json();
      this.$store.dispatch("setMessagesChannel",data);
    },
    clearMessage () {
      this.message = '';
    },
    resetIcon () {
      this.iconIndex = 0
    },
    changeIcon () {
      this.iconIndex === this.icons.length - 1
          ? this.iconIndex = 0
          : this.iconIndex++
    },
    ...mapActions(['addPrependMessages'])
  },
  async mounted(){
    await this.loadFirst();
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
    messages(){
      return this.$store.getters.getMessages[this.channel.id];
    },
    ...mapGetters(["getMember"])
  }

}
</script>

<style scoped>

</style>