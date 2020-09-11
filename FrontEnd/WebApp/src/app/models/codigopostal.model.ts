import { Colonia } from './colonia.model';
import { Usuario } from './usuario.model';
import { Ciudad } from './ciudad.model';
export class CodigoPostal {

    idCP: string;
    codigo: number;
    idCiudad: string;
    activo: boolean;

    Colonia: Colonia[];
    Usuario: Usuario[];
    Ciudad: Ciudad[];

    constructor(){}
}
