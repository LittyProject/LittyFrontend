import vm from '../../main';

const state = {
    isConnected: false,
    socketMessage: '',
    socket:{
        auth: false,
        server: false,
        user: false,
        banned: false
    }
}

const mutations = {
    STATE_SOCKET(state, data){
        state.socket[data.type]=data.bol;
    },
    SOCKET_connect(state){
      state.socketMessage="Łączenie";
      state.isConnected = true;
        vm.$socket.emit('authentication', {token: localStorage.getItem("token"), type: 'BEARER'});
    },
    SOCKET_authenticated(state){
      state.socketMessage=  "Połączono";
      vm.$store.commit("STATE_SOCKET", {type: "auth", bol: true});
    },
    SOCKET_authentication_error(state, data){
        state.socketMessage=data.message;
        if(data.message==="User is banned"){
            vm.$store.commit("STATE_SOCKET", {type: "banned", bol: true});
        }
        state.socket.auth=false;
    },
    SOCKET_disconnect(state) {
        state.isConnected = false;
        state.socketMessage=  "Rozłączono";
        state.socket.auth=false;
        state.socket.server=false;
        state.socket.user=false;
    },
    SOCKET_badgeUpdate(state, data){
        if(data.server){
            this.dispatch("memberUpdate", data);
        }else{
            this.dispatch("updateUser", data.badges);
        }
    },
    SOCKET_messageCreate(state, data){
        this.dispatch("addMessage", data);
    },
    SOCKET_userUpdate(state, data){
        if(data.server){
            this.dispatch("memberUpdate", data);
            this.dispatch("userFriendUpdate", {member: data.id, data: data.data});
        }else{
            this.dispatch("updateUser", data);
        }
    },
    async SOCKET_createServer(state, data){
        this.dispatch("setServer", data);
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
    getSocketState(state){
        return state.socket;
    }
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