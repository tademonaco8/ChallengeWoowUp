const Usuario = require('../models/usuario');

class UsuarioService {
    constructor() {
        this.usuarios = [];
    }

    crearUsuario(nombre) {
        const usuario = new Usuario(nombre);
        this.usuarios.push(usuario);
        return usuario;
    }
}

module.exports = UsuarioService;