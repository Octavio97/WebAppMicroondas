import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paquete } from '../models/paquete.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
    console.log(this.url);
  }

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
    else if (i === false) {
      paquete.activo = true;
    }
    return this.http.put( this.url + 'modificarPaquete', paquete );
  }

  consultaUnica() {
    return this.http.get( this.url + 'consultaUnicaPaq' );
  }

  verPaquete(id: string) {
    return this.http.get( this.url + 'verPaquete', { params: { id } } );
  }

  buscarPaquete(key: string) {
    return this.http.get( this.url + 'buscarPaquete', { params: { key } } );
  }
}
