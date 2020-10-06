import { Contrato } from './contrato.model';
import { PaqueteEquipo } from './paqueteequipo.model';

export class Paquete {
    idPaquete: string;
    precio: number;
    nombre: string;
    activo: boolean;
    descripcion: string;

    constructor(){
        this.idPaquete = null;
        this.precio = null;
        this.nombre = null;
        this.activo = null;
        this.descripcion = null;
    }
}
