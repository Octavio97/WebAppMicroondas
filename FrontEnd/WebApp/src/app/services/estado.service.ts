import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/estado.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaEstado(estado: Estado) {
    return this.http.post( this.url + 'agregarEstado', estado );
  }

  bajaEstado(id: string) {
    return this.http.delete( this.url + 'eliminarEstado', { params: { id } } );
  }

  consultaEstado() {
    return this.http.get( this.url + 'consultaEstado' );
  }

  modificarEstado(estado: Estado, i?) {
    if (i === true) {
      estado.activo = false;
    }
    else if (i === false) {
      estado.activo = true;
    }
    return this.http.put( this.url + 'modificarEstado', estado );
  }

  consultaEInicio() {
    return this.http.get( this.url + 'consultaEInicio' );
  }

  verEstado(id: string) {
    return this.http.get( this.url + 'verEstado', { params: { id } } );
  }

  buscarEstado(key: string) {
    return this.http.get( this.url + 'buscarEstado', { params: { key } } );
  }
}
