import { Equipo } from './equipo.model';
import { Usuario } from './usuario.model';

export class Propiedad {
    idPropiedad: number;
    idUsuario: string;
    idEquipo: string;

    Equipo: Equipo;
    Usuario: Usuario;

    constructor(){
        this.idPropiedad = null;
        this.idUsuario = null;
        this.idEquipo = null;
        this.Equipo = new Equipo();
        this.Usuario = new Usuario();
    }
}
