const Alerta = require('../models/alerta');
const Tema = require('../models/tema');
const Usuario = require('../models/usuario');
class AlertaService {
    constructor(servicio) {
        this.alertas = [];
        this.servicio = servicio;
    }

    obtenerAlertasNoExpiradas(alertas) {
        let noExpiradas = [];
        let fechaActual = new Date();
        alertas.forEach(alerta => {
            if (alerta.fechaExpiracion >= fechaActual) {
                noExpiradas.push(alerta);
            }
        });
        return noExpiradas;
    }

    enviarAlertas(alertas, temas, filtroUsuario, filtroTema) {
        alertas = this.ordenarAlertas(alertas, filtroUsuario, filtroTema);
        alertas.forEach(alerta => {
            if (alerta.visto == false) {
                if (alerta.destinatarios != []) {
                    alerta.destinatarios.forEach(destinatario => {
                        if ((destinatario == filtroUsuario && filtroTema === "") || (filtroUsuario == "" && filtroTema == "")) {
                            destinatario.recibirAlerta(alerta);
                        }
                    });
                }
                temas.forEach(tema => {
                    if (alerta.tema == tema) {
                        if ((alerta.tema.nombre === filtroTema.nombre && filtroUsuario === "") || (filtroTema === "" && filtroUsuario == "")) {
                            tema.enviarAlerta(alerta, filtroUsuario);
                        }
                    }
                })
            }
            // alerta.marcarVisto();
        });
    }

    ordenarAlertas(alertas, filtroUsuario, filtroTema) {
        function compararAlertasDesc(alerta, alertaSig) {
            if (alerta.urgente && !alertaSig.urgente) {
                return -1;
            } else if (!alerta.urgente && alertaSig.urgente) {
                return 1;
            }
            return alertaSig.id - alerta.id;
        }

        function compararAlertasAsc(alerta, alertaSig) {
            if (alerta.urgente && !alertaSig.urgente) {
                return -1;
            } else if (!alerta.urgente && alertaSig.urgente) {
                return 1;
            }
            return alerta.id - alertaSig.id;
        }
        alertas = alertas.slice().sort(compararAlertasAsc);
        let alertasUrgente = [];
        let alertasInformativas = [];
        alertas.forEach(alerta => {
            if (alerta.destinatarios.includes(filtroUsuario) || filtroUsuario === "") {
                if (alerta.urgente) {
                    alertasUrgente.push(alerta);
                } else if (!alerta.urgente) {
                    alertasInformativas.push(alerta);
                }
            } else if (alerta.tema.nombre != undefined) {
                if (alerta.tema.nombre.includes(filtroTema.nombre) || filtroTema == "") {
                    if (alerta.urgente) {
                        alertasUrgente.push(alerta);
                    } else if (!alerta.urgente) {
                        alertasInformativas.push(alerta);
                    }

                }
            } else {
                if (filtroTema === "") {
                    if (alerta.urgente) {
                        alertasUrgente.push(alerta);
                    } else if (!alerta.urgente) {
                        alertasInformativas.push(alerta);
                    }
                }
            }
        });
        alertasUrgente = alertasUrgente.slice().sort(compararAlertasDesc);
        alertasInformativas = alertasInformativas.slice().sort(compararAlertasAsc);
        return alertasUrgente.concat(alertasInformativas);
    }
}

module.exports = AlertaService;