import Vue from "vue";

const state ={
    currentServerId: null,
    currentChannelId: null,
    servers: {},
}

const getters ={
    getServers(state){
        return state.servers;
    },
    getServersArray(state){
        let a = [];
        for (let key in state.servers) {
            a.push(state.servers[key]);
        }
        return a;
    },
    getCurrentServerID(state){
        return state.currentServerId
    },
    getCurrentChannelID(state){
        return state.currentChannelId
    },
    getCurrentChannel(state){
        return state.servers[state.currentServerId].channels.find(d=> d.id===state.currentChannelId);
    },
    getCurrentServer(state){
        return state.servers[state.currentServerId];
    },
    getServer(state, id){
        return state.servers[id];
    }
}

const actions = {
    setServers(state, servers){
        state.commit('SET_SERVERS', servers);
    },
    setServer(state, server){
        state.commit('SET_SERVER', server);
    },
    removeServer(state, serverId){
        state.commit('REMOVE_SERVER', serverId);
    },
    removeServerMember(state, {serverId, memberId}){
        state.commit('LEAVE_SERVER_MEMBER', {server: serverId, member: memberId});
    },
    addServerMember(state, {serverId, member}){
        state.commit('JOIN_SERVER_MEMBER', {server: serverId, member: member});
    },
    setCurrentServerId(state, serverId){
        state.commit('SET_CURRENT_SERVER_ID', serverId);
    },
    setCurrentChannelId(state, channelId){
        state.commit('SET_CURRENT_CHANNEL_ID', channelId);
    },
    memberStatusUpdate(state, {server, id, status}){
        state.commit('UPDATE_MEMBER_STATUS', {server: server, member: id, status: status});
    },
    memberCustomStatusUpdate(state, {server, id, customStatus}){
        state.commit('UPDATE_MEMBER_CUSTOM_STATUS', {server: server, member: id, customStatus: customStatus});
    },
    memberUpdate(state, data){
        state.commit('UPDATE_MEMBER', {server: data.server, member: data.id, data: data.data});
    }
}

const mutations = {
    SET_SERVERS(state, servers) {
        state.servers=servers;
    },
    SET_SERVER(state, server) {
        Vue.set(state.servers, server.id, server);
    },
    REMOVE_SERVER(state, serverId){
        Vue.delete(state.servers, serverId)
    },
    LEAVE_SERVER_MEMBER(state, data){
        Vue.delete(state.servers[data.server].members, state.servers[data.server].members.find(b=> b.id===data.member));
    },
    JOIN_SERVER_MEMBER(state, data){
        Vue.apply(data.member, state.servers[data.server].members);
    },
    SET_CURRENT_SERVER_ID(state, id) {
        state.currentServerId = id;
    },
    SET_CURRENT_CHANNEL_ID(state, id) {
        state.currentChannelId = id;
    },
    UPDATE_MEMBER_STATUS(state, data){
        state.servers[data.server].members.map(b => {
            if (b.id === data.member) {
                b.status = data.status;
            }
        });
    },
    UPDATE_MEMBER_CUSTOM_STATUS(state, data){
        state.servers[data.server].members.map(b => {
            if (b.id === data.member) {
                b.customStatus = data.customStatus;
            }
        });
    },
    UPDATE_MEMBER(state, data){
        state.servers[data.server].members.map(b => {
            if (b.id === data.member) {
                for(let a in data.data){
                    b[a]=data.data[a];
                }
            }
        });
    },
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};