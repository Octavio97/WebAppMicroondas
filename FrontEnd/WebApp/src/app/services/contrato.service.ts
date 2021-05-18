import { Injectable } from '@angular/core';
import { Contrato } from '../models/contrato.model';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaContrato(contrato: Contrato) {
    return this.http.post( this.url + 'agregarContrato', contrato );
  }

  bajaContrato(id: string) {
    return this.http.delete( this.url + 'eliminarContrato', { params: { id } } );
  }

  consultaContrato() {
    return this.http.get( this.url + 'consultaContrato' );
  }

  modificarContrato(contrato: Contrato, i?) {
    if (i === true) {
      contrato.activo = false;
    }
    else if (i === false) {
      contrato.activo = true;
    }
    return this.http.put( this.url + 'modificarContrato', contrato );
  }

  consultaUnicaCli(id: string) {
    return this.http.get( this.url + 'consultaUnicaCli', { params: { id } } );
  }

  verContrato(id: string) {
    return this.http.get( this.url + 'verContrato', { params: { id } } );
  }

  altaContratoCli(contrato: Contrato) {
    return this.http.post( this.url + 'altaContratoCli', { params: { contrato } } );
  }

  buscarContrato(key: string) {
    return this.http.get( this.url + 'buscarContrato', { params: { key } } );
  }
}
