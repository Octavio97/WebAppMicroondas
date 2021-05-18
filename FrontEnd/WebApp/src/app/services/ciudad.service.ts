import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ciudad } from '../models/ciudad.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaCiudad(ciudad: Ciudad) {
    return this.http.post( this.url + 'agregarCiudad', ciudad );
  }

  bajaCiudad(id: string) {
    return this.http.delete( this.url + 'eliminarCiudad', { params: { id } } );
  }

  consultaCiudad() {
    return this.http.get( this.url + 'consultaCiudad' );
  }

  modificarCiudad(ciudad: Ciudad, i?) {
    if (i === true) {
      ciudad.activo = false;
    }
    else if (i === false) {
      ciudad.activo = true;
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

  buscarCiudad(key: string) {
    return this.http.get( this.url + 'buscarCiudad' , { params: { key } } );
  }
}
