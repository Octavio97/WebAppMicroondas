import { Contrato } from './contrato.model';
import { Estatus } from './estatus.model';
import { Usuario } from './usuario.model';

export class Soporte {
    idSoporte: string;
    problema: string;
    idTecnico: string;
    idContrato: string;
    fechaInicio: Date;
    fechaFinal: Date;
    idEstatus: string;
    activo: boolean;

    Contrato: Contrato;
    Usuario: Usuario;
    Estatus: Estatus;

    constructor(){
        this.idSoporte = null;
        this.problema = null;
        this.idTecnico = null;
        this.idContrato = null;
        this.fechaInicio = null;
        this.fechaFinal = null;
        this.idEstatus = null;
        this.activo = null;
        this.Contrato = new Contrato();
        this.Usuario = new Usuario();
        this.Estatus = new Estatus();
    }
}
