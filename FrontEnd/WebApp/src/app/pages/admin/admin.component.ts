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

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  seleccion = 'Seleccione tabla...';
  in = false;
  tablas = ['Usuario', 'Rol', 'Estatus', 'Ciudad', 'Código postal', 'Colonia', 'Contrato', 'Equipo', 'Estado', 'Paquete', 'Propiedad'];
  rol: Rol[] = [];
  estado: Estado[];
  estatus: Estatus[];
  usuario: Usuario[];
  ciudad: Ciudad[];
  codigo: CodigoPostal[];
  colonia: Colonia[];
  contrato: Contrato[];
  equipo: Equipo[];
  paquete: Paquete[];
  paqueteEquipo: PaqueteEquipo[];
  propiedad: Propiedad[];

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
    private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigate(['/']);
    }
    else {
      this.usuarioS.consultaUsuario().subscribe( (resp: Usuario[]) => {
      if (resp === null) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error inesperado',
          icon: 'error'
        });
      }
      else {
        this.usuario = resp;
      }
      });
    }
  }

  // Metodo para cargar las tablas a elegir
  change(i: string) {
    this.seleccion = i;
    if (i === 'Rol') {
      this.rolS.consultaRol().subscribe( (resp: Rol[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.rol = resp;
        }
      });
    }
    else if (i === 'Estado') {
      this.estadoS.consultaEstado().subscribe( (resp: Estado[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.estado = resp;
        }
      });
    }
    else if (i === 'Ciudad') {
      this.ciudadS.consultaCiudad().subscribe( (resp: Ciudad[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.ciudad = resp;
        }
      });
    }
    else if (i === 'Colonia') {
      this.coloniaS.consultaColonia().subscribe( (resp: Colonia[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.colonia = resp;
        }
      });
    }
    else if (i === 'Código postal') {
      this.codigoS.consultaCodigo().subscribe( (resp: CodigoPostal[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.codigo = resp;
        }
      });
    }
    else if (i === 'Paquete') {
      this.paqueteS.consultaPaquete().subscribe( (resp: Paquete[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.paquete = resp;
        }
      });
    }
    else if (i === 'Usuario') {
      this.usuarioS.consultaUsuario().subscribe( (resp: Usuario[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.usuario = resp;
        }
      });
    }
    else if (i === 'Estatus') {
      this.estatusS.consultaEstatus().subscribe( (resp: Estatus[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.estatus = resp;
        }
      });
    }
    else if (i === 'Contrato') {
      this.contratoS.consultaContrato().subscribe( (resp: Contrato[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.contrato = resp;
        }
      });
    }
    else if (i === 'Equipo') {
      this.equipoS.consultaEquipo().subscribe( (resp: Equipo[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.equipo = resp;
        }
      });
    }
    else if (i === 'Propiedad') {
      this.propiedadS.consultaPropiedad().subscribe( (resp: Propiedad[]) => {
        if (resp === null) {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado',
            icon: 'error'
          });
        }
        else {
          this.propiedad = resp;
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
}
