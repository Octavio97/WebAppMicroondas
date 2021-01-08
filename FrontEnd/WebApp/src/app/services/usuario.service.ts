import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public readonly url;
  public readonly url2;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();
    this.url2 = url.url2;
    this.url = url.url;
  }

  altaUsuario(usuario: Usuario) {
    return this.http.post( this.url + 'agregarUsuario', usuario);
  }

  bajaUsuario(id: string) {
    return this.http.delete( this.url + 'eliminarUsuario', {params: { id } } );
  }

  consultaUsuario() {
    return this.http.get( this.url + 'consultaUsuario' );
  }

  modificarUsuario(usuario: Usuario, i?) {
    if (i === true) {
      usuario.activo = false;
    }
    else if (i === false) {
      usuario.activo = true;
    }
    return this.http.put( this.url + 'modificarUsuario', usuario );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnica', { params: { id } } );
  }

  login(correo: string, contra: string) {
    return this.http.get( this.url + 'login', { params: { correo, contra } } );
  }

  verUsuario(id: string) {
    return this.http.get( this.url + 'verUsuario', { params: { id } } );
  }

  verCliente() {
    return this.http.get( this.url + 'verCliente' );
  }

  verTecnico() {
    return this.http.get( this.url + 'verTecnico' );
  }

  verContrasena(correo: string) {
    return this.http.get( this.url + 'verContrasena', { params: { correo } } );
  }

  enviarCorreo(body) {
    return this.http.post( this.url2, body );
  }

  buscarUsuario(key: string) {
    return this.http.get( this.url + 'buscarUsuario', { params: { key } } );
  }
}
