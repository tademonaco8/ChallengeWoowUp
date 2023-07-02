const Alerta = require('../models/alerta');
class AlertaService {
    constructor(servicio) {
        this.alertas = [];
        this.servicio = servicio;
    }

    obtenerAlertasNoExpiradas() {
        let noExpiradas = [];
        let fechaActual = new Date();
        this.alertas.forEach(alerta => {
            if (alerta.fechaExpiracion >= fechaActual) {
                noExpiradas.push(alerta);
            }
        });
        return noExpiradas;
    }

    enviarAlertas(alertas, temas) {
        alertas = this.ordenarAlertas(alertas);
        alertas.forEach(alerta => {
            if (alerta.destinatarios != []) {
                alerta.destinatarios.forEach(destinatario => {
                    destinatario.recibirAlerta(alerta);
                });
                temas.forEach(tema => {
                    if (alerta.tema == tema) {
                        tema.enviarAlerta(alerta);
                    }
                })
            }
            alerta.marcarVisto();
        });


    }

    ordenarAlertas(alertas) {
        function compararAlertas(alerta, alertaSig) {
            if (alerta.urgente && !alertaSig.urgente) {
                return -1;
            } else if (!alerta.urgente && alertaSig.urgente) {
                return 1;
            }
            // Ordenar por orden de llegada (FIFO)
            return alerta.fechaExpiracion.getDate() - alertaSig.fechaExpiracion.getDate();
        }

        alertas = alertas.slice().sort(compararAlertas);
        let alertasUrgente = [];
        let alertasInformativas = [];
        for (let i = 0; i < alertas.length; i++) {
            const alerta = alertas[i];
            if (alerta.urgente) {
                alertasUrgente.push(alerta);
            } else if (!alerta.urgente) {
                alertasInformativas.push(alerta);
            }
        }
        alertasUrgente = alertasUrgente.slice().sort(compararAlertas);

        return alertasUrgente;
    }
}

module.exports = AlertaService;