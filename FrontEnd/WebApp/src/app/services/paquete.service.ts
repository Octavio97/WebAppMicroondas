import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paquete } from '../models/paquete.model';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaPaquete(paquete: Paquete) {
    return this.http.post( this.url + 'agregarPaquete', paquete );
  }

  bajaPaquete(id: string) {
    return this.http.delete( this.url + 'eliminarPaquete', { params: { id } } );
  }

  consultaPaquete() {
    return this.http.get( this.url + 'consultaPaquete' );
  }

  modificarPaquete(paquete: Paquete, i?) {
    if (i === true) {
      paquete.activo = false;
    }
    return this.http.put( this.url + 'modificarPaquete', paquete );
  }

  consultaUnica() {
    return this.http.get( this.url + 'consultaUnicaPaq' );
  }

  verPaquete(id: string) {
    return this.http.get( this.url + 'verPaquete', { params: { id } } );
  }
}
