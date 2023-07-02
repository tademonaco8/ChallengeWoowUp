class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
        this.temasSuscritos = [];
    }

    suscribirTema(tema) {
        this.temasSuscritos.push(tema);
        tema.agregarSuscriptor(this);
    }

    recibirAlerta(alerta) {
        console.log(`[${this.nombre}] Recibió la alerta: ${alerta.mensaje}`);
    }
}

module.exports = Usuario;