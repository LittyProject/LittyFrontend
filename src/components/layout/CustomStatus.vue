<template>
  <v-row justify="center">
    <v-dialog
        v-model="customStatus"
        max-width="600px"
        dark
    >
      <template v-slot:activator="{ on, attrs }">
        <div
            dark
            v-bind="attrs"
            v-on="on"
        >
          Własny status
        </div>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Ustaw własny status</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-select
                :items="[{text: 'Programuje', value: '4'}, {text: 'Czyta', value: '5'}]"
                label="Typ"
                v-model="stateType"
                required
            >
            </v-select>
            <v-text-field
                label="Treść"
                required
                v-model="state"
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="save"
          >
            Save
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
      customStatus: false,
      state: "",
      stateType: {},
    }
  },
  methods:{
    save(){
      this.customStatus = false;
      this.$socket.emit('updateCustomStatus', {status: parseInt(this.stateType), customStatus: this.state});
    }
  }
}
</script>
