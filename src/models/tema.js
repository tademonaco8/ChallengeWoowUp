class Tema {
    constructor(nombre) {
        this.nombre = nombre;
        this.suscriptores = [];
        this.alertas = [];
    }

    agregarSuscriptor(usuario) {
        this.suscriptores.push(usuario);
    }

    enviarAlerta(alerta) {
        this.alertas.push(alerta);
        this.suscriptores.forEach((usuario) => {
            usuario.recibirAlerta(alerta);
        });
    }
}

module.exports = Tema;