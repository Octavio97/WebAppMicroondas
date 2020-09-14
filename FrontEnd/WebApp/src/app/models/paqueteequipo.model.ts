import { Paquete } from './paquete.model';
import { Equipo } from './equipo.model';

export class PaqueteEquipo {
    idPE: number;
    idPaquete: string;
    idEquipo: string;

    Paquete: Paquete;
    Equipo: Equipo;

    constructor(){}
}
