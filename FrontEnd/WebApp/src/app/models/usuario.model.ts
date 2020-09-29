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
    numInt: number;
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

    constructor() {}
}
