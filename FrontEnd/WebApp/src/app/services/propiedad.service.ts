import { Injectable } from '@angular/core';
import { Propiedad } from '../models/propiedad.model';
import { HttpClient } from '@angular/common/http';
import { Equipo } from '../models/equipo.model';

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
}
