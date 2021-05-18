import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaRol(rol: Rol) {
    return this.http.post( this.url + 'agregarRol', rol);
  }

  bajaRol(id: string) {
    return this.http.delete( this.url + 'eliminarRol', { params: { id } } );
  }

  consultaRol() {
    return this.http.get( this.url + 'consultaRol' );
  }

  modificarRol(rol: Rol, i?) {
    if (i === true){
      rol.activo = false;
    }
    else if (i === false) {
      rol.activo = true;
    }
    return this.http.put( this.url + 'modificarRol', rol );
  }

 consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  verRol(id: string) {
    return this.http.get( this.url + 'verRol', { params: { id } } );
  }

  buscarRol(key: string) {
    return this.http.get( this.url + 'buscarRol', { params: { key } } );
  }
}
