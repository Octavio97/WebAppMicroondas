import { Colonia } from './colonia.model';
import { Usuario } from './usuario.model';
import { Ciudad } from './ciudad.model';
export class CodigoPostal {

    idCP: string;
    codigo: number;
    idCiudad: string;
    activo: boolean;

    Ciudad: Ciudad;

    constructor(){
        this.idCP = null;
        this.codigo = null;
        this.idCiudad = null;
        this.activo = null;
        this.Ciudad = new Ciudad();
    }
}
