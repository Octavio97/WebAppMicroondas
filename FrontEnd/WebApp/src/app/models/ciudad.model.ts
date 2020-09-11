import { Estado } from './estado.model';
import { CodigoPostal } from './codigopostal.model';
import { Usuario } from './usuario.model';

export class Ciudad {
    idCiudad: string;
    Ciudad1: string;
    idEstado: string;
    activo: boolean;

    Estado: Estado[];
    CP: CodigoPostal[];
    Usuario: Usuario[];

    constructor(){}
}
