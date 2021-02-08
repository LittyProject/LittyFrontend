const state = {
    messages: []
}

const getters = {
    getMessages : (state) => (server, channel) =>{
        return state.messages.filter(a=> a.serverId===server&&a.channelId===channel);
    },
    getMessage(state, {server, channel, author}){
        return state.messages.find(a=> a.serverId===server&&a.channelId===channel&&a.authorId===author);
    },
}


const actions = {
    addMessage(state, message){
        state.commit('MESSAGE_CREATE', message);
    },
}


const mutations = {
    MESSAGE_CREATE(state, msg){
        state.messages.push(msg);
    },
}



export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};