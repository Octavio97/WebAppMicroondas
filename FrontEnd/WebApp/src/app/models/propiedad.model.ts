import { Equipo } from './equipo.model';
import { Usuario } from './usuario.model';

export class Propiedad {
    idPropiedad: number;
    idUsuario: string;
    idEquipo: string;

    Equipo: Equipo[];
    Usuario: Usuario[];

    constructor(){}
}
