const TiketControl = require("../models/tiket-contro");

const tiketControl = new TiketControl();

const socketController = (socket) => {

    socket.emit('ultimo-tiket', tiketControl.ultimo);

    socket.emit('estado-actual', tiketControl.ultimosCuatro);

    socket.emit('tikets-pendientes', tiketControl.tikets.length);

    socket.on('nuevo-tiket', (payload, callback) => {

        const nuevo = tiketControl.nuevoTiket();

        callback(nuevo);
        
        socket.broadcast.emit('tikets-pendientes', tiketControl.tikets.length);


    });

    socket.on('atender-tiket', ({ sala }, callback) => {

        if (!sala) {

            return callback({

                ok: false,
                msg: 'La sala es obligatoria'

            })
        };

        const tiket = tiketControl.atenderTikect(sala);

        socket.broadcast.emit('estado-actual', tiketControl.ultimosCuatro);
        socket.emit('tikets-pendientes', tiketControl.tikets.length);
        socket.broadcast.emit('tikets-pendientes', tiketControl.tikets.length);

        if (!tiket) {

            callback({
                ok: false,
                msg: 'Ya no hay tikets pendientes'
            });

        } else {

            callback({
                ok: true,
                tiket: tiket.numero,
            });
        };

    });

}





module.exports = {
    socketController
}

