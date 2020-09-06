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
    return this.http.put( this.url + 'eliminarContrato', id );
  }

  consultaContrato() {
    return this.http.get( this.url + 'consultaContrato' );
  }

  modificarContrato(contrato: Contrato) {
    return this.http.post( this.url + 'modificarContrato', contrato );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }
}
