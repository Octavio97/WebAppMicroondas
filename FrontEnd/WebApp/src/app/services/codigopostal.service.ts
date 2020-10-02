import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CodigoPostal } from '../models/codigopostal.model';

@Injectable({
  providedIn: 'root'
})
export class CodigopostalService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaCodigo(codigo: CodigoPostal) {
    return this.http.post( this.url + 'agregarCP', codigo );
  }

  bajaCodigo(id: string) {
    return this.http.put( this.url + 'eliminarCP', { params: { id } } );
  }

  consultaCodigo() {
    return this.http.get( this.url + 'consultaCP' );
  }

  modificarCodigo(codigo: CodigoPostal, i?) {
    if (i === true) {
      codigo.activo = false;
    }
    return this.http.put( this.url + 'modificarCP', codigo );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnicaCP', { params: { id } } );
  }

  consultaCPinicio(id: string) {
    return this.http.get( this.url + 'consultaCPinicio', { params: { id } } );
  }

  verCP(id: string) {
    return this.http.get( this.url + 'verCP', { params: { id } } );
  }
}
