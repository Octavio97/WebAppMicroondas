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
  session: Usuario = JSON.parse(localStorage.getItem('currentUser'));
  seleccion = 'Seleccione tabla...';
  in = false; // mostrar registros eliminados
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
    // si no esxiste alguna sesion iniciada
    if (!localStorage.getItem('accessToken') && !localStorage.getItem('currentUser')) {
      localStorage.removeItem('currentUser');
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

  delete(id: string){
    Swal.fire({
      title: 'Confirmación',
      text: 'Esta seguro de eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      Swal.showLoading();
      if (result.value) {
        // mensaje para cargar informacion
      Swal.fire({
        title: 'Espere',
        text: 'Realizando proceso...',
        icon: 'info',
        allowOutsideClick: false,
        });
      if (this.seleccion === 'Ciudad') {
          this.ciudadS.bajaCiudad(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'La ciudad fue eliminada con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Código postal') {
          this.codigoS.bajaCodigo(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El código postal fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Colonia') {
          this.coloniaS.bajaColonia(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'La colonia fue eliminada con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Contrato') {
          this.contratoS.bajaContrato(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El contrato fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Equipo') {
          this.equipoS.bajaEquipo(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El equipo fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Estado') {
          this.estadoS.bajaEstado(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El estado fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Estatus') {
          this.estatusS.bajaEstatus(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El estatus fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Paquete') {
          this.paqueteS.bajaPaquete(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El paquete fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Propiedad') {
          this.propiedadS.bajaPropiedad(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'La propiedad fue eliminada con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Rol') {
          this.rolS.bajaRol(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El rol fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
        else if (this.seleccion === 'Usuario') {
          this.usuarioS.bajaUsuario(id).subscribe( resp => {
            if (resp) {
              Swal.fire({
              title: 'Exito',
              text: 'El estado fue eliminado con exito',
              icon: 'success'
              });
            }
          });
        }
      }
    });
  }
}
