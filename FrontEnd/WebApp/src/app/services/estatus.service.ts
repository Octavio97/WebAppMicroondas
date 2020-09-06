import { Injectable } from '@angular/core';
import { Estatus } from '../models/estatus.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstatusService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaEstatus(estatus: Estatus) {
    return this.http.post( this.url + 'agregarEstatus', estatus );
  }

  bajaEstatus(id: string) {
    return this.http.put( this.url + 'eliminarEstatus', id );
  }

  consultaEstatus() {
    return this.http.get( this.url + 'consultaEstatus' );
  }

  modificarEstatus(estatus: Estatus) {
    return this.http.post( this.url + 'modificarEstatus', estatus );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }
}
