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
temas = temaService.obtenerTodosLosTemas();

// Suscribir usuarios a temas
usuario1.suscribirTema(tema1);
usuario2.suscribirTema(tema1);
usuario2.suscribirTema(tema2);

let alertas = [];
// Crear y enviar alertas
//para crear las alertas llamamos al factory, brindandole un mensaje, si es urgente o no (bool), una fecha de expiracion, destinatarios unicos (vacio [] si no hay), y un tema asignado
const alerta1 = AlertaFactory.crearAlerta('1-Mensaje tema 1(U)', true, new Date("2023-11-10"), [], tema1);
const alerta2 = AlertaFactory.crearAlerta('2-Mensaje tema 2(I)', false, new Date("2023-11-12"), [], tema2);
const alerta3 = AlertaFactory.crearAlerta('3-Mensaje usuario 1 expirada(I)', false, new Date("2012-10-24"), [usuario1], " ");
const alerta4 = AlertaFactory.crearAlerta('4-Mensaje usuario 2 expirada(U)', true, new Date("2016-11-01"), [usuario2], " ");
const alerta5 = AlertaFactory.crearAlerta('5-Mensaje usuario 1 y 2(I)', false, new Date("2023-09-08"), [usuario1, usuario2], " ");
const alerta6 = AlertaFactory.crearAlerta('6-Mensaje usuario 1 no expirada(U)', true, new Date("2023-10-24"), [usuario1], " ");

//podemos marcar algunas como visto asi no las trae a la hora de listarlas
// alerta1.marcarVisto();
alertas.push(alerta1, alerta2, alerta3, alerta4, alerta5, alerta6);

//en estos dos campos podemos definir los filtros para las alertas, tema y usuario, acepta valores de tipo Tema y Usuario correspondientemente
//en el caso de no querer filtrar, dejar en "", se pueden combinar
let filtroUsuario = "";
let filtroTema = "";

// Obtener alertas no expiradas para enviarlas
const alertasNoExpiradas = alertaService.obtenerAlertasNoExpiradas(alertas);
alertaService.enviarAlertas(alertasNoExpiradas, temas, filtroUsuario, filtroTema);
// console.log('Alertas no expiradas:', alertasNoExpiradas);