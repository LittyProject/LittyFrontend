

const state ={
    token: localStorage.getItem("token") || null,
    user: null,
    presence: null
}

const getters = {
    isExist(state) {
        return state.token !== null;
    },
    isLogin(state) {
        return state.user !== null;
    },
    getUser(state) {
        return state.user;
    },
    getPresence(state){
        return state.presence;
    }
};

const actions = {
    setToken(state, token){
        state.commit("TOKEN", token);
    },
    setPresence(state, data){
        state.commit("UPDATE_USER_PRESENCE", data);
    },
    setUser(state, user){
        state.commit("USER", user);
    },
    changeStatus(state, status) {
        state.commit("STATUS_UPDATE", status);
    },
    changeCustomStatus(state, customStatus) {
        state.commit("CUSTOM_STATUS_UPDATE", customStatus);
    },
    updateUser(state, user) {
        state.commit("UPDATE_USER", user);
    }
}

const mutations = {
    TOKEN(state, token){
        state.token=token;
    },
    USER(state, user){
        state.user=user;
    },
    STATUS_UPDATE(state, status){
        state.user.status=status;
    },
    CUSTOM_STATUS_UPDATE(state, customStatus){
        state.user.customStatus=customStatus;
    },
    UPDATE_USER(state, user){
        state.user=Object.assign({}, state.user, user);
    },
    UPDATE_USER_PRESENCE(state, data){
        state.presence=data;
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};