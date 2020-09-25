import { Injectable } from '@angular/core';
import { Contrato } from '../models/contrato.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaContrato(contrato: Contrato) {
    return this.http.post( this.url + 'agregarContrato', contrato );
  }

  bajaContrato(id: string) {
    return this.http.put( this.url + 'eliminarContrato', { params: { id } } );
  }

  consultaContrato() {
    return this.http.get( this.url + 'consultaContrato' );
  }

  modificarContrato(contrato: Contrato) {
    return this.http.put( this.url + 'modificarContrato', contrato );
  }

  consultaUnicaCli(id: string) {
    return this.http.get( this.url + 'consultaUnicaCli', { params: { id } } );
  }

  consultaUnicaTec(id: string) {
    return this.http.get( this.url + 'consultaUnicaTec', { params: { id } } );
  }

  verContrato(id: string) {
    return this.http.get( this.url + 'verContrato', { params: { id } } );
  }

  altaContratoCli(contrato: Contrato) {
    return this.http.post( this.url + 'altaContratoCli', { params: { contrato } } );
  }
}
