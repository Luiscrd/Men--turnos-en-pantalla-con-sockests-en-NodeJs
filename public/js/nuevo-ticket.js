// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnNuevoTicket = document.querySelector('#btnNuevoTicket');
// const exampleFormControlInput1 = document.querySelector('#exampleFormControlInput1');
// const exampleFormControlTextarea1 = document.querySelector('#exampleFormControlTextarea1');

const socket = io();

socket.on('connect', () => {

    btnNuevoTicket.disabled = false;

});

socket.on('disconnect', () => {

    btnNuevoTicket.disabled = true;

});


socket.on('ultimo-tiket', (ultimo) => {

    lblNuevoTicket.innerHTML = `Ultimo Tiket: ${ultimo}`;

})


btnNuevoTicket.addEventListener( 'click', () => {

    // const nombre = exampleFormControlInput1.value;

    // const motivo = exampleFormControlTextarea1.value;

    // console.log(nombre, motivo);


    socket.emit( 'nuevo-tiket', null, ( tiket ) => {

        lblNuevoTicket.innerHTML = `Generando ${tiket}`;

    });


});