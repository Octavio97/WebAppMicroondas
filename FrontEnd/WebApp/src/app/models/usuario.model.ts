import { Contrato } from './contrato.model';
import { Estado } from './estado.model';
import { Propiedad } from './propiedad.model';
import { Rol } from './rol.model';
import { CodigoPostal } from './codigopostal.model';
import { Colonia } from './colonia.model';
import { Ciudad } from './ciudad.model';

export class Usuario {
    idUsuario: string;
    nombre: string;
    apellido: string;
    telefono: string;
    correoE: string;
    contrasena: string;
    calle: string;
    numInt: string;
    numExt: number;
    idEstado: string;
    idCiudad: string;
    idColonia: string;
    idCP: string;
    idRol: string;
    activo: boolean;

    CP: CodigoPostal;
    Colonia: Colonia;
    Ciudad: Ciudad;
    Estado: Estado;
    Rol: Rol;

    constructor() {
        this.idUsuario = null;
        this.nombre = null;
        this.apellido = null;
        this.telefono = null;
        this.correoE = null;
        this.contrasena = null;
        this.calle = null;
        this.numInt = null;
        this.numExt = null;
        this.idEstado = null;
        this.idCiudad = null;
        this.idColonia = null;
        this.idCP = null;
        this.idRol = null;
        this.activo = null;
        this.CP = new CodigoPostal();
        this.Colonia = new Colonia();
        this.Ciudad = new Ciudad();
        this.Estado = new Estado();
        this.Rol = new Rol();
    }
}
