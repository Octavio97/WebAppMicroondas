import { Injectable } from '@angular/core';
import { Propiedad } from '../models/propiedad.model';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaPropiedad(propiedad: Propiedad) {
    return this.http.post( this.url + 'agregarPropiedad', propiedad );
  }

  bajaPropiedad(id: string) {
    return this.http.delete( this.url + 'eliminarPropiedad', { params: { id } } );
  }

  consultaPropiedad() {
    return this.http.get( this.url + 'consultaPropiedad' );
  }

  modificarPropiedad(id: string) {
    return this.http.delete( this.url + 'modificarPropiedad', { params: { id } } );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  verPropiedad(id: string) {
    return this.http.get( this.url + 'verPropiedad', { params: { id } } );
  }

  buscarPropiedad(key: string) {
    return this.http.get( this.url + 'buscarPropiedad', { params: { key } } );
  }
}
