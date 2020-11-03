import { CodigoPostal } from './codigopostal.model';

export class Colonia {
    idColonia: string;
    colonia1: string;
    idCP: string;
    activo: boolean;

    CP: CodigoPostal;

    constructor(){
        this.idColonia = null;
        this.colonia1 = null;
        this.idCP = null;
        this.activo = null;
        this.CP = new CodigoPostal();
    }
}
