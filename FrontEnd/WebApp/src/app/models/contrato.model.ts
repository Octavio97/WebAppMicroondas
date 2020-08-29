export class Contrato {
    idContrato: string;
    pdf: BigInt64Array;
    archivo: string;
    fechsInicio: Date;
    fechaFinal: Date;
    idPaquete: string;
    idEstatus: string;
    idUsuario: string;
    activo: boolean;

    constructor(){}
}
