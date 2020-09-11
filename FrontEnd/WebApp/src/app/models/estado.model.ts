import { Ciudad } from './ciudad.model';
import { Usuario } from './usuario.model';

export class Estado {
    idEstado: string;
    estado1: string;
    activo: boolean;

    Ciudad: Ciudad[];
    Usuario: Usuario[];

    constructor(){}
}
