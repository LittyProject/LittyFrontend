module.exports = {
    updateCustomStatus: function (data){
        if(data.server){
            if(data.status) {
                this.$store.dispatch("memberStatusUpdate", {server: data.server, id: data.id, status: data.status});
            }
            if(data.customStatus) {
                this.$store.dispatch("memberCustomStatusUpdate", {server: data.server, id: data.id, customStatus: data.customStatus});
            }
        }else{
            this.$store.dispatch("updateUser", data);
        }
    }
}