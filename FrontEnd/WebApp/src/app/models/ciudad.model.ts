import { Estado } from './estado.model';

export class Ciudad {
    idCiudad: string;
    ciudad1: string;
    idEstado: string;
    activo: boolean;

    Estado: Estado;

    constructor(){
        this.idCiudad = null;
        this.ciudad1 = null;
        this.idEstado = null;
        this.activo = null;
        this.Estado = new Estado();
    }
}
