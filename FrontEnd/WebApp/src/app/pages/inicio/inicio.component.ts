import { Component, OnInit } from '@angular/core';
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
import estados from '../../../assets/coordenadas/estados/mexicoHigh.json';
import municipios from '../../../assets/coordenadas/municipios/MunicipiosMexico.json'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
private mymap: L.Maps; // variable para el mapa
private geoJson; // variable para mapeo de regiones
private arrayRegion =  {
  type: 'FeatureCollection',
  features: []
}; // arreglo para guardar las regiones activas(estados, ciudades o cp)
private info = L.control(); // variable para modificar valores de region
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
        // agregar estados disponibles a nuestro arreglo virtual
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < estados.features.length; i++) {
          // tslint:disable-next-line: prefer-for-of
          for (let y = 0; y < this.estado.length; y++) {
            if (estados.features[i].properties.name === this.estado[y].estado1){
            this.arrayRegion.features.push(estados.features[i]);
            }
          }
        }
        this.geoJson = L.geoJson(this.arrayRegion, {
          style: this.style,
          onEachFeature: this.onEachFeature
        }).addTo(this.mymap);
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

    // asignamos caracteristicas que va a tener nuestro mapa
    this.mymap = L.map('mapid', { zoomControl: false, scrollWheelZoom: false }).setView([22.021667, -102.356389], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);
    this.mymap.dragging.disable(); // deshabilatar mover mapa con el cursor

    // PRUEBA
    // method that we will use to update the control based on feature properties passed
    this.info.update = (props) => {
      this.mymap.removeLayer(this.geoJson);
      // cambiar arreglo para ciudades
      if (props.TYPE === 'State'){
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.estado.length; index++) {
          if (this.estado[index].estado1 === props.name) {
            this.getCity(this.estado[index]);
          }
        }
      }
      // cambiar arreglo para CP
      else if (props.NAME_2) {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.codigo.length; index++) {
        }
      }
      else if (props.name) {

      }
    };
  }

  getCity(id: Estado) {
    this.ciudadS.consultaCinicio(id.idEstado).subscribe( (resp: Ciudad[]) => {
      this.ciudad = [];
      if (resp) {
        this.ciudad = resp;
        this.arrayRegion.features = [];

        // FUNCION PARA EL MAPA
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < municipios.features.length; i++) {
          // tslint:disable-next-line: prefer-for-of
          for (let y = 0; y < this.ciudad.length; y++) {
            if (municipios.features[i].properties.NAME_2 === this.ciudad[y].ciudad1) {
              this.arrayRegion.features.push(municipios.features[i]);
            }
          }
        }
        this.geoJson = L.geoJson(this.arrayRegion, {
          style: this.style,
          onEachFeature: this.onEachFeature
        }).addTo(this.mymap);
      }
    });
  }

  getCP(id: Ciudad) {
    this.codigoS.consultaCPinicio(id.idCiudad).subscribe( (resp: CodigoPostal[]) => {
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
}
