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
import { ColoniaService } from '../../services/colonia.service';
import { Colonia } from 'src/app/models/colonia.model';
import { BC } from '../../coordenadas/Municipios/02_BajaCalifornia';
import { CoordenadasE } from '../../coordenadas/Estados/mexicoHigh';
import { style } from '@angular/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
private mymap: L.Maps;
private geoJson;
private info = L.control();
point = new CoordenadasE();
usuario: Usuario;
e = new Estado();
c = new Ciudad();
cp = new CodigoPostal();
co = new Colonia();
estado: Estado[];
ciudad: Ciudad[];
codigo: CodigoPostal[];
colonia: Colonia[];
i = 'Login';

  constructor(
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private codigoS: CodigopostalService,
    private coloniaS: ColoniaService) { }

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
    this.mymap = L.map('mapid', { zoomControl: false }).setView([22.021667, -102.356389], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    this.geoJson = L.geoJson(this.point.estados, {
      style: this.style,
      onEachFeature: this.onEachFeature
    }).addTo(this.mymap);

    // PRUEBA

    // method that we will use to update the control based on feature properties passed
    this.info.update = (props) => {
      console.log(props.name);
      console.log(this.point.estados.features[0].properties.name);
    };
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

  getColonia(id) {
    this.coloniaS.consultaCoInicio(id).subscribe( (resp: Colonia[]) => {
      this.colonia = [];
      if (resp) {
        this.colonia = resp;
      }
    });
  }

  // METODOS PARA EL MAPA
  onEachFeature = (feature, layer) => {
    layer.on('click', this.zoomToFeature);
    layer.on('mouseover', this.highlightFeature);
    layer.on('mouseout', this.resetHighlight);
  }

  highlightFeature = (e) => {
    const layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
  }

  resetHighlight = (e) => {
    this.geoJson.resetStyle(e.target);
  }

  zoomToFeature = (e) => {
    const layer = e.target;
    this.mymap.fitBounds(e.target.getBounds());
    this.info.update(layer.feature.properties);
  }

  style = (feature) => {
    return {
        fillColor: '#209DFF',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }

  verConsola(e) {
    // console.log(e);
  }
}
