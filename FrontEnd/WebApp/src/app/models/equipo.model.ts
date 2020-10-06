import { PaqueteEquipo } from './paqueteequipo.model';
import { Propiedad } from './propiedad.model';

export class Equipo {
    idEquipo: string;
    equipo1: string;
    activo: boolean;

    constructor(){
        this.idEquipo = null;
        this.equipo1 = null;
        this.activo = null;
    }
}
