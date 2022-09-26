const salaTikets = document.querySelector('#salaTikets');
const btnAtenderTiket = document.querySelector('#btnAtenderTiket');
const atendiendoTiket = document.querySelector('#atendiendoTiket');
const cajaTikets = document.querySelector('#cajaTikets');
// const cajaTiketspen = document.querySelector('#cajaTiketspen');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('Sala') || searchParams.get('Sala') === "0" ) {

    window.location = '/';

    throw new Error('La sala es obligatoria');

}

const sala = searchParams.get('Sala');

salaTikets.innerHTML = `Sala: ${sala}`;

cajaTikets.style.display = 'none';

const socket = io();



socket.on('connect', () => {

    btnAtenderTiket.disabled = false;

});

socket.on('disconnect', () => {

    btnAtenderTiket.disabled = true;

});


socket.on('tikets-pendientes', ( pendientes ) => {

    if ( pendientes === 0 ) {

        lblPendientes.style.display = 'none';
        btnAtenderTiket.disabled = true;
        atendiendoTiket.innerHTML = `No hay mas tikets`;

    } else {

        lblPendientes.style.display = '';
        lblPendientes.innerHTML = pendientes;

    }

    

})


btnAtenderTiket.addEventListener( 'click', () => {

    socket.emit( 'atender-tiket', { sala }, ( { ok, tiket, msg } ) => {

        if ( !ok ) {

            cajaTikets.style.display = '';

        }

        if ( !tiket ) {

            atendiendoTiket.innerHTML = `No hay mas tikets`;
            btnAtenderTiket.disabled = true;

        } else {
    
            atendiendoTiket.innerHTML = `Tiket: ${ tiket }`;
            
        }

        

    });


});