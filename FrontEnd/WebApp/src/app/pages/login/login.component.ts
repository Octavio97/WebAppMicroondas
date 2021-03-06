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
  i = false;
  contra: boolean;

  constructor(private usuarioS: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    // ver si el usuario esta loggeado
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/inicio']);
    }
    else {
      localStorage.removeItem('currentUser');
    }
  }

  // METODO PARA INICIAR SESION
  login(data: NgForm) {
    if (data.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Error en los datos',
        icon: 'error'
      });
    }
    else {
      this.i = true;
      this.usuarioS.login(this.usuario.correoE, this.usuario.contrasena).subscribe( (resp: Usuario) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Usuario incorrecto',
            icon: 'error',
            timer: 3000
          });
          this.i = false;
        }
        else {
          this.usuario = resp;
          Swal.fire({
            title: 'Bienvenido',
            text: 'Bienvenido al sistema ' + this.usuario.nombre + ' ' + this.usuario.apellido,
            icon: 'success',
            timer: 2500,
            showConfirmButton: false
          });
          const element = document.getElementById('check') as HTMLInputElement;
          if (!element.checked) {
            localStorage.setItem('currentUser', JSON.stringify(this.usuario)); // guardamos el usuario que inicio sesion
          }
          else {
            localStorage.setItem('accessToken', this.usuario.idUsuario); // guardamos la id del usuario
            localStorage.setItem('currentUser', JSON.stringify(this.usuario)); // guardamos el usuario que inicio sesion
          }
          // se envia a la pagina principal y el id del usuario para evitar el ingresar por la ruta en el navegador
          this.router.navigate(['/inicio']);
        }
      }, (e: any) => {
        Swal.fire({
          title: 'ERROR',
          text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
        this.i = false;
      });
    }
  }

  // METODO PARA RECUPERAR CONTRASEÑA
  async recuperar() {
    const { value: email } = await Swal.fire({
      title: 'Ingrese su correo electrónico',
      text: 'Ingrese su correo electrónico para enviarle su contraseña',
      input: 'email',
      inputPlaceholder: 'Ingrese correo electrónco',
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un correo';
        }
      }
    });

    if (email) {
      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      // si el correo es valido
      if (regex.test(email.toString())) {
        // consulta la bd y despues al sevidor de e-mail y envia la contraseña
        this.usuarioS.verContrasena(email.toString()).subscribe( (resp: Usuario) => {
          if (resp) {
            this.usuarioS.enviarCorreo(resp).subscribe( resp => {
              Swal.fire({
                title: 'Exito',
                text: 'Tu contraseña se ha enviado a tu correo electrónico',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
          } // si no lo es
          else {
            return 'No se encontró correo electrónico';
          }
        }, (e: any) => {
          Swal.fire({
            title: 'ERROR',
            text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
          });
        });
      }
      else {
        return 'Ingrese un correo válido';
      }
    }
  }

  // METODO PARA VER CONTRASEÑA
  verContrasena() {
    this.contra = !this.contra;
  }
}
