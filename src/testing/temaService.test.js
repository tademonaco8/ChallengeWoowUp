// no se si el unit Testing esta bien hecho, nunca hice, me ayude con ChatGPT

const TemaService = require('../services/temaService');
const Tema = require('../models/tema');

describe('TemaService', () => {
    let temaService;

    beforeEach(() => {
        temaService = new TemaService();
    });

    test('should create a new tema', () => {
        const tema = temaService.crearTema('T001', 'Tema 1');

        expect(tema).toBeInstanceOf(Tema);
        expect(tema.codigo).toBe('T001');
        expect(tema.nombre).toBe('Tema 1');
    });

    test('should obtain a tema by nombre', () => {
        const tema1 = temaService.crearTema('T001', 'Tema 1');
        const tema2 = temaService.crearTema('T002', 'Tema 2');

        const tema = temaService.obtenerTemaPorNombre('Tema 1');

        expect(tema).toBe(tema1);
    });

    test('should obtain all temas', () => {
        const tema1 = temaService.crearTema('T001', 'Tema 1');
        const tema2 = temaService.crearTema('T002', 'Tema 2');

        const temas = temaService.obtenerTodosLosTemas();

        expect(temas).toHaveLength(2);
        expect(temas).toContain(tema1);
        expect(temas).toContain(tema2);
    });
});