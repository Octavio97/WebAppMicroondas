import { Ciudad } from './ciudad.model';
import { Estado } from './estado.model';
import { CodigoPostal } from './codigopostal.model';
import { Colonia } from './colonia.model';

export class Antena {
    idAntena: string;
    idEstado: string;
    idCiudad: string;
    idCP: string;
    idColonia: string;
    calle: string;
    numExt: number;
    lat: string;
    lon: string;
    activo: boolean;
    Estado: Estado;
    Ciudad: Ciudad;
    CP: CodigoPostal;
    Colonia: Colonia;

    constructor() {
        this.idAntena = null;
        this.idEstado = null;
        this.idCiudad = null;
        this.idCP = null;
        this.idColonia = null;
        this.calle = null;
        this.numExt = null;
        this.lat = null;
        this.lon = null;
        this.activo = null;
        this.Estado = new Estado();
        this.Ciudad = new Ciudad();
        this.CP = new CodigoPostal();
        this.Colonia = new Colonia();
    }
}
