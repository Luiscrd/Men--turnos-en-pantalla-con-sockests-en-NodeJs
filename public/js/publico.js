// Referencias del HTML
const lblTicket1 = document.getElementById('lblTicket1');
const lblSala1 = document.getElementById('lblSala1');
const lblTicket2 = document.getElementById('lblTicket2');
const lblSala2 = document.getElementById('lblSala2');
const lblTicket3 = document.getElementById('lblTicket3');
const lblSala3 = document.getElementById('lblSala3');
const lblTicket4 = document.getElementById('lblTicket4');
const lblSala4 = document.getElementById('lblSala4');
var audio = document.getElementById("audio");



const socket = io();

socket.on('estado-actual', (payoad) => {

    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [tiket1, tiket2, tiket3, tiket4] = payoad;

    if (tiket1) {

        lblTicket1.innerHTML = `Tiket: ${tiket1.numero}`;
        lblSala1.innerHTML = `Triaje: ${tiket1.sala}`;

    } else {

        lblTicket1.innerHTML = `No hay tiket`;
        lblSala1.innerHTML = `Sala sin asignar`;

    }

    if (tiket2) {

        lblTicket2.innerHTML = `Tiket: ${tiket2.numero}`;
        lblSala2.innerHTML = `Triaje: ${tiket2.sala}`;

    } else {

        lblTicket2.innerHTML = `No hay tiket`;
        lblSala2.innerHTML = `Sala sin asignar`;

    }

    if (tiket3) {

        lblTicket3.innerHTML = `Tiket: ${tiket3.numero}`;
        lblSala3.innerHTML = `Triaje: ${tiket3.sala}`;

    } else {

        lblTicket3.innerHTML = `No hay tiket`;
        lblSala3.innerHTML = `Sala sin asignar`;

    }

    if (tiket4) {

        lblTicket4.innerHTML = `Tiket: ${tiket4.numero}`;
        lblSala4.innerHTML = `Triaje: ${tiket4.sala}`;

    } else {

        lblTicket4.innerHTML = `No hay tiket`;
        lblSala4.innerHTML = `Sala sin asignar`;

    }



})
