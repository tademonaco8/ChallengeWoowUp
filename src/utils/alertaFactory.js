const Alerta = require('../models/alerta');

class AlertaFactory {
    static crearAlerta(mensaje, urgente, fechaExpiracion, destinatarios, tema) {
        let id = AlertaFactory.generarIdUnico();
        return new Alerta(mensaje, urgente, fechaExpiracion, destinatarios, tema, id);
    }

    static generarIdUnico() {
        AlertaFactory.contadorId = (AlertaFactory.contadorId || 0) + 1;
        return AlertaFactory.contadorId;
    }
}

module.exports = AlertaFactory;