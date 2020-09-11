import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }
  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaUsuario(usuario: Usuario) {
    return this.http.post( this.url + 'agregarUsuario', usuario);
  }

  bajaUsuario(id: string) {
    return this.http.put( this.url + 'eliminarUsuario', id );
  }

  consultaUsuario() {
    return this.http.get( this.url + 'consultaUsuario' );
  }

  modificarUsuario(usuario: Usuario) {
    return this.http.put( this.url + 'modificarUsuario', usuario );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  login(correo: string, contra: string) {
    return this.http.get( this.url + 'login', { params: { correo, contra } } );
  }
}
