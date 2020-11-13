import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Informes } from '../models/informes.model';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaInformes(informes: Informes) {
    return this.http.post( this.url + 'agregarInformes', informes );
  }

  bajaInformes(id: string){
    return this.http.delete( this.url + 'eliminarInformes', { params: { id } } );
  }

  consultaInformes() {
    return this.http.get( this.url + 'consultaInformes' );
  }

  modificarInformes(informes: Informes, i?) {
    if (i === true) {
      informes.activo = false;
    }
    return this.http.put( this.url + 'modificarInformes', informes );
  }

  verInformes(id: string) {
    return this.http.get( this.url + 'verInformes', { params: { id } } );
  }
}
