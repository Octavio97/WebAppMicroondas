import { Component, OnInit } from '@angular/core';
import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EstatusService } from 'src/app/services/estatus.service';
import { CiudadService } from 'src/app/services/ciudad.service';
import { ColoniaService } from 'src/app/services/colonia.service';
import { PropiedadService } from 'src/app/services/propiedad.service';
import { PaqueteequipoService } from 'src/app/services/paqueteequipo.service';
import { PaqueteService } from 'src/app/services/paquete.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { CodigopostalService } from 'src/app/services/codigopostal.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Estatus } from 'src/app/models/estatus.model';
import { Ciudad } from '../../models/ciudad.model';
import { CodigoPostal } from '../../models/codigopostal.model';
import { Colonia } from '../../models/colonia.model';
import { Contrato } from '../../models/contrato.model';
import { Equipo } from '../../models/equipo.model';
import { Paquete } from 'src/app/models/paquete.model';
import { PaqueteEquipo } from '../../models/paqueteequipo.model';
import { Propiedad } from '../../models/propiedad.model';
import { Router } from '@angular/router';
import { SoporteService } from '../../services/soporte.service';
import { Soporte } from 'src/app/models/soporte.model';
import { NgForm } from '@angular/forms';
import { Informes } from 'src/app/models/informes.model';
import { InformesService } from '../../services/informes.service';
import { SlideImgService } from '../../services/slide-img.service';
import { SlideImg } from 'src/app/models/slideImg.model';
import { Antena } from '../../models/antena.model';
import { AntenaService } from '../../services/antena.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  session: Usuario;
  reporte: Soporte;
  asignarRep = false; // variable para definir mostrar el reporte
  cargando = false; // variable para mostrar card de carga
  length = false; // dimension del arreglo
  seleccion = 'Seleccione tabla...';
  in = false; // mostrar registros eliminados
  tablas = ['Antenas', 'Usuario', 'Rol', 'Estatus', 'Ciudad', 'Código postal', 'Colonia', 'Contrato', 'Equipo', 'Estado', 'Paquete', 'Propiedad', 'Soporte', 'Informes', 'Imágenes promocionales'];
  rol: Rol[];
  slides: SlideImg[];
  estado: Estado[];
  estatus: Estatus[];
  usuario: Usuario[];
  cliente: Contrato[];
  ciudad: Ciudad[];
  codigo: CodigoPostal[];
  colonia: Colonia[];
  contrato: Contrato[];
  equipo: Equipo[];
  soporte: Soporte[];
  paquete: Paquete[];
  paqueteEquipo: PaqueteEquipo[];
  propiedad: Propiedad[];
  informes: Informes[];
  antena: Antena[];

  constructor(
    private rolS: RolService,
    private estadoS: EstadoService,
    private usuarioS: UsuarioService,
    private estatusS: EstatusService,
    private ciudadS: CiudadService,
    private codigoS: CodigopostalService,
    private coloniaS: ColoniaService,
    private contratoS: ContratoService,
    private equipoS: EquipoService,
    private paqueteS: PaqueteService,
    private paqueteEquipoS: PaqueteequipoService,
    private propiedadS: PropiedadService,
    private soporteS: SoporteService,
    private informesS: InformesService,
    private slideImgService: SlideImgService,
    private antenaS: AntenaService,
    private router: Router) { }

  ngOnInit(): void {
    // si no esxiste alguna sesion iniciada
    if (!localStorage.getItem('accessToken') && !localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    }
    this.session = new Usuario();
    this.session = JSON.parse(localStorage.getItem('currentUser'));
    if (this.session.Rol.rol1 === 'secretario') {
      this.reporte = new Soporte();
      this.soporte = new Array<Soporte>();
      this.verReportes();
    }
    else if (this.session.Rol.rol1 === 'cliente' || this.session.Rol.rol1 === 'técnico') {
      this.router.navigate(['perfil']);
    }
  }

  // METODO PARA INTERCALAR ENTRE TABLAS
  change(i: string) {
    this.seleccion = i;
    this.cargando = true;
    if (i === 'Rol') {
      this.rol = new Array<Rol>();
      this.rolS.consultaRol().subscribe( (resp: Rol[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.rol = resp;
          this.cargando = false;
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
    else if (i === 'Estado') {
      this.estado = new Array<Estado>();
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.estado = resp;
          this.cargando = false;
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
    else if (i === 'Ciudad') {
      this.ciudad = new Array<Ciudad>();
      this.ciudadS.consultaCiudad().subscribe( (resp: Ciudad[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.ciudad = resp;
          this.cargando = false;
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
    else if (i === 'Colonia') {
      this.colonia = new Array<Colonia>();
      this.coloniaS.consultaColonia().subscribe( (resp: Colonia[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.colonia = resp;
          this.cargando = false;
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
    else if (i === 'Código postal') {
      this.codigo = new Array<CodigoPostal>();
      this.codigoS.consultaCodigo().subscribe( (resp: CodigoPostal[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.codigo = resp;
          this.cargando = false;
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
    else if (i === 'Paquete') {
      this.paquete = new Array<Paquete>();
      this.paqueteS.consultaPaquete().subscribe( (resp: Paquete[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.paquete = resp;
          this.cargando = false;
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
    else if (i === 'Usuario') {
      this.usuario = new Array<Usuario>();
      this.usuarioS.consultaUsuario().subscribe( (resp: Usuario[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.usuario = resp;
          this.cargando = false;
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
    else if (i === 'Estatus') {
      this.estatus = new Array<Estatus>();
      this.estatusS.consultaEstatus().subscribe( (resp: Estatus[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.estatus = resp;
          this.cargando = false;
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
    else if (i === 'Contrato') {
      this.contrato = new Array<Contrato>();
      this.contratoS.consultaContrato().subscribe( (resp: Contrato[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.contrato = resp;
          this.cargando = false;
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
    else if (i === 'Equipo') {
      this.equipo = new Array<Equipo>();
      this.equipoS.consultaEquipo().subscribe( (resp: Equipo[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.equipo = resp;
          this.cargando = false;
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
    else if (i === 'Propiedad') {
      this.propiedad = new Array<Propiedad>();
      this.propiedadS.consultaPropiedad().subscribe( (resp: Propiedad[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.propiedad = resp;
          this.cargando = false;
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
    else if (i === 'Soporte') {
      this.soporte = new Array<Soporte>();
      this.soporteS.consultaSoporte().subscribe( (resp: Soporte[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.soporte = resp;
          this.cargando = false;
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
    else if (i === 'Informes') {
      this.informes = new Array<Informes>();
      this.informesS.consultaInformes().subscribe( (resp: Informes[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.informes = resp;
          this.cargando = false;
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
    else if (i === 'Imágenes promocionales') {
      this.slides = new Array<SlideImg>();
      this.slideImgService.consultaSlideImg().subscribe( (resp: SlideImg[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.slides = resp;
          this.cargando = false;
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
    else if (i === 'Antenas') {
      this.antena = new Array<Antena>();
      this.antenaS.consultarAntena().subscribe( (resp: Antena[]) => {
        resp.length === 0 ? this.length = true : this.length = false;
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.antena = resp;
          this.cargando = false;
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

  // METODO PARA ELIMINAR REGISTRO PERMANENTEMENTE
  delete(id){
    Swal.fire({
      title: 'Confirmación',
      text: '¿Esta seguro de eliminar permanetemente el registro?',
      icon: 'warning',
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
          text: 'Realizando proceso...',
          icon: 'info',
          allowOutsideClick: false,
          });
        Swal.showLoading();
        switch (this.seleccion) {
          case 'Antenas':
            this.antenaS.bajaAntena(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'La antena fue eliminada con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.antenaS.consultarAntena().subscribe( (arr: Antena[]) => {
                  if (arr) {
                    this.antena = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Ciudad':
            this.ciudadS.bajaCiudad(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'La ciudad fue eliminada con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.ciudadS.consultaCiudad().subscribe( (arr: Ciudad[]) => {
                  if (arr) {
                    this.ciudad = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Código postal':
            this.codigoS.bajaCodigo(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El código postal fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.codigoS.consultaCodigo().subscribe( (arr: CodigoPostal[]) => {
                  if (arr) {
                    this.codigo = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Colonia':
            this.coloniaS.bajaColonia(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'La colonia fue eliminada con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.coloniaS.consultaColonia().subscribe( (arr: Colonia[]) => {
                  if (arr) {
                    this.colonia = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Contrato':
            this.contratoS.bajaContrato(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El contrato fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.contratoS.consultaContrato().subscribe( (arr: Contrato[]) => {
                  if (arr) {
                    this.contrato = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Equipo':
            this.equipoS.bajaEquipo(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El equipo fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.equipoS.consultaEquipo().subscribe( (arr: Equipo[]) => {
                  if (arr) {
                    this.equipo = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Estado':
            this.estadoS.bajaEstado(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El estado fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.estadoS.consultaEstado().subscribe( (arr: Estado[]) => {
                  if (arr) {
                    this.estado = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Estatus':
            this.estatusS.bajaEstatus(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El estatus fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.estatusS.consultaEstatus().subscribe( (arr: Estatus[]) => {
                  if (arr) {
                    this.estatus = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Informes':
            this.informesS.bajaInformes(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El informe fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.informesS.consultaInformes().subscribe( (arr: Informes[]) => {
                  if (arr) {
                    this.informes = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Paquete':
            this.paqueteS.bajaPaquete(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El paquete fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.paqueteS.consultaPaquete().subscribe( (arr: Paquete[]) => {
                  if (arr) {
                    this.paquete = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Imágenes promocionales':
            this.slideImgService.bajaSlideImg(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El slide fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.slideImgService.consultaSlideImg().subscribe( (arr: SlideImg[]) => {
                  if (arr) {
                    this.slides = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Propiedad':
            this.propiedadS.bajaPropiedad(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'La propiedad fue eliminada con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.propiedadS.consultaPropiedad().subscribe( (arr: Propiedad[]) => {
                  if (arr) {
                    this.propiedad = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Rol':
            this.rolS.bajaRol(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El rol fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.rolS.consultaRol().subscribe( (arr: Rol[]) => {
                  if (arr) {
                    this.rol = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Soporte':
            this.soporteS.bajaSoporte(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El soporte fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.soporteS.consultaSoporte().subscribe( (arr: Soporte[]) => {
                  if (arr) {
                    this.soporte = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;

          case 'Usuario':
            this.usuarioS.bajaUsuario(id).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El usuario fue eliminado con exito',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 3000
                });
                this.usuarioS.consultaUsuario().subscribe( (arr: Usuario[]) => {
                  if (arr) {
                    this.usuario = arr;
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
            }, (e: any) => {
              Swal.fire({
                title: 'ERROR',
                text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000
              });
            });
            break;
        }
      }
    });
  }

  // METODO PARA DESACTIVAR REGISTRO
  deshabilitar(id, i) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Esta seguro de deshabilitar el registro?',
      icon: 'warning',
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
        text: 'Realizando proceso...',
        icon: 'info',
        allowOutsideClick: false,
        });
      Swal.showLoading();
      if (this.seleccion === 'Ciudad') {
        this.ciudadS.modificarCiudad(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'La ciudad fue deshabilitada con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Código postal') {
          this.codigoS.modificarCodigo(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'El código postal fue deshabilitado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Colonia') {
          this.coloniaS.modificarColonia(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'La colonia fue deshabilitada con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Contrato') {
          this.contratoS.modificarContrato(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'El contrato fue deshabilitado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Equipo') {
        this.equipoS.modificarEquipo(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El equipo fue deshabilitado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Estado') {
          this.estadoS.modificarEstado(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'El estado fue deshabilitado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Estatus') {
        this.estatusS.modificarEstatus(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El estatus fue deshabilitado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Paquete') {
        this.paqueteS.modificarPaquete(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El paquete fue deshabilitado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Rol') {
        this.rolS.modificarRol(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El rol fue deshabilitado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Usuario') {
        this.usuarioS.modificarUsuario(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El estado fue deshabilitado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Soporte') {
        this.soporteS.modificarSoporte(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El reporte fue deshabilitado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Informes') {
        this.informesS.modificarInformes(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El informe fue deshabilitado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Antenas') {
        this.antenaS.modificarAntena(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'La antena fue deshabilitada con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
    }
  });
  }

  // METODO PARA ACTIVAR REGISTRO
  restoreRegistro(id, i?) {
    Swal.fire({
      title: 'Confirmación',
      text: 'Esta seguro de restaurar el registro',
      icon: 'warning',
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
        text: 'Realizando proceso...',
        icon: 'info',
        allowOutsideClick: false,
        });
      Swal.showLoading();
      if (this.seleccion === 'Ciudad') {
        this.ciudadS.modificarCiudad(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'La ciudad fue restaurada con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Código postal') {
          this.codigoS.modificarCodigo(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'El código postal fue restaurado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Colonia') {
          this.coloniaS.modificarColonia(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'La colonia fue restaurado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Contrato') {
          this.contratoS.modificarContrato(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'El contrato fue restaurado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Equipo') {
        this.equipoS.modificarEquipo(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
                title: 'Exito',
                text: 'El equipo fue restaurado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
            });
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
          });
      }
      else if (this.seleccion === 'Estado') {
          this.estadoS.modificarEstado(id, i).subscribe( resp => {
            if (resp) {
              Swal.fire({
                title: 'Exito',
                text: 'El estado fue restaurado con exito',
                icon: 'success',
                showConfirmButton: false,
                timer: 3000
              });
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
          });
      }
      else if (this.seleccion === 'Estatus') {
        this.estatusS.modificarEstatus(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El estatus fue restaurado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Paquete') {
        this.paqueteS.modificarPaquete(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El paquete fue restaurado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Rol') {
        this.rolS.modificarRol(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El rol fue restaurado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Usuario') {
        this.usuarioS.modificarUsuario(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El estado fue restaurado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Soporte') {
        this.soporteS.modificarSoporte(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El reporte fue restaurado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Informes') {
        this.informesS.modificarInformes(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El informe fue restaurado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
      else if (this.seleccion === 'Antenas') {
        this.antenaS.modificarAntena(id, i).subscribe( resp => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'La antena fue restaurado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            });
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
        });
      }
    }
  });
  }

  // antenderReporte(x?, y?, z?){
  //   Swal.fire({
  //     title: 'Confirmación',
  //     text: 'Deseas atender al cliente ' + x + ' ' + y,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si',
  //     cancelButtonText: 'No',
  //     allowOutsideClick: false
  //   }).then( (resp) => {
  //     if (resp) {
  //       this.soporteS.verSoporte(z).subscribe( (resp: Soporte) => {
  //         if (resp) {
  //           resp.idTecnico = this.session.idUsuario;
  //           this.estatusS.consultaUnicaEstatus('en proceso').subscribe( (e: Estatus) => {
  //             if (e) {
  //               resp.idEstatus = e.idEstatus;
  //               this.soporteS.atenderSoporte(resp).subscribe( resp => {
  //                 if (resp) {
  //                   Swal.fire({
  //                     title: 'Éxito',
  //                     text: 'Has aceptado al solicitud',
  //                     icon: 'success'
  //                   });
  //                 }
  //                 else {
  //                   Swal.fire({
  //                     title: 'Error',
  //                     text: 'No disponible, recarga la página',
  //                     icon: 'error'
  //                   });
  //                 }
  //               });
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  // }

  /* METODO PARA AGREGAR O MODIFICAR REPORTE*/
  asignarReporte(data: NgForm) {
    if (data.invalid) {
      Swal.fire({
        title: 'Parce que te falta algo 😢',
        icon: 'error',
        text: 'Verifique sus datos'
      });
    }
    else {
      if (this.reporte.idSoporte === null) {
        Swal.fire({
          title: 'Confirmación',
          text: '¿Esta seguro de confirmar el reporte?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Espere',
              text: 'Realizando proceso...',
              icon: 'info',
              allowOutsideClick: false,
              });
            Swal.showLoading();
            this.soporteS.altaSoporte(this.reporte).subscribe(resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'El reporte fue guardado con exito',
                  icon: 'success',
                  timer: 4000,
                  showConfirmButton: false
                });
                this.asignarRep = false;
                this.verReportes();
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
      else {
        Swal.fire({
          title: 'Confirmación',
          text: '¿Esta seguro de confirmar el reporte?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Espere',
              text: 'Realizando proceso...',
              icon: 'info',
              allowOutsideClick: false,
              });
            Swal.showLoading();
            this.soporteS.modificarSoporte(this.reporte).subscribe( resp => {
              if (resp) {
                Swal.fire({
                  title: 'Exito',
                  text: 'Se ha actualizado el reporte',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 4000
                });
                this.asignarRep = false;
                this.verReportes();
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
  }

  // METODO PARA VER UN REPORTE EN ESPECIFICO
  verReporte(id) {
    this.asignarRep = true;
    this.soporteS.verSoporte(id).subscribe( (resp: Soporte) => {
      if (resp) {
        this.reporte = resp;
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
    this.verForm();
  }

  // METODO PARA VER TODOS LOS REPORTES QUE NO ESTEN ATENDIDOS
  verReportes() {
    this.asignarRep = false;
    this.cargando = true;
    this.soporteS.consultaSopT().subscribe( (resp: Soporte[]) => {
      resp.length === 0 ? this.length = true : this.length = false;
      if (resp) {
        this.soporte = resp;
        this.cargando = false;
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

  // METODO PARA BUSCAR REGISTRO(S) EN UNA TABLA
  buscarElemento() {
    const elemento = document.getElementById('busqueda') as HTMLInputElement;

    if (elemento.value === '') {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese algun dato para poder buscar',
        icon: 'error',
        timer: 4000,
        showConfirmButton: false
      });
    }
    else {
      switch (this.seleccion) {
      case 'Ciudad':
        this.ciudadS.buscarCiudad(elemento.value).subscribe( (resp: Ciudad[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.ciudad = new Array<Ciudad>();
            this.ciudad = resp;
            this.cargando = false;
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
        break;
      case 'Código postal':
        this.codigoS.buscarCP(elemento.value).subscribe( (resp: CodigoPostal[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.codigo = new Array<CodigoPostal>();
            this.codigo = resp;
            this.cargando = false;
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
        break;
      case 'Colonia':
        this.coloniaS.buscarColonia(elemento.value).subscribe( (resp: Colonia[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.colonia = new Array<Colonia>();
            this.colonia = resp;
            this.cargando = false;
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
        break;
      case 'Contrato':
        this.contratoS.buscarContrato(elemento.value).subscribe( (resp: Contrato[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.contrato = new Array<Contrato>();
            this.contrato = resp;
            this.cargando = false;
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
        break;
      case 'Equipo':
        this.equipoS.buscarEquipo(elemento.value).subscribe( (resp: Equipo[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.equipo = new Array<Equipo>();
            this.equipo = resp;
            this.cargando = false;
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
        break;
      case 'Estado':
        this.estadoS.buscarEstado(elemento.value).subscribe( (resp: Estado[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.estado = new Array<Estado>();
            this.estado = resp;
            this.cargando = false;
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
        break;
      case 'Estatus':
        this.estatusS.buscarEstatus(elemento.value).subscribe( (resp: Estatus[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.estatus = new Array<Estatus>();
            this.estatus = resp;
            this.cargando = false;
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
        break;
      case 'Paquete':
        this.paqueteS.buscarPaquete(elemento.value).subscribe( (resp: Paquete[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.paquete = new Array<Paquete>();
            this.paquete = resp;
            this.cargando = false;
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
        break;
      case 'Propiedad':
        this.propiedadS.buscarPropiedad(elemento.value).subscribe( (resp: Propiedad[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.propiedad = new Array<Propiedad>();
            this.propiedad = resp;
            this.cargando = false;
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
        break;
      case 'Rol':
        this.rolS.buscarRol(elemento.value).subscribe( (resp: Rol[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.rol = new Array<Rol>();
            this.rol = resp;
            this.cargando = false;
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
        break;
      case 'Usuario':
        this.usuarioS.buscarUsuario(elemento.value).subscribe( (resp: Usuario[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.usuario = new Array<Usuario>();
            this.usuario = resp;
            this.cargando = false;
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
        break;
      case 'Soporte':
        this.soporteS.buscarSoporte(elemento.value).subscribe( (resp: Soporte[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.soporte = new Array<Soporte>();
            this.soporte = resp;
            this.cargando = false;
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
        break;
      case 'Informes':
        this.informesS.buscarInformes(elemento.value).subscribe( (resp: Informes[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.informes = new Array<Informes>();
            this.informes = resp;
            this.cargando = false;
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
        break;
      case 'Antenas':
        this.antenaS.buscarAntena(elemento.value).subscribe( (resp: Antena[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.antena = new Array<Antena>();
            this.antena = resp;
            this.cargando = false;
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
        break;
      case 'Imágenes promocionales':
        this.slideImgService.buscarSlideImg(elemento.value).subscribe( (resp: SlideImg[]) => {
          resp.length === 0 ? this.length = true : this.length = false;
          if (resp) {
            this.cargando = true;
            this.slides = new Array<SlideImg>();
            this.slides = resp;
            this.cargando = false;
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
        break;
    }
    }
  }

  // METODO PARA VOLVER A CARGAR TABLA DESPUES DE BUSCAR
  reestablecerTabla(i) {
    if (i.data === null) {
      this.change(this.seleccion);
    }
  }

  // METODO PARA VER EL FORMULARIO DE AGREGAR O MODIFICAR REPORTE
  verForm() {
    this.asignarRep = true;
    this.reporte = new Soporte();

    this.usuarioS.verTecnico().subscribe((resp: Usuario[]) => {
      if (resp) {
        this.usuario = resp;
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
    this.estatusS.consultaEstatus().subscribe( (resp: Estatus[]) => {
      if (resp) {
        this.estatus = resp;
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
    this.contratoS.consultaContrato().subscribe( (resp: Contrato[]) => {
      if (resp) {
        this.cliente = new Array<Contrato>();
        this.cliente = resp;
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

  // METODO PARA CANCELAR REPORTE
  cancelarReporte(i: Soporte) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Desea cancelar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere',
          text: 'Realizando proceso...',
          icon: 'info',
          allowOutsideClick: false,
          });
        Swal.showLoading();
        this.soporteS.modificarSoporte(i, true).subscribe((resp) => {
          if (resp) {
            Swal.fire({
              title: 'Exito',
              text: 'El reporte fue eliminado con exito',
              icon: 'success',
              showConfirmButton: false,
              timer: 4000
            });
            this.verReportes();
          }
        });
      }
    });
  }
}
