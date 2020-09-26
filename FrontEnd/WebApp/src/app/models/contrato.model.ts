import { Estatus } from './estatus.model';
import { Paquete } from './paquete.model';
import { Usuario } from './usuario.model';

export class Contrato {
    idContrato: string;
    pdf: Int16Array;
    archivo: string;
    fechaInicio: Date;
    fechaFinal: Date;
    idPaquete: string;
    idEstatus: string;
    idUsuario: string;
    activo: boolean;

    Estatus: Estatus;
    Paquete: Paquete;
    Usuario: Usuario;

    constructor(){}
}
