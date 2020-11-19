import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';
import { Rol } from 'src/app/models/rol.model';
import { Estatus } from '../../models/estatus.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Estado } from 'src/app/models/estado.model';
import { Ciudad } from '../../models/ciudad.model';
import { CodigoPostal } from '../../models/codigopostal.model';
import { Colonia } from '../../models/colonia.model';
import { Usuario } from '../../models/usuario.model';
import { Contrato } from '../../models/contrato.model';
import { Equipo } from '../../models/equipo.model';
import { Paquete } from '../../models/paquete.model';
import { PaqueteEquipo } from '../../models/paqueteequipo.model';
import { Propiedad } from '../../models/propiedad.model';
import { EstadoService } from '../../services/estado.service';
import { CiudadService } from '../../services/ciudad.service';
import { CodigopostalService } from '../../services/codigopostal.service';
import { UsuarioService } from '../../services/usuario.service';
import { ColoniaService } from '../../services/colonia.service';
import { ContratoService } from '../../services/contrato.service';
import { EquipoService } from '../../services/equipo.service';
import { PaqueteService } from '../../services/paquete.service';
import { PropiedadService } from '../../services/propiedad.service';
import { EstatusService } from '../../services/estatus.service';
import { Soporte } from 'src/app/models/soporte.model';
import { SoporteService } from '../../services/soporte.service';
import { Informes } from 'src/app/models/informes.model';
import { InformesService } from '../../services/informes.service';
import { SlideImg } from 'src/app/models/slideImg.model';
import { SlideImgService } from '../../services/slide-img.service';
import { Antena } from '../../models/antena.model';
import { AntenaService } from '../../services/antena.service';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html'
})
export class ElementoComponent implements OnInit, AfterViewInit {
  // id del navegador
  id;
  id2;

  imagenL = 'Seleccionar imágen (Solo .PNG)';
  // Objetos para los valores del dropbox a visualizar
  i1 = 'Seleccionar estado...';
  i2 = 'Seleccionar ciudad...';
  i3 = 'Seleccionar código postal...';
  i4 = 'Seleccionar colonia';
  i5 = 'Seleccionar rol...';

  // Arreglos para CRUD
  rol: Rol;
  usuario: Usuario;
  estatus: Estatus;
  estado: Estado;
  ciudad: Ciudad;
  codigoP: CodigoPostal;
  colonia: Colonia;
  contrato: Contrato;
  equipo: Equipo;
  paquete: Paquete;
  paqueteEquipo: PaqueteEquipo;
  propiedad: Propiedad;
  soporte: Soporte;
  informes: Informes;
  slides: SlideImg;
  antena: Antena;

  // arreglos para los dropbox y/o tablas
  e: Estado[];
  es: Estatus[];
  eq: Equipo[];
  equipos: Equipo[]; // arreglo para guardar los equipos a agregar o eliminar
  u: Usuario[];
  p: Paquete[];
  c: Ciudad[];
  cp: CodigoPostal[];
  co: Colonia[];
  r: Rol[];
  t: Usuario[];
  con: Contrato[];

  propi: Propiedad[];

  constructor(
    private coloniaS: ColoniaService,
    private contratoS: ContratoService,
    private equipoS: EquipoService,
    private paqueteS: PaqueteService,
    private propiedadS: PropiedadService,
    private rolS: RolService,
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private usuarioS: UsuarioService,
    private codigoS: CodigopostalService,
    private estatusS: EstatusService,
    private router: Router,
    private route: ActivatedRoute,
    private soporteS: SoporteService,
    private informesS: InformesService,
    private slideImgS: SlideImgService,
    private antenaS: AntenaService) { }

  // Metodo para cargar los dropbox dependiendo el formulario
  ngAfterViewInit(): void {
    if ((this.id === 'Ciudad' || this.id === 'Código postal' || this.id === 'Colonia' || this.id === 'Usuario') && this.id2 === 'new') {
      this.r = new Array<Rol>();
      this.e = new Array<Estado>();
      this.rolS.consultaRol().subscribe( (resp: Rol[]) => {
        this.r = resp;
      }, (e: any) => {
        Swal.fire({
          title: 'ERROR',
          text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      });
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
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
    else if (this.id === 'Usuario' && this.id2 !== 'new') {
      this.r = new Array<Rol>();
      this.e = new Array<Estado>();
      this.c = new Array<Ciudad>();
      this.cp = new Array<CodigoPostal>();
      this.co = new Array<Colonia>();
      this.rolS.consultaRol().subscribe( (resp: Rol[]) => {
        this.r = resp;
      });
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.ciudadS.consultaUnica(this.usuario.Estado.idEstado).subscribe( (resp: Ciudad[]) => {
        this.c = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.codigoS.consultaUnica(this.usuario.Ciudad.idCiudad).subscribe( (resp: CodigoPostal[]) => {
          this.cp = resp;
          // tslint:disable-next-line: no-shadowed-variable
          this.coloniaS.consultaUnica(this.usuario.CP.idCP).subscribe( (resp: Colonia[]) => {
            this.co = resp;
          }, (e: any) => {
            Swal.fire({
              title: 'ERROR',
              text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
              icon: 'error',
              showConfirmButton: false,
              timer: 3000
            });
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
      }, (e: any) => {
        Swal.fire({
          title: 'ERROR',
          text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
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
    }
    else if (this.id === 'Código postal' && this.id2 !== 'new') {
      this.e = new Array<Estado>();
      this.c = new Array<Ciudad>();
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.ciudadS.consultaUnica(this.codigoP.Ciudad.idEstado).subscribe( (resp: Ciudad[]) => {
          this.c = resp;
        }, (e: any) => {
          Swal.fire({
            title: 'ERROR',
            text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
          });
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
    }
    else if (this.id === 'Colonia' && this.id !== 'new') {
      this.e = new Array<Estado>();
      this.c = new Array<Ciudad>();
      this.cp = new Array<CodigoPostal>();
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.ciudadS.consultaUnica(this.colonia.CP.Ciudad.idEstado).subscribe( (resp: Ciudad[]) => {
          this.c = resp;
          // tslint:disable-next-line: no-shadowed-variable
          this.codigoS.consultaUnica(this.colonia.CP.Ciudad.idCiudad).subscribe( (resp: CodigoPostal[]) => {
            this.cp = resp;
          }, (e: any) => {
            Swal.fire({
              title: 'ERROR',
              text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
              icon: 'error',
              showConfirmButton: false,
              timer: 3000
            });
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
    else if (this.id === 'Contrato') {
      this.p = new Array<Paquete>();
      this.es = new Array<Estatus>();
      this.u = new Array<Usuario>();
      this.paqueteS.consultaUnica().subscribe( (resp: Paquete[]) => {
        if (resp !== null) {
          this.p = resp;
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
          this.es = resp;
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
      this.usuarioS.verCliente().subscribe( (resp: Usuario[]) => {
        if (resp) {
          this.u = resp;
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
    else if (this.id === 'Ciudad') {
      this.e = new Array<Estado>();
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
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
    else if (this.id === 'Soporte') {
      this.con = new Array<Contrato>();
      this.t = new Array<Usuario>();
      this.es = new Array<Estatus>();
      this.contratoS.consultaContrato().subscribe( (resp: Contrato[]) => {
        if (resp) {
          this.con = resp;
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
      this.usuarioS.verTecnico().subscribe( (resp: Usuario[]) => {
        if (resp) {
          this.t = resp;
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
          this.es = resp;
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
    else if (this.id === 'Propiedad' && this.id2 === 'new') {
      this.equipoS.consultaEquipo().subscribe( (resp: Equipo[]) => {
        if (resp) {
          this.eq = new Array<Equipo>();
          this.eq = resp;
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
      this.usuarioS.verTecnico().subscribe( (resp: Usuario[]) => {
        if (resp) {
          this.t = new Array<Usuario>();
          this.t = resp;
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
    else if (this.id === 'Antenas' && this.id2 !== 'new') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.ciudadS.consultaUnica(this.antena.idEstado).subscribe( (resp: Ciudad[]) => {
        this.c = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.codigoS.consultaUnica(this.antena.idCiudad).subscribe( (resp: CodigoPostal[]) => {
          this.cp = resp;
          // tslint:disable-next-line: no-shadowed-variable
          this.coloniaS.consultaUnica(this.antena.idCP).subscribe( (resp: Colonia[]) => {
            this.co = resp;
          }, (e: any) => {
            Swal.fire({
              title: 'ERROR',
              text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
              icon: 'error',
              showConfirmButton: false,
              timer: 3000
            });
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
      }, (e: any) => {
        Swal.fire({
          title: 'ERROR',
          text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
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
    }
    else if (this.id === 'Antenas' && this.id2 === 'new') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        if (resp) {
          this.e = resp;
        }
      });
    }
  }

  ngOnInit(): void {
    // si no esxiste alguna sesion iniciada
    if (!localStorage.getItem('accessToken') && !localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/']);
    }
    else { // si existe...
      this.id = this.route.snapshot.paramMap.get('id');
      this.id2 = this.route.snapshot.paramMap.get('id2');

      // si no se envia una tabla valida
      if (this.id === 'Seleccione tabla...') {
        this.router.navigate(['/inicio']); // redirecciona al inicio
      }
      else {
      // Instanciamos la accion ya sea para agregar o modificar
      if (this.id2 !== 'new') { // si no es nuevo
        if (this.id === 'Ciudad') {
          this.ciudad = new Ciudad();
          this.ciudad.idCiudad = this.id2;
          this.ciudadS.verCiudad(this.id2).subscribe( (resp: Ciudad) => {
          if (resp) {
            this.ciudad = resp;
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
        else if (this.id === 'Código postal') {
          this.codigoP = new CodigoPostal();
          this.codigoP.idCP = this.id2;
          this.codigoS.verCP(this.id2).subscribe( (resp: CodigoPostal) => {
          if (resp) {
            this.codigoP = resp;
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
        else if (this.id === 'Colonia') {
          this.colonia = new Colonia();
          this.colonia.idColonia = this.id2;
          this.coloniaS.verColonia(this.id2).subscribe( (resp: Colonia) => {
          if (resp) {
            this.colonia = resp;
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
        else if (this.id === 'Contrato') {
          this.contrato = new Contrato();
          this.contrato.idContrato = this.id2;
          this.contratoS.verContrato(this.id2).subscribe( (resp: Contrato) => {
          if (resp) {
            this.contrato = resp;
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
        else if (this.id === 'Equipo') {
          this.equipo = new Equipo();
          this.equipo.idEquipo = this.id2;
          this.equipoS.verEquipo(this.id2).subscribe( (resp: Equipo) => {
          if (resp) {
            this.equipo = resp;
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
        else if (this.id === 'Estado') {
          this.estado = new Estado();
          this.estado.idEstado = this.id2;
          this.estadoS.verEstado(this.id2).subscribe( (resp: Estado) => {
          if (resp) {
            this.estado = resp;
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
        else if (this.id === 'Estatus') {
          this.estatus = new Estatus();
          this.estatus.idEstatus = this.id2;
          this.estatusS.verEstatus(this.id2).subscribe( (resp: Estatus) => {
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
        }
        else if (this.id === 'Paquete') {
          this.paquete = new Paquete();
          this.paquete.idPaquete = this.id2;
          this.paqueteS.verPaquete(this.id2).subscribe( (resp: Paquete) => {
          if (resp) {
            this.paquete = resp;
            this.imagenL = this.paquete.nombre + '.png';
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
        else if (this.id === 'PaqueteEquipo') {
        }
        else if (this.id === 'Propiedad') {
          this.propiedad = new Propiedad();
          this.propiedad.idUsuario = this.id2;

          this.equipoS.consultaEquipo().subscribe( (resp: Equipo[]) => {
            if (resp) {
              this.eq = resp;
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

          this.propiedadS.verPropiedad(this.id2).subscribe( (resp: Propiedad[]) => {
            if (resp) {
              this.propi = resp;
              this.propiedad.Usuario = this.propi[0].Usuario;
              this.equipos = new Array<Equipo>();
              // traer los equipos que tiene en su poder
              for (let index = 0; index < this.propi.length; index++) {
                this.equipos[index] = this.propi[index].Equipo;
              }
              // modificar los equipos que tiene en su poder de todos los disponibles
              // tslint:disable-next-line: prefer-for-of
              for (let index = 0; index < this.eq.length; index++) {
                const array = this.equipos.find((m) => m.idEquipo === this.eq[index].idEquipo);
                if (!array) {
                  this.eq[index].activo = false;
                }
              }
            }
          });
        }
        else if (this.id === 'Rol') {
          this.rol = new Rol();
          this.rol.idRol = this.id2;
          this.rolS.verRol(this.id2).subscribe( (resp: Rol) => {
          if (resp) {
            this.rol = resp;
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
        else if (this.id === 'Usuario') {
          this.usuario = new Usuario();
          this.usuario.idUsuario = this.id2;
          this.usuarioS.verUsuario(this.id2).subscribe( (resp: Usuario) => {
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
        }
        else if (this.id === 'Soporte') {
          this.soporte = new Soporte();
          this.soporte.idSoporte = this.id2;
          this.soporteS.verSoporte(this.id2).subscribe( (resp: Soporte) => {
          if (resp) {
            this.soporte = resp;
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
        else if (this.id === 'Informes') {
          this.informes = new Informes();
          this.informes.idInformes = this.id2;
          this.informesS.verInformes(this.id2).subscribe( (resp: Informes) => {
            if (resp) {
              this.informes = resp;
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
        else if (this.id === 'Imágenes promocionales') {
          this.slides = new SlideImg();
          this.slides.idSlide = this.id2;
          this.slideImgS.verSlideImg(this.id2).subscribe( (resp: SlideImg) => {
            if (resp) {
              this.slides = resp;
              this.imagenL = this.slides.nombre + '.png';
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
        else if (this.id === 'Antenas') {
          this.antena = new Antena();
          this.antena.idAntena = this.id2;

          this.antenaS.verAntena(this.id2).subscribe( (resp: Antena) => {
            if (resp) {
              this.antena = resp;
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
      else { // si es nuevo...
        if (this.id === 'Ciudad') {
          this.ciudad = new Ciudad();
        }
        else if (this.id === 'Código postal') {
          this.codigoP = new CodigoPostal();
        }
        else if (this.id === 'Colonia') {
          this.colonia = new Colonia();
        }
        else if (this.id === 'Contrato') {
          this.contrato = new Contrato();
        }
        else if (this.id === 'Equipo') {
          this.equipo = new Equipo();
        }
        else if (this.id === 'Estado') {
          this.estado = new Estado();
        }
        else if (this.id === 'Estatus') {
          this.estatus = new Estatus();
        }
        else if (this.id === 'Paquete') {
          this.paquete = new Paquete();
        }
        else if (this.id === 'PaqueteEquipo') {
        }
        else if (this.id === 'Propiedad') {
          this.propiedad = new Propiedad();
        }
        else if (this.id === 'Rol') {
          this.rol = new Rol();
        }
        else if (this.id === 'Usuario') {
          this.usuario = new Usuario();
        }
        else if (this.id === 'Soporte') {
          this.soporte = new Soporte();
        }
        else if (this.id === 'Informes') {
          this.informes = new Informes();
        }
        else if (this.id === 'Imágenes promocionales') {
          this.slides = new SlideImg();
        }
        else if (this.id === 'Antenas') {
          this.antena = new Antena();
        }
      }
    }
    }
  }

  // Metodo para dar altas y modificaciones
  alta(data: NgForm) {
    // si falta por llenar algun campo en la forma
    if ( data.invalid ) {
      // mostramos el mensaje de error
      Swal.fire({
        title: 'Parce que te falta algo 😢',
        icon: 'error',
        text: 'Verifique sus datos'
      });
      return;
    }
    else{
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

          // Definimos que queremos modificar o agregar
          if (this.id === 'Ciudad') {
            this.ciudad.ciudad1 = this.ciudad.ciudad1.replace(/\b\w/g, l => l.toUpperCase());
            if (this.ciudad.idCiudad) {
              this.ciudadS.modificarCiudad(this.ciudad).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La ciudad fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'La ciudad ya existe',
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
            else {
              this.ciudadS.altaCiudad(this.ciudad).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La ciudad fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'La ciudad ya existe',
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
          }
          else if (this.id === 'Código postal') {
            if (this.codigoP.idCP) {
              this.codigoS.modificarCodigo(this.codigoP).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El código postal fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El código postal ya existe',
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
            else {
              this.codigoS.altaCodigo(this.codigoP).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El código postal fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El código postal ya existe',
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
          }
          else if (this.id === 'Colonia') {
            this.colonia.colonia1 = this.colonia.colonia1.replace(/\b\w/g, l => l.toUpperCase());
            if (this.colonia.idColonia) {
              this.coloniaS.modificarColonia(this.colonia).subscribe( resp => {
                if (resp === true) {
                  if (resp === true) {
                    Swal.fire({
                      title: 'Exito',
                      text: 'La colonia fue actualizada con exito',
                      icon: 'success'
                    });
                    this.router.navigate(['/inicio']);
                  }
                  else {
                    Swal.fire({
                      title: 'Error',
                      text: 'La colonia ya existe',
                      icon: 'error'
                    });
                  }
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
              this.coloniaS.altaColonia(this.colonia).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La colonia fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'La colonia ya existe',
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
          }
          else if (this.id === 'Contrato') {
            if (this.contrato.idContrato) {
              this.contratoS.modificarContrato(this.contrato).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El contrato fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El contrato ya existe',
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
            else {
              this.contratoS.altaContrato(this.contrato).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El contrato fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El contrato ya existe',
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
          }
          else if (this.id === 'Equipo') {
            if (this.equipo.idEquipo) {
              this.equipo.equipo1 = this.equipo.equipo1.replace(/\b\w/g, l => l.toUpperCase());
              this.equipoS.modificarEquipo(this.equipo).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El equipo fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El equipo ya existe',
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
            else {
              this.equipoS.altaEquipo(this.equipo).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El equipo fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                } else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El equipo ya existe',
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
          }
          else if (this.id === 'Estado') {
            this.estado.estado1 = this.estado.estado1.replace(/\b\w/g, l => l.toUpperCase());
            if (this.estado.idEstado) {
              this.estadoS.modificarEstado(this.estado).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El estado fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                } else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El estado ya existe',
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
            else {
              this.estadoS.altaEstado(this.estado).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El estado fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El estado ya existe',
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
          }
          else if (this.id === 'Estatus') {
            if (this.estatus.idEstatus) {
              this.estatusS.modificarEstatus(this.estatus).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El estatus fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El estatus ya existe',
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
            } else {
              this.estatusS.altaEstatus(this.estatus).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El estatus fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El estatus ya existe',
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
          }
          else if (this.id === 'Paquete') {
            this.paquete.descripcion = this.paquete.descripcion.replace(/\b\w/g, l => l.toUpperCase());
            this.paquete.nombre = this.paquete.nombre.replace(/\b\w/g, l => l.toUpperCase());
            if (this.paquete.idPaquete) {
              this.paqueteS.modificarPaquete(this.paquete).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El paquete fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El paquete ya existe',
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
            else {
              this.paqueteS.altaPaquete(this.paquete).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El paquete fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El paquete ya existe',
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
          }
          else if (this.id === 'PaqueteEquipo') {}
          else if (this.id === 'Propiedad') {
            if (this.equipos.length === 0) {
              Swal.fire({
                title: 'Error',
                text: 'Debes seleccionar al menos un equipo para poder continuar',
                icon: 'error'
              });
            }
            else {
              if (this.propiedad.idUsuario) {
                this.propiedadS.modificarPropiedad(this.propiedad.idUsuario).subscribe( resp => {
                  if (resp === true) {
                    this.addPropiedad(0);
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
                this.addPropiedad(0);
              }
            }
          }
          else if (this.id === 'Rol') {
            if (this.rol.idRol) {
              this.rolS.modificarRol(this.rol).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El rol fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El rol ya existe',
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
            else {
              this.rolS.altaRol(this.rol).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El rol fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El rol ya existe',
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
          }
          else if (this.id === 'Usuario') {
            this.usuario.nombre = this.usuario.nombre.replace(/\b\w/g, l => l.toUpperCase());
            this.usuario.apellido = this.usuario.apellido.replace(/\b\w/g, l => l.toUpperCase());
            this.usuario.calle = this.usuario.calle.replace(/\b\w/g, l => l.toUpperCase());
            if (this.usuario.idUsuario) {
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
              }, (e: any) => {
                Swal.fire({
                  title: 'ERROR',
                  text: 'Error de conexión, vuelva a cargar la página o intente mas tarde',
                  icon: 'error',
                  showConfirmButton: false,
                  timer: 3000
                });
              });
            } else {
              this.usuarioS.altaUsuario(this.usuario).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El usuario fue guardado con exito',
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
          else if (this.id === 'Soporte') {
            this.soporte.problema = this.soporte.problema.replace(/\b\w/g, l => l.toUpperCase());
            if (this.soporte.idSoporte) {
              this.soporteS.modificarSoporte(this.soporte).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El reporte fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El reporte ya existe',
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
            else {
              this.soporteS.altaSoporte(this.soporte).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El reporte fue guardado con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El reporte ya existe',
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
          }
          else if (this.id === 'Informes') {
            this.informes.nombre = this.informes.nombre.replace(/\b\w/g, l => l.toUpperCase());
            if (this.informes.idInformes) {
              this.informesS.modificarInformes(this.informes).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El informe fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El informe ya existe',
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
            else {
              this.informesS.altaInformes(this.informes).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El informe fue guardado con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El informe ya existe',
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
          }
          else if (this.id === 'Imágenes promocionales') {
            if (this.slides.idSlide) {
              this.slideImgS.modificarSlideImg(this.slides).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El slide fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El slide ya existe',
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
            else {
              this.slideImgS.altaSlideImg(this.slides).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El slide fue guardado con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'El slide ya existe',
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
          }
          else if (this.id === 'Antenas') {
            if (this.antena.idAntena) {
              this.antenaS.modificarAntena(this.antena).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La antena fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'La antena ya existe',
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
            else {
              this.antenaS.altaAntena(this.antena).subscribe( resp => {
                if (resp) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La antena fue guardado con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'La antena ya existe',
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
          }
        }
      });
    }
  }

  // metodo recursivo que agrega equipos a la propiedad de un tecnico
  addPropiedad(id: number) {
    this.propiedad.idEquipo = this.equipos[id].idEquipo;
    this.propiedadS.altaPropiedad(this.propiedad).subscribe( resp => {
      if (resp) {
        id++;
        if (id < this.equipos.length) {
          this.addPropiedad(id);
        }
        else {
          Swal.fire({
            title: 'Exito',
            text: 'La propiedad fue agregada con exito',
            icon: 'success'
          });
          this.router.navigate(['/inicio']);
        }
      }
      else {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error inesperado',
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

  // obtener imagen en formato binario para guardar en base de datos
  verArchivo(e) {
    const image = e.target.files[0];
    this.imagenL = image.name;
    const reader = new FileReader();
    reader.onload = this.handleFile.bind(this);
    reader.readAsBinaryString(image);
  }

  // agregar imagen en arreglo especifico
  handleFile(event) {
    const binaryString = event.target.result;
    if (this.id === 'Paquete') {
      this.paquete.imagen = btoa(binaryString);
    }
    else if (this.id === 'Imágenes promocionales') {
      this.slides.imagen = btoa(binaryString);
    }
  }

  // Metodos para cambiar valores del combobox
    // Obtener ciudades del estado seleccionado
  cambio1(id?) {
    this.ciudadS.consultaUnica(id).subscribe( (resp: Ciudad[]) => {
      this.c = resp;
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
    // Obtener codigo postal de la ciudad seleccionada
  cambio2(id?) {
    this.codigoS.consultaUnica(id).subscribe( (resp: CodigoPostal[]) => {
      this.cp = resp;
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
    // Obtener colonias del codigo postal seleccionado
  cambio3(id?) {
    this.coloniaS.consultaUnica(id).subscribe( (resp: Colonia[]) => {
      this.co = resp;
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
    // guardamos los quipos que un tecnico tiene en su poder
  cambio4(value, array: Equipo) {
    // si se va a agregar un equipo
    if (value.currentTarget.checked) {
      this.equipos.push(array);
    }
    // si se va a eliminar un equipo
    else {
      for (let index = 0; index < this.equipos.length; index++) {
        if (this.equipos[index].idEquipo === array.idEquipo) {
          this.equipos.splice(index, 1);
        }
      }
    }
  }
}
