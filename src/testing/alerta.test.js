// no se si el unit Testing esta bien hecho, nunca hice, me ayude con ChatGPT

const Alerta = require('../models/alerta');

describe('Alerta', () => {
    test('should create an instance of Alerta', () => {
        const alerta = new Alerta(
            'Test mensaje',
            true,
            new Date(), [],
            'Test tema',
            'Test id'
        );

        expect(alerta).toBeInstanceOf(Alerta);
        expect(alerta.mensaje).toBe('Test mensaje');
        expect(alerta.urgente).toBe(true);
        expect(alerta.fechaExpiracion).toBeInstanceOf(Date);
        expect(alerta.destinatarios).toEqual([]);
        expect(alerta.tema).toBe('Test tema');
        expect(alerta.id).toBe('Test id');
        expect(alerta.visto).toBe(false);
    });

    test('should mark the Alerta as viewed', () => {
        const alerta = new Alerta(
            'Test mensaje',
            true,
            new Date(), [],
            'Test tema',
            'Test id'
        );

        alerta.marcarVisto();

        expect(alerta.visto).toBe(true);
    });
});