import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormBuilder, Validators, FormGroup } from '@angular/forms';
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

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html'
})
export class ElementoComponent implements OnInit, AfterViewInit {
  // id del navegador
  id;
  id2;

  // Objetos para los valores del dropbox a visualizar
  i1 = 'Seleccionar estado...';
  i2 = 'Seleccionar ciudad...';
  i3 = 'Seleccionar código postal...';
  i4 = 'Seleccionar colonia';
  i5 = 'Seleccionar rol...';

  // Arreglos para CRUD
  rol = new Rol();
  usuario = new Usuario();
  estatus = new Estatus();
  estado = new Estado();
  ciudad = new Ciudad();
  codigoP = new CodigoPostal();
  colonia = new Colonia();
  contrato = new Contrato();
  equipo = new Equipo();
  paquete = new Paquete();
  paqueteEquipo = new PaqueteEquipo();
  propiedad = new Propiedad();
  soporte = new Soporte();

  // arreglos para los dropbox
  e: Estado[];
  es: Estatus[];
  u: Usuario[];
  p: Paquete[];
  c: Ciudad[];
  cp: CodigoPostal[];
  co: Colonia[];
  r: Rol[];
  t: Usuario[];

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
    private soporteS: SoporteService) { }

  // Metodo para cargar los dropbox dependiendo el formulario
  ngAfterViewInit(): void {
    if ((this.id === 'Ciudad' || this.id === 'Código postal' || this.id === 'Colonia' || this.id === 'Usuario') && this.id2 === 'new') {
      this.rolS.consultaRol().subscribe( (resp: Rol[]) => {
        this.r = resp;
      });
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
      });
    }
    else if (this.id === 'Usuario' && this.id2 !== 'new') {
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
          });
        });
      });
      });
    }
    else if (this.id === 'Código postal' && this.id2 !== 'new') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.ciudadS.consultaUnica(this.codigoP.Ciudad.idEstado).subscribe( (resp: Ciudad[]) => {
          this.c = resp;
        });
      });
    }
    else if (this.id === 'Colonia' && this.id !== 'new') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
        // tslint:disable-next-line: no-shadowed-variable
        this.ciudadS.consultaUnica(this.colonia.CP.Ciudad.idEstado).subscribe( (resp: Ciudad[]) => {
          this.c = resp;
          // tslint:disable-next-line: no-shadowed-variable
          this.codigoS.consultaUnica(this.colonia.CP.Ciudad.idCiudad).subscribe( (resp: CodigoPostal[]) => {
            this.cp = resp;
          });
        });
      });
    }
    else if (this.id === 'Contrato') {
      this.paqueteS.consultaUnica().subscribe( (resp: Paquete[]) => {
        if (resp !== null) {
          this.p = resp;
        }
      });
      this.estatusS.consultaEstatus().subscribe( (resp: Estatus[]) => {
        if (resp) {
          this.es = resp;
        }
      });
      this.usuarioS.verCliente().subscribe( (resp: Usuario[]) => {
        if (resp) {
          this.u = resp;
        }
      });
    }
    else if (this.id === 'Ciudad') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
      });
    }
    else if (this.id === 'Soporte') {
      this.usuarioS.verCliente().subscribe( (resp: Usuario[]) => {
        if (resp) {
          this.u = resp;
        }
      });
      this.usuarioS.verTecnico().subscribe( (resp: Usuario[]) => {
        if (resp) {
          this.t = resp;
        }
      });
      this.estatusS.consultaEstatus().subscribe( (resp: Estatus[]) => {
        if (resp) {
          this.es = resp;
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
    else {
      this.id = this.route.snapshot.paramMap.get('id');
      this.id2 = this.route.snapshot.paramMap.get('id2');

      if (this.id === 'Seleccione tabla...') {
        this.router.navigate(['/inicio']);
      }
      else {
      // Definimos la accion ya sea para agregar o modificar
      if (this.id2 === 'new') { // si es nuevo
      // definimos los valores de los checkbox en la platilla ya que es nulo y evitamos errores
      // this.rol.activo = false;
      // this.estado.activo = false;
      // this.usuario.activo = false;
      // this.estatus.activo = false;
      // this.ciudad.activo = false;
      // this.codigoP.activo = false;
      // this.colonia.activo = false;
      // this.contrato.activo = false;
      // this.equipo.activo = false;
      // this.paquete.activo = false;
      this.init();
    }
    else { // si no es nuevo
      this.init();
      if (this.id === 'Ciudad') {
        this.ciudad.idCiudad = this.id2;
        this.ciudadS.verCiudad(this.id2).subscribe( (resp: Ciudad) => {
          if (resp) {
            this.ciudad = resp;
          }
        });
      }
      else if (this.id === 'Código postal') {
        this.codigoP.idCP = this.id2;
        this.codigoS.verCP(this.id2).subscribe( (resp: CodigoPostal) => {
          if (resp) {
            this.codigoP = resp;
          }
        });
      }
      else if (this.id === 'Colonia') {
        this.colonia.idColonia = this.id2;
        this.coloniaS.verColonia(this.id2).subscribe( (resp: Colonia) => {
          if (resp) {
            this.colonia = resp;
          }
        });
      }
      else if (this.id === 'Contrato') {
        this.contrato.idContrato = this.id2;
        this.contratoS.verContrato(this.id2).subscribe( (resp: Contrato) => {
          if (resp) {
            this.contrato = resp;
          }
        });
      }
      else if (this.id === 'Equipo') {
        this.equipo.idEquipo = this.id2;
        this.equipoS.verEquipo(this.id2).subscribe( (resp: Equipo) => {
          if (resp) {
            this.equipo = resp;
          }
        });
      }
      else if (this.id === 'Estado') {
        this.estado.idEstado = this.id2;
        this.estadoS.verEstado(this.id2).subscribe( (resp: Estado) => {
          if (resp) {
            this.estado = resp;
          }
        });
      }
      else if (this.id === 'Estatus') {
        this.estatus.idEstatus = this.id2;
        this.estatusS.verEstatus(this.id2).subscribe( (resp: Estatus) => {
          if (resp) {
            this.estatus = resp;
          }
        });
      }
      else if (this.id === 'Paquete') {
        this.paquete.idPaquete = this.id2;
        this.paqueteS.verPaquete(this.id2).subscribe( (resp: Paquete) => {
          if (resp) {
            this.paquete = resp;
          }
        });
      }
      else if (this.id === 'PaqueteEquipo') {
      }
      else if (this.id === 'Propiedad') {
        this.propiedad.idEquipo = this.id2;
        this.propiedadS.verPropiedad(this.id2).subscribe( (resp: Propiedad) => {
          if (resp) {
            this.propiedad = resp;
          }
        });
      }
      else if (this.id === 'Rol') {
        this.rol.idRol = this.id2;
        this.rolS.verRol(this.id2).subscribe( (resp: Rol) => {
          if (resp) {
            this.rol = resp;
          }
        });
      }
      else if (this.id === 'Usuario') {
        this.usuario.idUsuario = this.id2;
        this.usuarioS.verUsuario(this.id2).subscribe( (resp: Usuario) => {
          if (resp) {
            this.usuario = resp;
          }
        });
      }
      else if (this.id === 'Soporte') {
        this.soporte.idSoporte = this.id2;
        this.soporteS.verSoporte(this.id2).subscribe( (resp: Soporte) => {
          if (resp) {
            this.soporte = resp;
          }
        });
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
              });
            }
          }
          else if (this.id === 'Colonia') {
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
              });
            }
          }
          else if (this.id === 'Equipo') {
            if (this.equipo.idEquipo) {
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
              });
            }
          }
          else if (this.id === 'Estado') {
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
              });
            }
          }
          else if (this.id === 'Paquete') {
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
              });
            }
          }
          else if (this.id === 'PaqueteEquipo') {}
          else if (this.id === 'Propiedad') {
            if (this.propiedad.idPropiedad) {
              this.propiedadS.modificarPropiedad(this.propiedad).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La propiedad fue actualizada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'La propiedad ya existe',
                    icon: 'error'
                  });
                }
              });
            }
            else {
              this.propiedadS.altaPropiedad(this.propiedad).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La propiedad fue guardada con exito',
                    icon: 'success'
                  });
                  this.router.navigate(['/inicio']);
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'La propiedad ya existe',
                    icon: 'error'
                  });
                }
              });
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
              });
            }
          }
          else if (this.id === 'Usuario') {
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
              });
            }
          }
          else if (this.id === 'Soporte') {
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
              });
            }
          }
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

  // metodo para incializar arreglos
  init() {
    if (this.id === 'Ciudad') {
      this.ciudad = {
        idCiudad: null,
        ciudad1: null,
        idEstado: null,
        activo: null,
        Estado: new Estado(),
        CP: new CodigoPostal(),
        Usuario: new Usuario()
      };
    }
    else if (this.id === 'Código postal') {
      this.codigoP = {
        idCP: null,
        codigo: null,
        idCiudad: null,
        activo: null,
        Colonia: new Colonia(),
        Usuario: new Usuario(),
        Ciudad: new Ciudad()
      };
    }
    else if (this.id === 'Colonia') {
      this.colonia = {
        idColonia: null,
        colonia1: null,
        idCP: null,
        activo: null,
        CP: new CodigoPostal(),
        Usuario: new Usuario()
      };
      this.colonia.CP = {
        idCP: null,
        codigo: null,
        idCiudad: null,
        activo: null,
        Colonia: new Colonia(),
        Usuario: new Usuario(),
        Ciudad: new Ciudad()
      };
      this.colonia.CP.Ciudad = {
        idCiudad: null,
        ciudad1: null,
        idEstado: null,
        activo: null,
        Estado: new Estado(),
        CP: new CodigoPostal(),
        Usuario: new Usuario()
      };
    }
    else if (this.id === 'Contrato') {
      this.contrato = {
        idContrato: null,
        pdf: null,
        archivo: null,
        fechaInicio: null,
        fechaFinal: null,
        idPaquete: null,
        idUsuario: null,
        activo: null,
        Paquete: new Paquete(),
        Usuario: new Usuario()
      };
    }
    else if (this.id === 'Equipo') {
      this.equipo = {
        idEquipo: null,
        equipo1: null,
        activo: null,
        PaqueteEquipo: new PaqueteEquipo(),
        Propiedad: new Propiedad()
      };
    }
    else if (this.id === 'Estado') {
      this.estado = {
        idEstado: null,
        estado1: null,
        activo: null,
        Ciudad: new Ciudad(),
        Usuario: new Usuario()
      };
    }
    else if (this.id === 'Estatus') {
      this.estatus = {
        idEstatus: null,
        estatus1: null,
        activo: null,
        Contrato: new Contrato()
      };
    }
    else if (this.id === 'Paquete') {
      this.paquete = {
        idPaquete: null,
        precio: null,
        nombre: null,
        activo: null,
        descripcion: null,
        Contrato: new Contrato(),
        PaqueteEquipo: new PaqueteEquipo()
      };
    }
    else if (this.id === 'PaqueteEquipo') {
      this.paqueteEquipo = {
        idPE: null,
        idPaquete: null,
        idEquipo: null,
        Paquete: new Paquete(),
        Equipo: new Equipo(),
      };
    }
    else if (this.id === 'Propiedad') {
      this.propiedad = {
        idPropiedad: null,
        idUsuario: null,
        idEquipo: null,
        Equipo: new Equipo(),
        Usuario: new Usuario()
      };
    }
    else if (this.id === 'Rol') {
      this.rol = {
      idRol: null,
      rol1: null,
      activo: null,
      Usuario: new Usuario()
    };
    }
    else if (this.id === 'Usuario') {
      this.usuario = {
      idUsuario: null,
      nombre: null,
      apellido: null,
      telefono: null,
      correoE: null,
      contrasena: null,
      calle: null,
      numInt: null,
      numExt: null,
      idEstado: null,
      idCiudad: null,
      idColonia: null,
      idCP: null,
      idRol: null,
      activo: null,
      CP: new CodigoPostal(),
      Colonia: new Colonia(),
      Ciudad: new Ciudad(),
      Estado: new Estado(),
      Rol: new Rol ()
    };
    }
    else if (this.id === 'Soporte') {
      this.soporte = {
        idSoporte: null,
        problema: null,
        idTecnico: null,
        idContrato: null,
        fechaInicio: null,
        fechaFinal: null,
        idEstatus: null,
        activo: null,
        Contrato: new Contrato(),
        Estatus: new Estatus(),
        Usuario: new Usuario()
      };
    }
  }
}
