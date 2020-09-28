
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

    constructor(){}
}
