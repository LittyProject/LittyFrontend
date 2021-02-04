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

module.exports.parseStatus = (user) =>{
    switch (user.status){
        case 0:
        case 1:
            return "Niedostępny/a";
        case 2:
            return "Dostępny/a";
        case 3:
            return "Zaraz Wracam"
        case 4:
            return "Nie przeszkadzać";
        case 5:
            return `<b>Programuje w</b> ${user.customStatus}`;
        case 6:
            return `<b>Czyta</b> ${user.customStatus}`;
        case 7:
            return `<b>Uczy się</b> ${user.customStatus}`;
        case 8:
            return `<b>Robi zakupy w</b> ${user.customStatus}`;
        case 9:
            return `<b>Hackuje</b> ${user.customStatus}`;
        case 10:
            return `<b>Śpiewa</b> ${user.customStatus}`;
        case 11:
            return `<b>Gra w</b> ${user.customStatus}`;
        case 12:
            return `<b>Ogląda</b> ${user.customStatus}`;
        case 13:
            return `<b>Słucha</b> ${user.customStatus}`;
        case 14:
            return `<b>Rywalizuje</b> ${user.customStatus}`;
        case 15:
            return `<b>Ćwiczy</b> ${user.customStatus}`;
        default:
            return `<b>Coś robi w</b> ${user.customStatus}`;
    }
}