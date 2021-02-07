import Vue from "vue";

const state = {
    friends: []
}

const getters = {
    getFriends(state){
        return state.friends;
    },
    getFriend(state, id){
        return state.friends.find(a=> a.id===id);
    },
    isFriend(state, id){
        return state.friends.find(a=> a.id===id);
    }
}


const actions = {
    addFriend(state, friend){
        state.commit('USER_ADD_FRIEND', friend);
    },
    removeFriend(state, id){
        state.commit('USER_REMOVE_FRIEND', id);
    },
    userFriends(state, friends){
        state.commit('USER_FRIENDS', friends);
    },
    userFriendUpdate(state, data){
        state.commit('USER_FRIEND_UPDATE', data);
    }
}


const mutations = {
    USER_ADD_FRIEND(state, friend){
        state.friends.push(friend);
    },
    USER_REMOVE_FRIEND(state, id){
        Vue.delete(state.friends, state.friends.find(a=> a.id===id));
    },
    USER_FRIEND_UPDATE(state, data){
        state.friends.forEach(a=>{
           if(a.id===data.member){
               for(let b in data.data){
                   a[b]=data.data[b];
               }
           }
        });
    },
    USER_FRIENDS(state, friends){
        state.friends=friends;
    }
}



export default {
    namespace: true,
    state,
    getters,
    actions,
    mutations
};