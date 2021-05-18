import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo.model';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaEquipo(equipo: Equipo) {
    return this.http.post( this.url + 'agregarEquipo', equipo );
  }

  bajaEquipo(id: string) {
    return this.http.delete( this.url + 'eliminarEquipo', { params: { id } } );
  }

  consultaEquipo() {
    return this.http.get( this.url + 'consultaEquipo' );
  }

  modificarEquipo(equipo: Equipo, i?) {
    if (i === true) {
      equipo.activo = false;
    }
    else if (i === false) {
      equipo.activo = true;
    }
    return this.http.put( this.url + 'modificarEquipo', equipo );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  verEquipo(id: string) {
    return this.http.get( this.url + 'verEquipo', { params: { id } } );
  }

  buscarEquipo(key: string) {
    return this.http.get( this.url + 'buscarEquipo', { params: { key } } );
  }
}
