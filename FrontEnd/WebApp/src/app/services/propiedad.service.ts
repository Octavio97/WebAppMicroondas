import { Injectable } from '@angular/core';
import { Propiedad } from '../models/propiedad.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaPropiedad(propiedad: Propiedad) {
    return this.http.post( this.url + 'agregarPropiedad', propiedad );
  }

  bajaPropiedad(id: string) {
    return this.http.put( this.url + 'eliminarPropiedad', id );
  }

  consultaPropiedad() {
    return this.http.get( this.url + 'consultaPropiedad' );
  }

  modificarPropiedad(propiedad: Propiedad) {
    return this.http.post( this.url + 'modificarPropiedad', propiedad );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  verPropiedad(id: string) {
    return this.http.get( this.url + 'verPropiedad', { params: { id } } );
  }
}
