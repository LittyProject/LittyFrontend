<template>
  <v-row justify="center">
    <v-dialog
        v-model="createServer"
        max-width="600px"
        dark
    >
      <template v-slot:activator="{ on, attrs }">
        <div
            dark
            v-bind="attrs"
            v-on="on"
        >
          Tworzenie serwera
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Utwórz własny serwer</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                label="Podaj nazwe serwera"
                required
                v-model="server"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="cancel"
          >
            Anuluj
          </v-btn>
          <v-btn
              color="success darken-1"
              text
              @click="save"
          >
            Zapisz
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  data(){
    return {
      createServer: false,
      server: null,
    }
  },
  methods:{
    async save(){
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `BEARER ${localStorage.getItem("token")}` },
        body: JSON.stringify({name: this.server})
      };
      await fetch(`http://localhost:1920/servers`, requestOptions).then(()=>{
        console.log("ok sended");
      }).catch((a)=>{
        console.log(a);
        console.log("not sended");
      });
      this.createServer=false
    },
    cancel(){
      this.server=null;
      this.createServer=false
    }
  }
}
</script>
