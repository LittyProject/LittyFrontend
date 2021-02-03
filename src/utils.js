module.exports.parseStatusToColor = (status) =>{
    switch (status){
        case 0:
            return 'grey';
        case 1:
            return 'green';
        case 2:
            return 'warning';
        case 3:
            return 'red';
        default:
            return 'purple';
    }
}