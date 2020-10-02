import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ciudad } from '../models/ciudad.model';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaCiudad(ciudad: Ciudad) {
    return this.http.post( this.url + 'agregarCiudad', ciudad );
  }

  bajaCiudad(id: string) {
    return this.http.put( this.url + 'eliminarCiudad', { params: { id } } );
  }

  consultaCiudad() {
    return this.http.get( this.url + 'consultaCiudad' );
  }

  modificarCiudad(ciudad: Ciudad, i?) {
    if (i === true) {
      ciudad.activo = false;
    }
    return this.http.put( this.url + 'modificarCiudad', ciudad );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnicaCi', { params: { id } } );
  }

  consultaCinicio(id: string) {
    return this.http.get( this.url + 'consultaCinicio', { params: { id } } );
  }

  verCiudad(id: string) {
    return this.http.get( this.url + 'verCiudad', { params: { id } } );
  }
}
