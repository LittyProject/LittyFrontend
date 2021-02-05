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
                :items="[{text: 'Programuje', value: '5'}, {text: 'Czyta', value: '6'}, {text: 'Uczy się', value: '7'}, {text: 'Robi zakupy', value: '8'}, {text: 'Hackuje', value: '9'}, {text: 'Śpiewa', value: '10'}, {text: 'Gra', value: '11'}, {text: 'Ogląda', value: '12'}, {text: 'Słucha', value: '13'}, {text: 'Rywalizuje', value: '14'}, {text: 'Ćwiczy', value: '15'}]"
                label="Typ"
                v-model="stateType"
                :prepend-icon="icon"
                @change="switchIcon($event)"
                required
            >
            </v-select>
            <v-text-field
                label="Treść"
                required
                v-model="state"
                :rules="rules.state"
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
const utils = require('@/utils')

export default {
  data(){
    return {
      customStatus: false,
      state: null,
      stateType: 5,
      icon: "mdi-home",
      utils,
      rules: {
        state:[
          value => !!value || 'Required.',
          value => (value || '').length <= 50 || 'Max 50 characters',
        ]
      },
    }
  },
  methods:{
    save(){
      this.$socket.emit('updateCustomStatus', {status: parseInt(this.stateType), customStatus: this.state});
      this.customStatus = false;
      this.stateType=0;
      this.state=null;
    },
    switchIcon(e){
      this.icon=utils.parseStatusToIcon(parseInt(e));
    },
    cancel(){
      this.customStatus=false;
      this.stateType=0;
      this.state=null;
    }
  }
}
</script>
