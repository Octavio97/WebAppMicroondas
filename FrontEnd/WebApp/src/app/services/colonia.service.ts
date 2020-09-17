import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colonia } from '../models/colonia.model';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaColonia(colonia: Colonia) {
    return this.http.post( this.url + 'agregarColonia', colonia );
  }

  bajaColonia(id: string) {
    return this.http.put( this.url + 'eliminarColonia', { params: { id } } );
  }

  consultaColonia() {
    return this.http.get( this.url + 'consultaColonia' );
  }

  modificarColonia(colonia: Colonia) {
    return this.http.put( this.url + 'modificarColonia', colonia );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnicaCo', { params: { id } } );
  }

  verColonia(id: string) {
    return this.http.get( this.url + 'verColonia', { params: { id } } );
  }
}
