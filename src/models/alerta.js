class Alerta {
    constructor(mensaje, urgente, fechaExpiracion, destinatarios, tema, id) {
        this.mensaje = mensaje;
        this.urgente = urgente;
        this.fechaExpiracion = fechaExpiracion;
        this.visto = false;
        this.destinatarios = destinatarios;
        this.tema = tema;
        this.id = id;
    }

    marcarVisto() {
        this.visto = true;
    }
}

module.exports = Alerta;