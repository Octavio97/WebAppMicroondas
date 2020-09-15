import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as L from 'leaflet';
import { Usuario } from '../../models/usuario.model';
import { EstadoService } from '../../services/estado.service';
import { Estado } from 'src/app/models/estado.model';
import { CiudadService } from '../../services/ciudad.service';
import { Ciudad } from '../../models/ciudad.model';
import { CodigopostalService } from '../../services/codigopostal.service';
import { CodigoPostal } from 'src/app/models/codigopostal.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
private mymap: L.Maps;
usuario: Usuario;
estado: Estado[];
ciudad: Ciudad[];
codigo: CodigoPostal[];
i = 'Login';

  constructor(
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private codigoS: CodigopostalService) { }
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  ngOnInit(): void {
    this.estadoS.consultaEInicio().subscribe( (resp: Estado[]) => {
      this.estado = [];
      if  (resp){
        this.estado = resp;
      }
    });
    // si no esta el token de guardar sesion
    if (!localStorage.getItem('accessToken')) {
      localStorage.removeItem('currentUser'); // eliminar el usuario guardado
    }
    if (localStorage.getItem('currentUser')) { // si hay una sesion guardada
      // muestra la sesion en la barra de tareas
      this.usuario = JSON.parse(localStorage.getItem('currentUser'));
      this.i = this.usuario.nombre;
    }
    this.mymap = L.map('mapid', { minZoom: 5}).setView([22.021667, -102.356389], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(this.mymap);
    const marker = L.marker([32.5010188, -116.9646629]).addTo(this.mymap);
    marker.bindPopup('<b>Tijuana</b>').openPopup();

    // Swal.fire({
    //   html:
    //   '<img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png" alt="logoxd" style="width:100px; heigth:100px;">' +
    //   '<h2>Bienvenido</h2>' +
    //   '<h4>Ingrese su ciudad en donde desea contratar:</h4>' +
    //   '<div class="dropdown">' +
    //       '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
    //         'Seleccione uno...' +
    //       '</button>' +
    //       '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
    //         '<a class="dropdown-item" href="#">Action</a>' +
    //         '<a class="dropdown-item" href="#">Another action</a>' +
    //         '<a class="dropdown-item" href="#">Something else here</a>' +
    //       '</div>' +
    //     '</div>',
    //     allowOutsideClick: false,
    //     showConfirmButton: false
    // });
  }

  getCity(id) {
    this.ciudadS.consultaCinicio(id).subscribe( (resp: Ciudad[]) => {
      this.ciudad = [];
      if (resp) {
        this.ciudad = resp;
      }
    });
  }

  getCP(id) {
    this.codigoS.consultaCPinicio(id).subscribe( (resp: CodigoPostal[]) => {
      this.codigo = [];
      if (resp) {
        this.codigo = resp;
      }
    });
  }
}
