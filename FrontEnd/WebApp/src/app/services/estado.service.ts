import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

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
    return this.http.put( this.url + 'modificarEstado', estado );
  }

  consultaEInicio() {
    return this.http.get( this.url + 'consultaEInicio' );
  }

  verEstado(id: string) {
    return this.http.get( this.url + 'verEstado', { params: { id } } );
  }
}
