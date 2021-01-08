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
import { SoporteService } from '../../services/soporte.service';
import { Soporte } from 'src/app/models/soporte.model';
import { EstatusService } from '../../services/estatus.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {
  length = true;
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
  plugin = '/assets/img/plugin.jpg';
  plugmodem = '/assets/img/plugmodem.jpg';

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
    }, (e: any) => {
      console.log(e);
    });

    // consulta de ubicacion
    this.estadoS.consultaEstado().subscribe( (resp1: Estado[]) => {
      if (resp1) {
        this.e = new Array<Estado>();
        this.e = resp1;
        this.ciudadS.consultaUnica(this.usuario.idEstado).subscribe( (resp2: Ciudad[]) => {
          if (resp2) {
            this.c = new Array<Ciudad>();
            this.c = resp2;
            this.codigoS.consultaUnica(this.usuario.idCiudad).subscribe( (resp3: CodigoPostal[]) => {
              if (resp3) {
                this.cp = new Array<CodigoPostal>();
                this.cp = resp3;
                this.coloniaS.consultaUnica(this.usuario.idCP).subscribe( (resp4: Colonia[]) => {
                  if (resp4) {
                    this.co = new Array<Colonia>();
                    this.co = resp4;
                  }
                }, (e: any) => {
                  console.log(e);
                });
              }
            }, (e: any) => {
              console.log(e);
            });
          }
        }, (e: any) => {
          console.log(e);
        });
      }
    }, (e: any) => {
      console.log(e);
    });

    if (this.usuario.Rol.rol1 === 'cliente') {
      // consulta del contrato y reportes
      this.contratoS.consultaUnicaCli(this.usuario.idUsuario).subscribe( (resp: Contrato) => {
      if (resp) {
        this.contrato = new Contrato();
        this.contrato = resp;
        this.soporteS.consultaUnicaSopU(this.contrato.idContrato).subscribe( (resp2: Soporte[]) => {
          resp2.length === 0 ? this.length = true : this.length = false;
          if (resp2) {
            this.s = new Array<Soporte>();
            this.s = resp2;
          }
        }, (e: any) => {
          console.log(e);
        });
      }
      }, (e: any) => {
        console.log(e);
      });
    }
    else if (this.usuario.Rol.rol1 === 'técnico') {
      this.soporteS.consultaUnicaSoporteT(this.usuario.idUsuario).subscribe( (resp: Soporte[]) => {
        if (resp) {
          resp.length === 0 ? this.length = true : this.length = false;
          this.s = new Array<Soporte>();
          this.s = resp;
        }
      }, (e: any) => {
        console.log(e);
      });
    }
  }

  // METODO PARA CERRAR SESION
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

  // METODO PARA MODIFICAR USUARIO
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
                icon: 'success',
                showConfirmButton: false,
                timer: 4000
              });
              this.router.navigate(['/inicio']);
            } else {
              Swal.fire({
                title: 'Error',
                text: 'El usuario ya existe',
                icon: 'error'
              });
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
      });
    }
  }
    // Metodos para cambiar valores del combobox
  cambio1(id?) {
    this.ciudadS.consultaUnica(id).subscribe( (resp: Ciudad[]) => {
      this.c = resp;
    }, (e: any) => {
      console.log(e);
    });
  }

  cambio2(id?) {
    this.codigoS.consultaUnica(id).subscribe( (resp: CodigoPostal[]) => {
      this.cp = resp;
    }, (e: any) => {
      console.log(e);
    });
  }

  cambio3(id?) {
    this.coloniaS.consultaUnica(id).subscribe( (resp: Colonia[]) => {
      this.co = resp;
    }, (e: any) => {
      console.log(e);
    });
  }

  // METODO PARA ACTIVAR Y DESACTIVAR FORMULARIO DEL CLIENTE PARA MODIFICAR
  modEvent(){
    this.mod = !this.mod;
  }

  // METODO PARA AGREGAR UN REPORTE
  async addReport() {
    const { value: problem } = await Swal.fire({
      title: '¿Cuál es sus problema?',
      input: 'radio',
      width: '80%',
      inputOptions: {
        1 : 'Su módem no está encendido',
        2: 'No cuenta con conexión a internet',
        3: 'Otro problema'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'Necesita elegir uno';
        }
      }
    });

    if (problem) {
      switch (problem) {
        case '1':
          Swal.fire({
            title: 'Solución',
            text: 'Revise si el cable de alimentación este conectado a la energía y la luz de energia en el módem este encendida.',
            imageUrl: this.plugin,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'lol',
            confirmButtonText: '¿No funciona?',
            confirmButtonColor: '#d33'
          }).then((result) => {
            if (result.isConfirmed) {
              // mensaje para cargar informacion
              Swal.fire({
                title: 'Espere',
                text: 'Guardando información',
                icon: 'info',
                allowOutsideClick: false
              });
              Swal.showLoading();
              this.soporte.problema = 'El módem no enciende';
              this.soporte.idContrato = this.contrato.idContrato;
              this.soporteS.agregarSoporteCli(this.soporte).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'Su reporte se ha agregado con exito, uno de nuestros técnicos se contactará con usted pronto',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 4000
                });
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
          });
          break;

        case '2':
          Swal.fire({
            title: 'Solución',
            text: 'Revise si los cables de conexión estan bien enchufados al módem.',
            imageUrl: this.plugmodem,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'lol',
            confirmButtonText: '¿No funciona?',
            confirmButtonColor: '#d33'
          }).then((result) => {
            if (result.isConfirmed) {
              // mensaje para cargar informacion
              Swal.fire({
                title: 'Espere',
                text: 'Guardando información',
                icon: 'info',
                allowOutsideClick: false
              });
              Swal.showLoading();
              this.soporte.problema = 'No cuenta con conexión a internet';
              this.soporte.idContrato = this.contrato.idContrato;
              this.soporteS.agregarSoporteCli(this.soporte).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'Su reporte se ha agregado con exito, uno de nuestros técnicos se contactará con usted pronto',
                  icon: 'success'
                });
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
          });
          break;

        case '3':
          const { value: text } = await Swal.fire({
            title: 'Diganos su problema',
            input: 'textarea',
            inputPlaceholder: 'Ingrese su problema a resolver...',
            inputAttributes: {
              'aria-label': 'Ingrese su problema...'
            },
            showCancelButton: false,
            confirmButtonColor: '#0C8902',
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
                  text: 'Su reporte se ha agregado con exito, uno de nuestros técnicos se contactará con usted pronto',
                  icon: 'success'
                });
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
          break;
      }
    }
  }

  // METODO PARA CANCELAR REPORTE
  cancelarReporte(id: string){
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
    }).then((result) => {
      if (result.isConfirmed) {
        // mensaje para cargar informacion
        Swal.fire({
          title: 'Espere',
          text: 'Guardando información',
          icon: 'info',
          allowOutsideClick: false
          });
        Swal.showLoading();

        this.soporteS.cancelarSoporte(id).subscribe( respt => {
          if (respt) {
            Swal.fire({
              title: 'Exito',
              text: 'El reporte fue eliminado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 4000
            });
            // consulta del contrato y reportes
            this.contratoS.consultaUnicaCli(this.usuario.idUsuario).subscribe( (resp: Contrato) => {
              if (resp) {
                this.contrato = new Contrato();
                this.contrato = resp;
                this.soporteS.consultaUnicaSopU(this.contrato.idContrato).subscribe( (resp2: Soporte[]) => {
                  resp2.length === 0 ? this.length = true : this.length = false;
                  if (resp2) {
                    this.s = new Array<Soporte>();
                    this.s = resp2;
                  }
                }, (e: any) => {
                  console.log(e);
                });
              }
            }, (e: any) => {
              console.log(e);
            });
          }
          else {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el reporte',
              icon: 'error'
            });
          }
        }, (e: any) => {
          console.log(e);
        });
      }
    });
  }

  // reporteResuelto(id: Soporte){
  //   Swal.fire({
  //     title: 'Confirmación',
  //     text: '¿Esta seguro de resolver el reporte?',
  //     icon: 'question',
  //     showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Si',
  //       cancelButtonText: 'No',
  //       allowOutsideClick: false
  //   }).then((resp) => {
  //     if (resp) {
  //       // mensaje para cargar informacion
  //       Swal.fire({
  //         title: 'Espere',
  //         text: 'Guardando información',
  //         icon: 'info',
  //         allowOutsideClick: false
  //         });
  //       Swal.showLoading();

  //       this.estatusS.consultaUnicaEstatus('resuelto').subscribe( (resp: Estatus) => {
  //         if (resp) {
  //           id.idEstatus = resp.idEstatus;
  //           this.soporteS.modificarSoporte(id).subscribe(resp2 => {
  //             if (resp2) {
  //               Swal.fire({
  //                 title: 'Éxito',
  //                 text: 'Se ha resuelto el reporte',
  //                 icon: 'success'
  //               });
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }
}
