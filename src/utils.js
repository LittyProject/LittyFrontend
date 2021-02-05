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

module.exports.parseStatusToIcon = (status) =>{
    switch (status){
        case 5:
            return "mdi-iframe-braces";
        case 6:
            return "mdi-book-open-variant";
        case 7:
            return "mdi-brain";
        case 8:
            return "mdi-cart";
        case 9:
            return "mdi-lock-open";
        case 10:
            return "mdi-microphone";
        case 11:
            return "mdi-google-controller";
        case 12:
            return "mdi-movie-open-play";
        case 13:
            return "mdi-play-circle";
        case 14:
            return "mdi-sword-cross";
        case 15:
            return "mdi-weight-lifter"
        default:
            return "";
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