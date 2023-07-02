class Tema {
    constructor(nombre) {
        this.nombre = nombre;
        this.suscriptores = [];
        this.alertas = [];
    }

    agregarSuscriptor(usuario) {
        this.suscriptores.push(usuario);
    }

    enviarAlerta(alerta, filtro) {
        this.alertas.push(alerta);
        this.suscriptores.forEach((usuario) => {
            if (filtro.nombre === usuario.nombre || filtro === "") {
                usuario.recibirAlerta(alerta);
            }
        });
    }
}

module.exports = Tema;