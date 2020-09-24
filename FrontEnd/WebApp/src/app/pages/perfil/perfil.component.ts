import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Rol } from 'src/app/models/rol.model';
import { Colonia } from 'src/app/models/colonia.model';
import { CodigoPostal } from 'src/app/models/codigopostal.model';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from '../../services/estado.service';
import { CodigopostalService } from '../../services/codigopostal.service';
import { CiudadService } from '../../services/ciudad.service';
import { ColoniaService } from '../../services/colonia.service';
import { RolService } from '../../services/rol.service';
import { UsuarioService } from '../../services/usuario.service';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  usuario = new Usuario();
  e: Estado[];
  c: Ciudad[];
  cp: CodigoPostal[];
  co: Colonia[];
  r: Rol[];
  contrato: Contrato[];
  contr = new Contrato();
  mod = false;

  constructor(
    private router: Router,
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private codigoS: CodigopostalService,
    private coloniaS: ColoniaService,
    private rolS: RolService,
    private usuarioS: UsuarioService,
    private contratoS: ContratoService) { }

  ngOnInit(): void {
    // si no esxiste alguna sesion iniciada
    if (!localStorage.getItem('accessToken') && !localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    }
    this.usuario = JSON.parse(localStorage.getItem('currentUser'));
    this.rolS.consultaRol().subscribe( (resp: Rol[]) => {
      if (resp) {
        this.r = resp;
      }
    });
    this.contratoS.consultaUnicaCli(this.usuario.idUsuario).subscribe( (resp: Contrato[]) => {
      if (resp) {
        this.contrato = resp;
      }
    });
    this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
      if (resp) {
        this.e = resp;
        this.ciudadS.consultaUnica(this.usuario.idEstado).subscribe( (resp: Ciudad[]) => {
          if (resp) {
            this.c = resp;
            this.codigoS.consultaUnica(this.usuario.idCiudad).subscribe( (resp: CodigoPostal[]) => {
              if (resp) {
                this.cp = resp;
                this.coloniaS.consultaUnica(this.usuario.idCP).subscribe( (resp: Colonia[]) => {
                  if (resp) {
                    this.co = resp;
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  logout() {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estas seguro de salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      cancelButtonColor: '#d33'
    }).then( (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }
    });
  }

  alta(data: NgForm) {
    if (data.invalid) {
      // mostramos el mensaje de error
      Swal.fire({
        title: 'Parce que te falta algo 😢',
        icon: 'error',
        text: 'Verifique sus datos'
      });
      return;
    }
    else {
      Swal.fire({
        title: 'Confirmación',
        text: '¿Desea guardar cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          // mensaje para cargar informacion
          Swal.fire({
            title: 'Espere',
            text: 'Guardando información',
            icon: 'info',
            allowOutsideClick: false
            });
          Swal.showLoading();

          this.usuarioS.modificarUsuario(this.usuario).subscribe( resp => {
            if (resp === true) {
              Swal.fire({
                title: 'Exito',
                text: 'El usuario fue actualizada con exito',
                icon: 'success'
              });
              this.router.navigate(['/inicio']);
            } else {
              Swal.fire({
                title: 'Error',
                text: 'El usuario ya existe',
                icon: 'error'
              });
            }
          });
        }
      });
    }
  }
    // Metodos para cambiar valores del combobox
  cambio1(id?) {
    this.ciudadS.consultaUnica(id).subscribe( (resp: Ciudad[]) => {
      this.c = resp;
    });
  }

  cambio2(id?) {
    this.codigoS.consultaUnica(id).subscribe( (resp: CodigoPostal[]) => {
      this.cp = resp;
    });
  }

  cambio3(id?) {
    this.coloniaS.consultaUnica(id).subscribe( (resp: Colonia[]) => {
      this.co = resp;
    });
  }

  modEvent(){
    this.mod = !this.mod;
  }

  async addReport() {
    const { value: hint } = await Swal.fire({
      title: 'Nuevo reporte',
      html:
        '<textarea name="" id="" cols="30" rows="10"{{ this.contr.problema }}></textarea>',
        focusConfirm: false,
        preConfirm: () => {
        return [
          this.contr.problema
        ];
  }
    });
  }
}
