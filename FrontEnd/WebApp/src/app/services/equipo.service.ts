import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaEquipo(equipo: Equipo) {
    return this.http.post( this.url + 'agregarEquipo', equipo );
  }

  bajaEquipo(id: string) {
    return this.http.put( this.url + 'eliminarEquipo', id );
  }

  consultaEquipo() {
    return this.http.get( this.url + 'consultaEquipo' );
  }

  modificarEquipo(equipo: Equipo) {
    return this.http.post( this.url + 'modificarEquipo', equipo );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }
}
