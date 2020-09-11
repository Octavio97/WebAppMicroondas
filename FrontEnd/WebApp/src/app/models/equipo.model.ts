import { PaqueteEquipo } from './paqueteequipo.model';
import { Propiedad } from './propiedad.model';

export class Equipo {
    idEquipo: string;
    equipo1: string;
    activo: boolean;

    PaqueteEquipo: PaqueteEquipo[];
    Propiedad: Propiedad[];

    constructor(){}
}
