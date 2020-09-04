import { Component, OnInit } from '@angular/core';
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
import { UsuarioService } from '../../services/usuario.service';
import { EstatusService } from '../../services/estatus.service';
import { CiudadService } from '../../services/ciudad.service';
import { CodigopostalService } from '../../services/codigopostal.service';
import { ColoniaService } from '../../services/colonia.service';
import { ContratoService } from '../../services/contrato.service';
import { EquipoService } from '../../services/equipo.service';
import { PaqueteService } from '../../services/paquete.service';
import { PaqueteequipoService } from 'src/app/services/paqueteequipo.service';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html'
})
export class ElementoComponent implements OnInit {
  id;
  id2;
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
  e: Estado[];

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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.id2 = this.route.snapshot.paramMap.get('id2');

    this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
      this.e = resp;
    });
    if (this.id2 === 'new') {
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
    else {
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
    // mensaje para cargar informacion
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    if (this.id === 'Ciudad') {
      if (this.ciudad.idCiudad) {
        this.ciudadS.modificarCiudad(this.ciudad).subscribe( resp => {
          if (resp === true) {
            Swal.fire({
              title: 'Exito',
              text: 'La ciudad se ha actualizado con exito',
              icon: 'success'
            });
          }
          else {
            Swal.fire({
              title: 'Error',
              text: 'Parece que hubo un error corrige tus datos',
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
            text: 'La ciudad se ha agregado con exito',
            icon: 'success'
          });
        }
        else {
          Swal.fire({
            title: 'Error',
            text: 'Parece que este estado ya existe',
            icon: 'error'
          });
        }
        });
      }
    }
    else if (this.id === 'Código postal') {

    }
    else if (this.id === 'Colonia') {

    }
    else if (this.id === 'Contrato') {

    }
    else if (this.id === 'Equipo') {

    }
    else if (this.id === 'Estado') {
      if (this.estado.idEstado) {
        this.estadoS.modificarEstado(this.estado).subscribe( resp => {
          if (resp === true) {
            Swal.fire({
              title: 'Exito',
              text: 'El estado se ha actualizado con exito',
              icon: 'success'
            });
          }
          else {
            Swal.fire({
              title: 'Error',
              text: 'Parece que hubo un error corrige tus datos',
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
            text: 'El estado se ha agregado con exito',
            icon: 'success'
          });
        }
        else {
          Swal.fire({
            title: 'Error',
            text: 'Parece que este estado ya existe',
            icon: 'error'
          });
        }
        });
      }
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
      if (this.rol.idRol) {
        this.rolS.modificarRol(this.rol).subscribe( resp => {
          if (resp === true) {
            Swal.fire({
              title: 'Exito',
              text: 'El rol se ha actualizado con exito',
              icon: 'success'
            });
          }
          else {
            Swal.fire({
              title: 'Error',
              text: 'Parece que hubo un error corrige tus datos',
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
            text: 'El rol se ha agregado con exito',
            icon: 'success'
          });
        }
        else {
          Swal.fire({
            title: 'Error',
            text: 'Parece que este rol ya existe',
            icon: 'error'
          });
        }
        });
      }
    }
    else if (this.id === 'Usuario') {

    }
  }
}
