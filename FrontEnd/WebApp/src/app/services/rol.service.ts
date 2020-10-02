import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }
  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaRol(rol: Rol) {
    return this.http.post( this.url + 'agregarRol', rol);
  }

  bajaRol(id: string) {
    return this.http.put( this.url + 'eliminarRol', { params: { id } } );
  }

  consultaRol() {
    return this.http.get( this.url + 'consultaRol' );
  }

  modificarRol(rol: Rol, i?) {
    if (i === true){
      rol.activo = false;
    }
    return this.http.put( this.url + 'modificarRol', rol );
  }

 consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  verRol(id: string) {
    return this.http.get( this.url + 'verRol', { params: { id } } );
  }
}
