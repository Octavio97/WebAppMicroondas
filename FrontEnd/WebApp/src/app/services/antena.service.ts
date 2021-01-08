import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Antena } from '../models/antena.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AntenaService {

  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

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
    else if (i === false) {
      antena.activo = true;
    }

    return this.http.put( this.url + 'modificarAntena', antena );
  }

  verAntena(id: string) {
    return this.http.get( this.url + 'verAntena', { params: { id } } );
  }

  verAntenas(ciudad: string){
    return this.http.get( this.url + 'verAntenas', { params: { ciudad } } );
  }

  buscarAntena(key: string) {
    return this.http.get( this.url + 'buscarAntena' , { params: { key } } );
  }
}
