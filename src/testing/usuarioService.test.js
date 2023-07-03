// no se si el unit Testing esta bien hecho, nunca hice, me ayude con ChatGPT

const UsuarioService = require('../services/usuarioService');
const Usuario = require('../models/usuario');

describe('UsuarioService', () => {
    let usuarioService;

    beforeEach(() => {
        usuarioService = new UsuarioService();
    });

    test('should create a new usuario', () => {
        const usuario = usuarioService.crearUsuario('Test Usuario');

        expect(usuario).toBeInstanceOf(Usuario);
        expect(usuario.nombre).toBe('Test Usuario');
    });
});