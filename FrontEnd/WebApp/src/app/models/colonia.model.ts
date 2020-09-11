import { CodigoPostal } from './codigopostal.model';
import { Usuario } from './usuario.model';

export class Colonia {
    idColonia: string;
    colonia1: string;
    idCP: string;
    activo: boolean;

    CP: CodigoPostal[];
    Usuario: Usuario[];

    constructor(){}
}
