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
import municipios from '../../../assets/coordenadas/municipios/MunicipiosMexico.json';
// import ags from '../../../assets/coordenadas/CP/01_Ags_CP.json';
import bc from '../../../assets/coordenadas/CP/02_BC_CP.json';
// import bcs from '../../../assets/coordenadas/CP/03_BCS_CP.json';
// import camp from '../../../assets/coordenadas/CP/04_Camp_CP.json';
// import coah from '../../../assets/coordenadas/CP/05_Coah_CP.json';
// import col from '../../../assets/coordenadas/CP/06_Col_CP.json';
// import chis from '../../../assets/coordenadas/CP/07_Chis_CP.json';
// import chih from '../../../assets/coordenadas/CP/08_Chih_CP.json';
// import cdmx from '../../../assets/coordenadas/CP/09_Cdmx_CP.json';
// import dgo from '../../../assets/coordenadas/CP/10_Dgo_CP.json';
// import gto from '../../../assets/coordenadas/CP/11_Gto_CP.json';
// import gro from '../../../assets/coordenadas/CP/12_Gro_CP.json';
// import hgo from '../../../assets/coordenadas/CP/13_Hgo_CP.json';
// import jal from '../../../assets/coordenadas/CP/14_Jal_CP.json';
// import mex from '../../../assets/coordenadas/CP/15_Mex_CP.json';
// import mich from '../../../assets/coordenadas/CP/16_Mich_CP.json';
// import mor from '../../../assets/coordenadas/CP/17_Mor_CP.json';
// import nay from '../../../assets/coordenadas/CP/18_Nay_CP.json';
// import nl from '../../../assets/coordenadas/CP/19_NL_CP.json';
// import oax from '../../../assets/coordenadas/CP/20_Oax_CP.json';
// import pue from '../../../assets/coordenadas/CP/21_Pue_CP.json';
// import qro from '../../../assets/coordenadas/CP/22_Qro_CP.json';
// import qroo from '../../../assets/coordenadas/CP/23_QRoo_CP.json';
// import slp from '../../../assets/coordenadas/CP/24_SLP_CP.json';
// import sin from '../../../assets/coordenadas/CP/25_Sin_CP.json';
// import son from '../../../assets/coordenadas/CP/26_Son_CP.json';
// import tab from '../../../assets/coordenadas/CP/27_Tab_CP.json';
// import tamps from '../../../assets/coordenadas/CP/28_Tamps_CP.json';
// import tlax from '../../../assets/coordenadas/CP/29_Tlax_CP.json';
// import ver from '../../../assets/coordenadas/CP/30_Ver_CP.json';
// import yuc from '../../../assets/coordenadas/CP/31_Yuc_CP.json';
// import zac from '../../../assets/coordenadas/CP/32_Zac_CP.json';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Informes } from '../../models/informes.model';
import { InformesService } from '../../services/informes.service';
import { Paquete } from 'src/app/models/paquete.model';
import { PaqueteService } from 'src/app/services/paquete.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SlideImg } from 'src/app/models/slideImg.model';
import { SlideImgService } from '../../services/slide-img.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
informes = new Informes();
paquetes = new Array<Paquete>();
slides = new Array<SlideImg>();
private mymap: L.Maps; // variable para el mapa
private geoJson; // variable para mapeo de regiones
private div; // variable para mostrar el nombre del estado, municipio o cp
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
prueba; // PRUEBA DE IMAGENES

  constructor(
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private codigoS: CodigopostalService,
    private coloniaS: ColoniaService,
    private informesS: InformesService,
    private paquetesS: PaqueteService,
    private slideImgS: SlideImgService,
    private dom: DomSanitizer) { }

  ngOnInit(): void {
    this.paquetesS.consultaPaquete().subscribe( (resp: Paquete[]) => {
      if (resp) {
        this.paquetes = resp;
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.paquetes.length; index++) {
          this.paquetes[index].imagen = this.dom.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${ this.paquetes[index].imagen }`);
        }
      }
    });
    this.slideImgS.consultaSlideImg().subscribe( (resp: SlideImg[]) => {
      if (resp) {
        this.slides = resp;
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.slides.length; index++) {
          this.slides[index].imagen = this.dom.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${ this.slides[index].imagen }`);
        }
      }
    });
    this.estadoS.consultaEInicio().subscribe( (resp: Estado[]) => {
      this.estado = [];
      if  (resp){
        this.estado = resp;
        // agregar estados disponibles a nuestro arreglo virtual
        this.getState(this.estado);
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

    this.info.onAdd = (map) => {
      this.div = L.DomUtil.create('div', 'info');
      return this.div;
    };

    // method that we will use to update the control based on feature properties passed
    this.info.update = (props) => {
      this.mymap.removeLayer(this.geoJson);
      // cambiar arreglo para ciudades
      if (props.TYPE === 'State'){
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.estado.length; index++) {
          if (this.estado[index].estado1 === props.name) {
            this.getCity(this.estado[index].idEstado);
          }
        }
      }
      // cambiar arreglo para CP
      else if (props.NAME_2 !== null) {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.ciudad.length; index++) {
          if (this.ciudad[index].ciudad1 === props.NAME_2) {
            this.getCP(this.ciudad[index].idCiudad, props.NAME_1);
          }
        }
      }
    };
    this.info.addTo(this.mymap);
  }

  getState(id: Estado[]) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < estados.features.length; i++) {
      // tslint:disable-next-line: prefer-for-of
      for (let y = 0; y < id.length; y++) {
        if (estados.features[i].properties.name === id[y].estado1){
          this.arrayRegion.features.push(estados.features[i]);
        }
      }
    }
    this.geoJson = L.geoJson(this.arrayRegion, {
      style: this.style,
      onEachFeature: this.onEachFeature
    }).addTo(this.mymap);
  }

  getCity(id: string) {
    this.ciudadS.consultaCinicio(id).subscribe( (resp: Ciudad[]) => {
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

  getCP(id: string, state?: string) {
    // let flag: any;
    this.codigoS.consultaCPinicio(id).subscribe( (resp: CodigoPostal[]) => {
      this.codigo = [];
      if (resp) {
        this.codigo = resp;
        this.arrayRegion.features = [];

        // FUNCION DEL MAPA
        // acignamos a nuestro objeto 'flag' al json del estado al que se quiere buscar la cobertura
        // tslint:disable-next-line: prefer-for-of
        // switch (state) {
        //   case 'Aguascalientes':
        //     flag = ags;
        //     break;
        //   case 'Baja California':
        //     flag = bc;
        //     break;
        //   case 'Baja California Sur':
        //     flag = bcs;
        //     break;
        //   case 'Campeche':
        //     flag = camp;
        //     break;
        //   case 'Coahuila':
        //     flag = coah;
        //     break;
        //   case 'Colima':
        //     flag = col;
        //     break;
        //   case 'Chiapas':
        //     flag = chis;
        //     break;
        //   case 'Chihuahua':
        //     flag = chih;
        //     break;
        //   case 'Ciudad de México':
        //     flag = cdmx;
        //     break;
        //   case 'Durango':
        //     flag = dgo;
        //     break;
        //   case 'Guanajuato':
        //     flag = gto;
        //     break;
        //   case 'Guerrero':
        //     flag = gro;
        //     break;
        //   case 'Hidalgo':
        //     flag = hgo;
        //     break;
        //   case 'Jalisco':
        //     flag = jal;
        //     break;
        //   case 'Estado de México':
        //     flag = mex;
        //     break;
        //   case 'Michoacán':
        //     flag = mich;
        //     break;
        //   case 'Morelos':
        //     flag = mor;
        //     break;
        //   case 'Nayarit':
        //     flag = nay;
        //     break;
        //   case 'Nuevo León':
        //     flag = nl;
        //     break;
        //   case 'Oaxaca':
        //     flag = oax;
        //     break;
        //   case 'Puebla':
        //     flag = pue;
        //     break;
        //   case 'Querétaro':
        //     flag = qro;
        //     break;
        //   case 'Quintana Roo':
        //     flag = qroo;
        //     break;
        //   case 'San Luis Potosí':
        //     flag = slp;
        //     break;
        //   case 'Sinaloa':
        //     flag = sin;
        //     break;
        //   case 'Sonora':
        //     flag = son;
        //     break;
        //   case 'Tabasco':
        //     flag = tab;
        //     break;
        //   case 'Tamaulipas':
        //     flag = tamps;
        //     break;
        //   case 'Tlaxcala':
        //     flag = tlax;
        //     break;
        //   case 'Veracruz':
        //     flag = ver;
        //     break;
        //   case 'Yucatán':
        //     flag = yuc;
        //     break;
        //   case 'Zacatecas':
        //     flag = zac;
        //     break;
        // }

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < bc.features.length; i++) {
          // tslint:disable-next-line: prefer-for-of
          for (let y = 0; y < this.codigo.length; y++) {
            if (bc.features[i].properties.d_cp === this.codigo[y].codigo.toString()) {
              this.arrayRegion.features.push(bc.features[i]);
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

    if (layer.feature.properties.name) {
      this.div.innerHTML = '<h4>Estado</h4>' + (layer.feature.properties ?
        '<b>' + layer.feature.properties.name + '</b>' : 'Seleccione una región');
    }
    else if (layer.feature.properties.NAME_2) {
      this.div.innerHTML = '<h4>Municipio</h4>' + (layer.feature.properties ?
        '<b>' + layer.feature.properties.NAME_2 + '</b>' : 'Seleccione una región');
    }
    else if (layer.feature.properties.d_cp) {
      this.div.innerHTML = '<h4>Código postal</h4>' + (layer.feature.properties ?
        '<b>' + layer.feature.properties.d_cp + '</b>' : 'Seleccione una región');
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

  // METODO PARA GUARDAR INFORME SOBRE CONTACTO
  enviarDatos(datos: NgForm){
    if (datos.invalid) {
      // mostramos el mensaje de error
      Swal.fire({
        title: 'Parce que te falta algo 😢',
        icon: 'error',
        text: 'Verifique sus datos'
      });
      return;
    }
    else {
       // mensaje para cargar informacion
       Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
        });
       Swal.showLoading();

       this.informes.visto = false;
       this.informes.activo = true;

       this.informesS.altaInformes(this.informes).subscribe( resp => {
         if (resp) {
          Swal.fire({
            title: 'Exito',
            text: 'Su información ha sido enviada con exito, uno de nuestros trabajadores se pondra en contacto con usted pronto',
            icon: 'success',
            });
         }
         else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado, intente mas tarde',
            icon: 'error',
            });
         }
       });
    }
  }
}
