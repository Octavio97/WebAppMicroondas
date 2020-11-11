import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Antena } from '../models/antena.model';

@Injectable({
  providedIn: 'root'
})
export class AntenaService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaAntena(antena: Antena) {
    return this.http.post( this.url + 'agregarAntena', antena );
  }

  bajaAntena(id: string) {
    return this.http.delete( this.url + 'eliminarAntena', { params: { id } } );
  }

  consultarAntena() {
    return this.http.get( this.url + 'consultarAntena' );
  }

  modificarAntena(antena: Antena, i?) {
    if (i === true) {
      antena.activo = false;
    }
    return this.http.put( this.url + 'modificarAntena', antena );
  }

  verAntena(id: string) {
    return this.http.get( this.url + 'verAntena', { params: { id } } );
  }
}
