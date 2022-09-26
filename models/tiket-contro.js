const shortid = require('shortid');
const path = require('path');
const fs = require('fs');


class Ticket {

    constructor( sala ) {

        this.numero = shortid.generate().replace('_', '').replace('-', '').substring(0,3).toUpperCase();
        this.sala = sala;

    }

}

class TiketControl {

    constructor() {

        this.ultimo = '';
        this.hoy = new Date().getDate();
        this.tikets = [];
        this.ultimosCuatro = [];

        this.init();

    }

    get toJson() {

        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tikets: this.tikets,
            ultimosCuatro: this.ultimosCuatro
        }

    }

    init() {

        const { ultimo, hoy, tikets, ultimosCuatro } = require('../db/data.json');

        if ( hoy === this.hoy ){
           
            this.ultimo = ultimo;
            this.tikets = tikets,
            this.ultimosCuatro = ultimosCuatro;

        } else {

            this.guardarDB();

        }
        
    
    }

    guardarDB() {

        const dbPath = path.join( __dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify(this.toJson) );
    }

    nuevoTiket() {

        const tiket = new Ticket( null );

        this.tikets.push( tiket );

        this.ultimo = tiket.numero

        this.guardarDB();

        return `Tiket: ${tiket.numero}`

    }

    atenderTikect( sala ) {

        if ( this.tikets.length === 0) {

            return null;

        }

        const tiket = this.tikets.shift();

        tiket.sala = sala;

        this.ultimosCuatro.unshift( tiket );

        if ( this.ultimosCuatro.length > 4) {

            this.ultimosCuatro.slice(-1,1);

        }

        this.guardarDB();

        return tiket;

    }

};

module.exports = TiketControl;

