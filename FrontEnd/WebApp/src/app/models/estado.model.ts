import { Ciudad } from './ciudad.model';
import { Usuario } from './usuario.model';

export class Estado {
    idEstado: string;
    estado1: string;
    activo: boolean;

    constructor(){
        this.idEstado = null;
        this.estado1 = null;
        this.activo = null;
    }
}
