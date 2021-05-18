import { Injectable } from '@angular/core';
import { Estatus } from '../models/estatus.model';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaEstatus(estatus: Estatus) {
    return this.http.post( this.url + 'agregarEstatus', estatus );
  }

  bajaEstatus(id: string) {
    return this.http.delete( this.url + 'eliminarEstatus', {params: { id } } );
  }

  consultaEstatus() {
    return this.http.get( this.url + 'consultaEstatus' );
  }

  modificarEstatus(estatus: Estatus, i?) {
    if (i === true) {
      estatus.activo = false;
    }
    else if (i === false) {
      estatus.activo = true;
    }
    return this.http.put( this.url + 'modificarEstatus', estatus );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  verEstatus(id: string) {
    return this.http.get( this.url + 'verEstatus', { params: { id } } );
  }

  consultaUnicaEstatus(estatus: string) {
    return this.http.get( this.url + 'consultaUnicaEstatus', { params: { estatus } } );
  }

  buscarEstatus(key: string) {
    return this.http.get( this.url + 'buscarEstatus', { params: { key } } );
  }
}
