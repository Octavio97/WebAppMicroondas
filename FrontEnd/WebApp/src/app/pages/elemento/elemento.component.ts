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

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html'
})
export class ElementoComponent implements OnInit, AfterViewInit {
  id;
  id2;

  // Objetos para los valores deldropbox a visualizar
  i1 = 'Seleccionar estado...';
  i2 = 'Seleccionar ciudad...';
  i3 = 'Seleccionar código postal...';
  i4 = 'Seleccionar colonia';

  // Arreglos para CRUD
  rol = new Rol();
  usuario = new Usuario();
  estatus = new Estatus();
  estado = new Estado();
  ciudad = new Ciudad();
  codigo = new CodigoPostal();
  colonia = new Colonia();
  contrato = new Contrato();
  equipo = new Equipo();
  paquete = new Paquete();
  paqueteEquipo = new PaqueteEquipo();
  propiedad = new Propiedad();

  // arreglos para los dropbox
  e: Estado[];
  c: Ciudad[];

  constructor(
    private coloniaS: ColoniaService,
    private contratoS: ContratoService,
    private equipoS: EquipoService,
    private paqueteS: PaqueteService,
    propiedadS: PropiedadService,
    private rolS: RolService,
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private usuarioS: UsuarioService,
    private codigoS: CodigopostalService,
    private router: Router,
    private route: ActivatedRoute) { }

  // Metodo para cargar los dropbox dependiendo el formulario
  ngAfterViewInit(): void {
    if (this.id === 'Ciudad') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
      });
    }
    else if (this.id === 'Código postal') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
      });
    }
    else if (this.id === 'Colonia') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        this.e = resp;
      });
    }
    else if (this.id === 'Contrato') {
    }
    else if (this.id === 'Equipo') {
    }
    else if (this.id === 'Estado') {
    }
    else if (this.id === 'Estatus') {
    }
    else if (this.id === 'Paquete') {
    }
    else if (this.id === 'PaqueteEquipo') {
    }
    else if (this.id === 'Propiedad') {
    }
    else if (this.id === 'Rol') {
    }
    else if (this.id === 'Usuario') {
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id2 = this.route.snapshot.paramMap.get('id2');

    // Definimos la accion ya sea para agregar o modificar
    if (this.id2 === 'new') { // si es nuevo
      // definimos los valores de los checkbox en la platilla ya que es nulo y evitamos errores
      this.rol.activo = false;
      this.estado.activo = false;
      this.usuario.activo = false;
      this.estatus.activo = false;
      this.ciudad.activo = false;
      this.codigo.activo = false;
      this.colonia.activo = false;
      this.contrato.activo = false;
      this.equipo.activo = false;
      this.paquete.activo = false;
    }
    else { // si no es nuevo
      if (this.id === 'Ciudad') {
        this.ciudad.idCiudad = this.id2;
      }
      else if (this.id === 'Código postal') {
        this.codigo.idCP = this.id2;
      }
      else if (this.id === 'Colonia') {
        this.colonia.idColonia = this.id2;
      }
      else if (this.id === 'Contrato') {
        this.contrato.idContrato = this.id2;
      }
      else if (this.id === 'Equipo') {
        this.equipo.idEquipo = this.id2;
      }
      else if (this.id === 'Estado') {
        this.estado.idEstado = this.id2;
      }
      else if (this.id === 'Estatus') {
        this.estatus.idEstatus = this.id2;
      }
      else if (this.id === 'Paquete') {
        this.paquete.idPaquete = this.id2;
      }
      else if (this.id === 'PaqueteEquipo') {
      }
      else if (this.id === 'Propiedad') {
        this.propiedad.idEquipo = this.id2;
      }
      else if (this.id === 'Rol') {
        this.rol.idRol = this.id2;
      }
      else if (this.id === 'Usuario') {
        this.usuario.idUsuario = this.id2;
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
        cancelButtonText: 'No'
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
            if ( this.i1 === 'Seleccionar estado...' ) {
              return;
            }
            if (this.ciudad.idCiudad) {
              this.ciudadS.modificarCiudad(this.ciudad).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'La ciudad fue actualizada con exito',
                    icon: 'success'
                  });
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error corrige tus datos',
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
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error corrige tus datos',
                    icon: 'error'
                  });
                }
              });
            }
          }
          else if (this.id === 'Código postal') {
            if ( this.i1 === 'Seleccionar estado...' ||
            this.i2 === 'Seleccionar ciudad...') {
              return;
            }
            if (this.codigo.idCP) {
              this.codigoS.modificarCodigo(this.codigo).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El código postal fue actualizada con exito',
                    icon: 'success'
                  });
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error corrige tus datos',
                    icon: 'error'
                  });
                }
              });
            }
            else {
              this.codigoS.altaCodigo(this.codigo).subscribe( resp => {
                if (resp === true) {
                  Swal.fire({
                    title: 'Exito',
                    text: 'El código postal fue guardada con exito',
                    icon: 'success'
                  });
                }
                else {
                  Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error corrige tus datos',
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
                  }
                  else {
                    Swal.fire({
                      title: 'Error',
                      text: 'Hubo un error corrige tus datos',
                      icon: 'error'
                    });
                  }
                }
                else {
                  if (resp === true) {
                    Swal.fire({
                      title: 'Exito',
                      text: 'La colonia fue guardada con exito',
                      icon: 'success'
                    });
                  }
                  else {
                    Swal.fire({
                      title: 'Error',
                      text: 'Hubo un error corrige tus datos',
                      icon: 'error'
                    });
                  }
                }
              });
            }
            else {

            }
          }
          else if (this.id === 'Contrato') {
            if (this.contrato.idContrato) {

            }
            else {

            }
          }
          else if (this.id === 'Equipo') {
            if (this.equipo.idEquipo) {

            }
            else {

            }
          }
          else if (this.id === 'Estado') {
            if (this.estado.idEstado) {

            }
            else {

            }
          }
          else if (this.id === 'Estatus') {
            if (this.estatus.idEstatus) {

            } else {

            }
          }
          else if (this.id === 'Paquete') {
            if (this.paquete.idPaquete) {

            } else {

            }
          }
          else if (this.id === 'PaqueteEquipo') {}
          else if (this.id === 'Propiedad') {
            if (this.propiedad.idPropiedad) {

            } else {

            }
          }
          else if (this.id === 'Rol') {
            if (this.rol.idRol) {

            }
            else {

            }
          }
          else if (this.id === 'Usuario') {
            if (this.usuario.idUsuario) {

            } else {

            }
          }
        }
      });
    }
  }

  // Metodo para cambiar valores del combobox
  cambio(y, id?) {
    if (this.id === 'Código postal') {
      if (id === undefined) {
        this.i2 = y;
        this.codigo.idCiudad = id;
      }
      else {
        this.i1 = y;
        this.ciudadS.consultaUnica(id).subscribe( (resp: Ciudad[]) => {
          this.c = resp;
        });
      }
    }
    else if (this.id === 'Ciudad') {
      this.i1 = y;
      this.ciudad.idEstado = id;
    }
    else if (this.id === 'Colonia') {
    }
    else if (this.id === 'Contrato') {
    }
    else if (this.id === 'Equipo') {
    }
    else if (this.id === 'Estado') {
    }
    else if (this.id === 'Estatus') {
    }
    else if (this.id === 'Paquete') {
    }
    else if (this.id === 'PaqueteEquipo') {
    }
    else if (this.id === 'Propiedad') {
    }
    else if (this.id === 'Rol') {
    }
    else if (this.id === 'Usuario') {
    }
  }
}
