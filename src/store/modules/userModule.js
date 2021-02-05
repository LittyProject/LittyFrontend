

const state ={
    token: localStorage.getItem("token") || null,
    user: null
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
};

const actions = {
    setToken(state, token){
        state.commit("TOKEN", token);
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
        const update = Object.assign({}, state.state.user, user);
        state.commit("UPDATE_USER", update);
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
        state.user=user;
    }
}

export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};