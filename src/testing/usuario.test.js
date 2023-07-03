// no se si el unit Testing esta bien hecho, nunca hice, me ayude con ChatGPT
const Usuario = require('../models/usuario');

describe('Usuario', () => {
    test('should create an instance of Usuario', () => {
        const usuario = new Usuario('Test usuario');

        expect(usuario).toBeInstanceOf(Usuario);
        expect(usuario.nombre).toBe('Test usuario');
        expect(usuario.temasSuscritos).toEqual([]);
    });

    test('should subscribe to a Tema', () => {
        const usuario = new Usuario('Test usuario');
        const tema = {
            agregarSuscriptor: jest.fn(),
        };

        usuario.suscribirTema(tema);

        expect(usuario.temasSuscritos).toContain(tema);
        expect(tema.agregarSuscriptor).toHaveBeenCalledWith(usuario);
    });

    test('should receive an Alerta', () => {
        const usuario = new Usuario('Test usuario');
        const alerta = {
            mensaje: 'Test mensaje',
        };

        console.log = jest.fn();

        usuario.recibirAlerta(alerta);

        expect(console.log).toHaveBeenCalledWith(
            '[Test usuario] Recibió la alerta: Test mensaje'
        );
    });
});