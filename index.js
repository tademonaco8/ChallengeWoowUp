const UsuarioService = require('./src/services/usuarioService');
const TemaService = require('./src/services/temaService');
const AlertaService = require('./src/services/alertaService');
const AlertaFactory = require('./src/utils/alertaFactory');

// Crear instancias de los servicios
const usuarioService = new UsuarioService();
const temaService = new TemaService();
const alertaService = new AlertaService(temaService);

// Crear usuarios
const usuario1 = usuarioService.crearUsuario('Tadeo Monaco');
const usuario2 = usuarioService.crearUsuario('WoowUp');

// Crear temas
let temas = [];
const tema1 = temaService.crearTema('Deportes');
const tema2 = temaService.crearTema('Tech');
temas.push(tema1, tema2);

// Suscribir usuarios a temas
usuario1.suscribirTema(tema1);
usuario2.suscribirTema(tema1);
usuario2.suscribirTema(tema2);

let alertas = [];
// Crear y enviar alertas
//mensaje, urgente, dateTo, to, tema, id
const alerta1 = AlertaFactory.crearAlerta('1-Mensaje tema 1(U)', true, new Date("2023-11-10"), [], tema1);
const alerta2 = AlertaFactory.crearAlerta('2-Mensaje tema 2(I)', false, new Date("2023-11-12"), [], tema2);
const alerta3 = AlertaFactory.crearAlerta('3-Mensaje usuario 1 expirada(I)', false, new Date("2012-10-24"), [usuario1], "");
const alerta4 = AlertaFactory.crearAlerta('4-Mensaje usuario 2 expirada(U)', true, new Date("2016-11-01"), [usuario2], "");
const alerta5 = AlertaFactory.crearAlerta('5-Mensaje usuario 1 y 2(I)', false, new Date("2023-03-08"), [usuario1, usuario2], "");
alerta1.marcarVisto();
alertas.push(alerta1, alerta2, alerta3, alerta4, alerta5);
alertaService.enviarAlertas(alertas, temas);

// Obtener alertas no expiradas
const alertasNoExpiradas = alertaService.obtenerAlertasNoExpiradas();
console.log('Alertas no expiradas:', alertasNoExpiradas);