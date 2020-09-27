import { Contrato } from './contrato.model';
import { Usuario } from './usuario.model';
export class Soporte {
    idSoporte: string;
    problema: string;
    idTecnico: string;
    idContrato: string;
    fechaInicio: string;
    fechaFinal: string;
    activo: boolean;

    Contrato: Contrato;
    Usuario: Usuario;

    constructor(){}
}
