import { Contrato } from './contrato.model';
import { PaqueteEquipo } from './paqueteequipo.model';

export class Paquete {
    idPaquete: string;
    precio: number;
    nombre: string;
    activo: boolean;
    descripcion: string;

    Contrato: Contrato;
    PaqueteEquipo: PaqueteEquipo;
    constructor(){}
}
