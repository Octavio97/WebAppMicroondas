
import { Paquete } from './paquete.model';
import { Usuario } from './usuario.model';

export class Contrato {
    idContrato: string;
    pdf: Int16Array;
    archivo: string;
    fechaInicio: Date;
    fechaFinal: Date;
    idPaquete: string;
    idUsuario: string;
    activo: boolean;

    Paquete: Paquete;
    Usuario: Usuario;

    constructor(){
        this.idContrato = null;
        this.pdf = null;
        this.archivo = null;
        this.fechaInicio = null;
        this.fechaFinal = null;
        this.idPaquete = null;
        this.idUsuario = null;
        this.activo = null;
        this.Paquete = new Paquete();
        this.Usuario = new Usuario();
    }
}
