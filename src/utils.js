module.exports.parseStatusToColor = (status) =>{
    switch (status){
        case 0:
        case 1:
            return 'grey';
        case 2:
            return 'green';
        case 3:
            return 'warning';
        case 4:
            return 'red';
        default:
            return 'purple';
    }
}