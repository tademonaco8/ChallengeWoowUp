const Tema = require('../models/tema');

class TemaService {
    constructor() {
        this.temas = [];
    }

    crearTema(codigo, nombre) {
        const tema = new Tema(codigo, nombre);
        this.temas.push(tema);
        return tema;
    }

    obtenerTemaPorNombre(nombre) {
        return this.temas.find((tema) => tema.nombre === nombre);
    }

    obtenerTodosLosTemas() {
        return this.temas;
    }
}

module.exports = TemaService;