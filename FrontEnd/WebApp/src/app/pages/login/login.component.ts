import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  usuario = new Usuario();

  constructor(private usuarioS: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/lista']);
    }
  }

  login(data: NgForm) {
    if (data.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Error en los datos',
        icon: 'error'
      });
    }
    else {
      this.usuarioS.login(this.usuario.correoE, this.usuario.contrasena).subscribe( (resp: any) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Usuario incorrecto',
            icon: 'error'
          });
        } else {
          this.usuario = resp;
          Swal.fire({
            title: 'Bienvenido',
            text: 'Bienvenido al sistema ' + this.usuario.nombre + ' ' + this.usuario.apellido,
            icon: 'error'
          });
          localStorage.setItem('currentUser', JSON.stringify(this.usuario)); // guardamos el usuario que inicio sesion
          localStorage.setItem('accessToken', this.usuario.idUsuario); // guardamos la id del usuario
          // se envia a la pagina principal y el id del usuario para evitar el ingresar por la ruta en el navegador
          this.router.navigate(['/lista']);
        }
      });
    }
  }
}
