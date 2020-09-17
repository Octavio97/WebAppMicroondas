import { Injectable } from '@angular/core';
import { PaqueteEquipo } from '../models/paqueteequipo.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaqueteequipoService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaCiudad(pq: PaqueteEquipo) {
    return this.http.post( this.url + 'agregarPaqueteEquipo', pq );
  }

  bajaCiudad(id: string) {
    return this.http.put( this.url + 'eliminarPaqueteEquipo', { params: { id } } );
  }

  consultaCiudad() {
    return this.http.get( this.url + 'consultaPaqueteEquipo' );
  }

  modificarCiudad(pq: PaqueteEquipo) {
    return this.http.put( this.url + 'modificarPaqueteEquipo', pq );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }
}
