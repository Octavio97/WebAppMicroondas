import { Injectable } from '@angular/core';
import { Rol } from '../models/rol.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }
  public readonly url = 'http://localhost:53165/api/MicroondasAPI/';

  altaRol(rol: Rol) {
    return this.http.post( this.url + 'agregarRol', { params: { rol } });
  }

  bajaRol() {

  }

  consultaRol() {

  }

  modificarRol() {

 }
}
