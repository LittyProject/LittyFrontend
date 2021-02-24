import Vue from "vue";
const state = {
    messages: {},
}

const getters = {
    getMessages(state){
        return state.messages;
    },
}


const actions = {
    addMessage(state, message){
        state.commit('MESSAGE_CREATE', message);
    },
    addPrependMessages(state, message){
        state.commit('MESSAGES_PREPEND_CREATE', message);
    },
    setMessagesChannel(state, messages){
        state.commit("MESSAGES_FIRST", messages);
    }
}


const mutations = {
    MESSAGES_FIRST(state, msg){
        Vue.set(state.messages, msg[0].channelId, msg);
    },
    MESSAGE_CREATE(state, msg){
        Vue.set(
            state.messages[msg.channelId],
            state.messages[msg.channelId].length,
            msg
        );
    },
    MESSAGES_PREPEND_CREATE(state, msg){
        const messages = state.messages[msg[0].channelId];
        const join = [...msg, ...messages];
        Vue.set(state.messages, msg[0].channelId, join);
    }
}



export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};