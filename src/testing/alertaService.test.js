// no se si el unit Testing esta bien hecho, nunca hice, me ayude con ChatGPT

const AlertaService = require('../services/alertaService');
const Alerta = require('../models/alerta');
const Tema = require('../models/tema');
const Usuario = require('../models/usuario');

describe('AlertaService', () => {
    let alertaService;

    beforeEach(() => {
        alertaService = new AlertaService();
    });

    test('should obtain non-expired alerts', () => {
        const fechaActual = new Date();
        const alertas = [
            new Alerta('Alerta 1', true, new Date('2023-01-01'), [], 'Tema 1', 'id1'),
            new Alerta('Alerta 2', false, new Date('2023-02-01'), [], 'Tema 2', 'id2'),
            new Alerta('Alerta 3', true, new Date('2023-03-01'), [], 'Tema 3', 'id3'),
        ];

        const noExpiradas = alertaService.obtenerAlertasNoExpiradas(alertas);

        expect(noExpiradas).toHaveLength(3);
        expect(noExpiradas).toEqual(alertas);
    });

    test('should send alerts based on filters', () => {
        const tema1 = new Tema('Tema 1');
        const tema2 = new Tema('Tema 2');
        const usuario1 = new Usuario('Usuario 1');
        const usuario2 = new Usuario('Usuario 2');
        const alerta1 = new Alerta('Alerta 1', true, new Date(), [usuario1], tema1, 'id1');
        const alerta2 = new Alerta('Alerta 2', false, new Date(), [usuario2], tema2, 'id2');
        const alerta3 = new Alerta('Alerta 3', true, new Date(), [usuario1, usuario2], tema1, 'id3');

        usuario1.recibirAlerta = jest.fn();
        usuario2.recibirAlerta = jest.fn();
        tema1.enviarAlerta = jest.fn();
        tema2.enviarAlerta = jest.fn();

        const alertas = [alerta1, alerta2, alerta3];
        const temas = [tema1, tema2];

        alertaService.enviarAlertas(alertas, temas, usuario1, tema1);

        expect(usuario1.recibirAlerta).toHaveBeenCalledWith(alerta1);
        expect(usuario1.recibirAlerta).toHaveBeenCalledWith(alerta3);
        expect(usuario1.recibirAlerta).toHaveBeenCalledTimes(2);
        expect(usuario2.recibirAlerta).not.toHaveBeenCalled();
        expect(tema1.enviarAlerta).toHaveBeenCalledWith(alerta1, usuario1);
        expect(tema1.enviarAlerta).toHaveBeenCalledWith(alerta3, usuario1);
        expect(tema1.enviarAlerta).toHaveBeenCalledTimes(2);
        expect(tema2.enviarAlerta).not.toHaveBeenCalled();
    });

    test('should order alerts based on urgency and ID', () => {
        const usuario = new Usuario('Usuario');
        const tema = new Tema('Tema');
        const alerta1 = new Alerta('Alerta 1', true, new Date(), [usuario], tema, 'id1');
        const alerta2 = new Alerta('Alerta 2', false, new Date(), [usuario], tema, 'id2');
        const alerta3 = new Alerta('Alerta 3', true, new Date(), [usuario], tema, 'id3');
        const alertas = [alerta2, alerta3, alerta1];

        const ordenadas = alertaService.ordenarAlertas(alertas, usuario, tema);

        expect(ordenadas).toEqual([alerta3, alerta1, alerta2]);
    });
});