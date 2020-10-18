import { Component, OnInit, AfterViewInit, ɵConsole } from '@angular/core';
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
import { SoporteService } from '../../services/soporte.service';
import { Soporte } from 'src/app/models/soporte.model';
import { Paquete } from 'src/app/models/paquete.model';
import { Estatus } from 'src/app/models/estatus.model';
import { EstatusService } from '../../services/estatus.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  length = false;
  usuario = new Usuario();
  e: Estado[];
  c: Ciudad[];
  cp: CodigoPostal[];
  co: Colonia[];
  r: Rol[];
  s: Soporte[];
  contrato = new Contrato();
  soporte = new Soporte();
  mod = false;

  constructor(
    private router: Router,
    private estatusS: EstatusService,
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private codigoS: CodigopostalService,
    private coloniaS: ColoniaService,
    private rolS: RolService,
    private usuarioS: UsuarioService,
    private contratoS: ContratoService,
    private soporteS: SoporteService) { }

  ngOnInit(): void {
    // si no esxiste alguna sesion iniciada
    if (!localStorage.getItem('accessToken') && !localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    }
    // guardamos el usuario actual
    this.usuario = new Usuario();
    this.usuario = JSON.parse(localStorage.getItem('currentUser'));

    // consulta rol
    this.rolS.consultaRol().subscribe( (resp: Rol[]) => {
      if (resp) {
        this.r = new Array<Rol>();
        this.r = resp;
      }
    });

    // consulta de ubicacion
    this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
      if (resp) {
        this.e = new Array<Estado>();
        this.e = resp;
        this.ciudadS.consultaUnica(this.usuario.idEstado).subscribe( (resp: Ciudad[]) => {
          if (resp) {
            this.c = new Array<Ciudad>();
            this.c = resp;
            this.codigoS.consultaUnica(this.usuario.idCiudad).subscribe( (resp: CodigoPostal[]) => {
              if (resp) {
                this.cp = new Array<CodigoPostal>();
                this.cp = resp;
                this.coloniaS.consultaUnica(this.usuario.idCP).subscribe( (resp: Colonia[]) => {
                  if (resp) {
                    this.co = new Array<Colonia>();
                    this.co = resp;
                  }
                });
              }
            });
          }
        });
      }
    });

    if (this.usuario.Rol.rol1 === 'cliente') {
      // consulta del contrato y reportes
      this.contratoS.consultaUnicaCli(this.usuario.idUsuario).subscribe( (resp: Contrato) => {
      if (resp) {
        this.contrato = new Contrato();
        this.contrato = resp;
        this.soporteS.consultaUnicaSopU(this.contrato.idContrato).subscribe( (resp: Soporte[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.s = new Array<Soporte>();
            this.s = resp;
          }
        });
      }
      });
    }
    else if (this.usuario.Rol.rol1 === 'técnico') {
      this.soporteS.consultaUnicaSoporteT(this.usuario.idUsuario).subscribe( (resp: Soporte[]) => {
        if (resp) {
          resp.length === 0 ? this.length = true : this.length = false;
          this.s = new Array<Soporte>();
          this.s = resp;
        }
      });
    }
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
    const { value: text } = await Swal.fire({
      title: 'Problema:',
      input: 'textarea',
      inputPlaceholder: 'Ingrese su problema...',
      inputAttributes: {
        'aria-label': 'Ingrese su problema...'
      },
      showCancelButton: true
    });
    if (text) {
      // mensaje para cargar informacion
      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
        });
      Swal.showLoading();
      this.soporte.problema = text.toString();
      this.soporte.idContrato = this.contrato.idContrato;
      this.soporteS.agregarSoporteCli(this.soporte).subscribe( resp => {
        if (resp) {
          Swal.fire({
            title: 'Exito',
            text: 'Su reporte se ha agregado con exito',
            icon: 'success'
          });
        }
      });
    }
  }

  cancelarReporte(id: Soporte){
    Swal.fire({
      title: 'Confirmación',
      text: '¿Esta seguro de cancelar el reporte?',
      icon: 'question',
      showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        allowOutsideClick: false
    }).then((resp) => {
      if (resp) {
        // mensaje para cargar informacion
        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
          });
        Swal.showLoading();

        this.estatusS.consultaUnicaEstatus('problema').subscribe( (resp: Estatus) => {
          if (resp) {
            id.idEstatus = resp.idEstatus;
            id.idTecnico = '00000000-0000-0000-0000-000000000000';
            this.soporteS.modificarSoporte(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Éxito',
                  text: 'Se ha cancelado el reporte',
                  icon: 'success'
                });
              }
            });
          }
        });
      }
    });
  }

  reporteResuelto(id: Soporte){
    Swal.fire({
      title: 'Confirmación',
      text: '¿Esta seguro de resolver el reporte?',
      icon: 'question',
      showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        allowOutsideClick: false
    }).then((resp) => {
      if (resp) {
        // mensaje para cargar informacion
        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
          });
        Swal.showLoading();

        this.estatusS.consultaUnicaEstatus('resuelto').subscribe( (resp: Estatus) => {
          if (resp) {
            id.idEstatus = resp.idEstatus;
            this.soporteS.modificarSoporte(id).subscribe(resp => {
              if (resp) {
                Swal.fire({
                  title: 'Éxito',
                  text: 'Se ha resuelto el reporte',
                  icon: 'success'
                });
              }
            });
          }
        });
      }
    });
  }
}
