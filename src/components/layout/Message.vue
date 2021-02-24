<template>
  <v-list-item dark>
    <v-list-item-avatar>
      <v-avatar
          size="56"
          class="white--text"
      >
        <img :src="getMember(item.authorId).avatarURL">
      </v-avatar>
    </v-list-item-avatar>

    <v-list-item-content dark two-line>
      <v-list-item-title>{{ getMember(item.authorId).username }}#{{getMember(item.authorId).tag}} <span class="text--darken-1">{{item.createdAt}}</span></v-list-item-title>
      <v-list-item-subtitle class="text-wrap" v-if="item.type==='NORMAL'">
        {{item.content}}
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="item.type==='EMBED'">
        <v-card
            elevation="2"
            dark
            max-width="auto"
            width="auto"
        >
          <v-card-text class="pa-1" style="border-left: blue 3px solid;">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>{{item.embed.title}}</v-list-item-title>
                      <v-list-item-subtitle>{{item.embed.description}}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar
                        v-if="item.embed.thumbnail"
                        tile
                        size="80"
                        color="grey"
                    ><img :src="item.embed.thumbnail"></v-list-item-avatar>
                  </v-list-item>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-img v-if="item.embed.image"><img :src="item.embed.image"></v-img>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-list-item-subtitle>
      <v-list-item-subtitle v-if="item.type==='POLL'">
        <v-card
            elevation="2"
            dark
            max-width="auto"
            width="auto"
        >
          <v-card-text class="pa-1" style="border-left: blue 3px solid;">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">
                  {{item.poll.title}}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <div
                      v-for="option in item.poll.options"
                      :key="option.emoji"
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-avatar>
                          {{option.emoji}}
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{option.name}}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            {{option.vote.length}} głosów
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                  <v-list-item-subtitle>
                    Czas: {{item.poll.time}}
                  </v-list-item-subtitle>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn
          small
          color="transparent"
      >
        <v-icon
            right
            color="white"
        >
          mdi-dots-horizontal
        </v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Message",
  props: [
      "item"
  ],
  computed:{
    ...mapGetters(["getMember"])
  }
}
</script>

<style scoped>

</style>