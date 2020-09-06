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
    return this.http.put( this.url + 'eliminarPaquete', id );
  }

  consultaPaquete() {
    return this.http.get( this.url + 'consultaPaquete' );
  }

  modificarPaquete(paquete: Paquete) {
    return this.http.post( this.url + 'modificarPaquete', paquete );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }
}
