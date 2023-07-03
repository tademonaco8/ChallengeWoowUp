// no se si el unit Testing esta bien hecho, nunca hice, me ayude con ChatGPT
const Tema = require('../models/tema');
const Usuario = require('../models/usuario');

describe('Tema', () => {
    test('should create an instance of Tema', () => {
        const tema = new Tema('Test tema');

        expect(tema).toBeInstanceOf(Tema);
        expect(tema.nombre).toBe('Test tema');
        expect(tema.suscriptores).toEqual([]);
        expect(tema.alertas).toEqual([]);
    });

    test('should add a suscriptor to the Tema', () => {
        const tema = new Tema('Test tema');
        const usuario = new Usuario('Test usuario');

        tema.agregarSuscriptor(usuario);

        expect(tema.suscriptores).toContain(usuario);
    });

    test('should send an Alerta to the suscriptor based on the filter', () => {
        const tema = new Tema('Test tema');
        const usuario1 = new Usuario('Usuario 1');
        const usuario2 = new Usuario('Usuario 2');
        const alerta = {
            mensaje: 'Test mensaje',
        };

        tema.agregarSuscriptor(usuario1);
        tema.agregarSuscriptor(usuario2);

        tema.enviarAlerta(alerta, usuario1);

        expect(usuario1.recibirAlerta).toHaveBeenCalledWith(alerta);
        expect(usuario2.recibirAlerta).not.toHaveBeenCalled();
    });
});