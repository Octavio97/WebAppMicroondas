import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CodigoPostal } from '../models/codigopostal.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CodigopostalService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaCodigo(codigo: CodigoPostal) {
    return this.http.post( this.url + 'agregarCP', codigo );
  }

  bajaCodigo(id: string) {
    return this.http.delete( this.url + 'eliminarCP', { params: { id } } );
  }

  consultaCodigo() {
    return this.http.get( this.url + 'consultaCP' );
  }

  modificarCodigo(codigo: CodigoPostal, i?) {
    if (i === true) {
      codigo.activo = false;
    }
    else if (i === false) {
      codigo.activo = true;
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

  buscarCP(key: string) {
    return this.http.get( this.url + 'buscarCP', { params: { key } } );
  }
}
