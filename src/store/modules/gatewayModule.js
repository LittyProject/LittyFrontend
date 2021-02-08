import vm from '../../main';

const state = {
    isConnected: false,
    socketMessage: ''
}

const mutations = {
    SOCKET_connect(state){
      state.socketMessage="Łączenie";
      state.isConnected = true;
        vm.$socket.emit('authentication', {token: localStorage.getItem("token"), type: 'BEARER'});
    },
    SOCKET_authenticated(state){
      state.socketMessage=  "Połączono";
    },
    SOCKET_authentication_error(state, data){
        state.socketMessage=data.message;
    },
    SOCKET_disconnect(state) {
        state.isConnected = false;
        state.socketMessage=  "Rozłączono";
    },
    SOCKET_badgeUpdate(state, data){
        if(data.server){
            this.dispatch("memberUpdate", data);
        }else{
            this.dispatch("updateUser", data.badges);
        }
    },
    SOCKET_userUpdate(state, data){
        if(data.server){
            this.dispatch("memberUpdate", data);
            this.dispatch("userFriendUpdate", {member: data.id, data: data.data});
        }else{
            this.dispatch("updateUser", data);
        }
    },
    SOCKET_userPresenceUpdate(state, data){
        this.dispatch("setPresence", data);
    },
    SOCKET_updateCustomStatus(state, data) {
        if(data.server){
            if(data.status&&data.customStatus) {
                this.dispatch("memberStatusUpdate", {server: data.server, id: data.id, status: data.status});
                this.dispatch("memberCustomStatusUpdate", {server: data.server, id: data.id, customStatus: data.customStatus});
                this.dispatch("userFriendUpdate", {member: data.id, data:{status: data.status, customStatus: data.customStatus}});
            }else{
                if(data.status) {
                    this.dispatch("memberStatusUpdate", {server: data.server, id: data.id, status: data.status});
                    this.dispatch("userFriendUpdate", {member: data.id, data:{status: data.status}});
                }
            }

        }else{
            this.dispatch("updateUser", data);
        }
    }
}

const getters = {
    getSocketMessage(state){
        return state.socketMessage;
    },
    isConnected(state) {
        return state.isConnected;
    },
}

const actions = {
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};