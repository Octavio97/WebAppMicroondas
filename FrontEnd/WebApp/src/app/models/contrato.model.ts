export class Contrato {
    idContrato: string;
    pdf: Int16Array;
    archivo: string;
    fechaInicio: Date;
    fechaFinal: Date;
    idPaquete: string;
    idEstatus: string;
    idUsuario: string;
    activo: boolean;

    constructor(){}
}
