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
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Informes } from '../../models/informes.model';
import { InformesService } from '../../services/informes.service';
import { Paquete } from 'src/app/models/paquete.model';
import { PaqueteService } from 'src/app/services/paquete.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SlideImg } from 'src/app/models/slideImg.model';
import { SlideImgService } from '../../services/slide-img.service';
import { AntenaService } from '../../services/antena.service';
import { Antena } from 'src/app/models/antena.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
informes = new Informes(); // arreglo para enviar informes
paquetes = new Array<Paquete>(); // arreglo de paquetes a ver en la pagina
slides = new Array<SlideImg>(); // arreglo de imagenes en el slide
icono = '/assets/img/icoAnt.png';
private mymap: L.Maps; // variable para el mapa
private geoJson; // variable para mapeo de regiones
private div; // variable para mostrar el nombre del estado, municipio o cp
private arrayRegion =  {
  type: 'FeatureCollection',
  features: []
}; // arreglo para guardar las regiones activas(estados, ciudades o cp)
private info = L.control(); // variable para modificar valores de region
// Arregles para el mapa en la ubicacion
usuario: Usuario;
e = new Estado();
c = new Ciudad();
cp = new CodigoPostal();
co = new Colonia();
estado: Estado[];
ciudad: Ciudad[];
codigo: CodigoPostal[];
colonia: Colonia[];
i = 'Mi cuenta'; // texto del boton de login
prueba; // PRUEBA DE IMAGENES

  constructor(
    private estadoS: EstadoService,
    private ciudadS: CiudadService,
    private coloniaS: ColoniaService,
    private informesS: InformesService,
    private paquetesS: PaqueteService,
    private slideImgS: SlideImgService,
    private antenaS: AntenaService,
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
    }, (e: any) => {
      console.log(e);
    });
    this.slideImgS.consultaSlideImg().subscribe( (resp: SlideImg[]) => {
      if (resp) {
        this.slides = resp;
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.slides.length; index++) {
          this.slides[index].imagen = this.dom.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${ this.slides[index].imagen }`);
        }
      }
    }, (e: any) => {
      console.log(e);
    });
    this.estadoS.consultaEInicio().subscribe( (resp: Estado[]) => {
      this.estado = [];
      if  (resp){
        this.estado = resp;
        // agregar estados disponibles a nuestro arreglo virtual
        this.getState(this.estado);
      }
    }, (e: any) => {
      console.log(e);
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
    this.mymap = L.map('mapid', { zoomControl: false, minZoom: 5}).setView([22.021667, -102.356389], 5);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mymap);

    // creamos un label de informacion en el mapa
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
        // for (let index = 0; index < this.ciudad.length; index++) {
        //   if (this.ciudad[index].ciudad1 === props.NAME_2) {
        //     this.getCP(this.ciudad[index].idCiudad, props.NAME_1);
        //   }
        // }

        // Devuelve las antenas en esa region y las marca en el mapa
        this.antenaS.verAntenas(props.NAME_2).subscribe( (resp: Antena[]) => {
          if (resp) {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < resp.length; i++) {
              // cobertura en el mapa
              L.circle([resp[i].lat, resp[i].lon], {
                color: 'blue',
                filColor: '#0066F0',
                fillOpacity: 0.5,
                radius: 30000
              }).addTo(this.mymap);
              // icono de antena en el mapa
              L.marker([resp[i].lat, resp[i].lon], {icon:
                L.icon({
                  iconUrl: this.icono,
                  iconSize: [90, 90],
                  iconAnchor: [47, 90],
                  popupAnchor:  [-3, -76]
                })
              }).addTo(this.mymap);
            }
          }
        }, (e: any) => {
          console.log(e);
        });
      }
    };
    this.info.addTo(this.mymap);
  }

  // METODOS PARA OBTENER REGION DEPENDIENDO LA SELECCION
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
    }, (e: any) => {
      console.log(e);
    });
  }

  getCP(id: string, state?: string) {
    // let flag: any;
    // this.codigoS.consultaCPinicio(id).subscribe( (resp: CodigoPostal[]) => {
    //   this.codigo = [];
    //   if (resp) {
    //     this.codigo = resp;
    //     this.arrayRegion.features = [];

    //     // FUNCION DEL MAPA
    //     asignamos a nuestro objeto 'flag' al json del estado al que se quiere buscar la cobertura
    //     tslint:disable-next-line: prefer-for-of
    //     switch (state) {
    //       case 'Aguascalientes':
    //         flag = ags;
    //         break;
    //       case 'Baja California':
    //         flag = bc;
    //         break;
    //       case 'Baja California Sur':
    //         flag = bcs;
    //         break;
    //       case 'Campeche':
    //         flag = camp;
    //         break;
    //       case 'Coahuila':
    //         flag = coah;
    //         break;
    //       case 'Colima':
    //         flag = col;
    //         break;
    //       case 'Chiapas':
    //         flag = chis;
    //         break;
    //       case 'Chihuahua':
    //         flag = chih;
    //         break;
    //       case 'Ciudad de México':
    //         flag = cdmx;
    //         break;
    //       case 'Durango':
    //         flag = dgo;
    //         break;
    //       case 'Guanajuato':
    //         flag = gto;
    //         break;
    //       case 'Guerrero':
    //         flag = gro;
    //         break;
    //       case 'Hidalgo':
    //         flag = hgo;
    //         break;
    //       case 'Jalisco':
    //         flag = jal;
    //         break;
    //       case 'Estado de México':
    //         flag = mex;
    //         break;
    //       case 'Michoacán':
    //         flag = mich;
    //         break;
    //       case 'Morelos':
    //         flag = mor;
    //         break;
    //       case 'Nayarit':
    //         flag = nay;
    //         break;
    //       case 'Nuevo León':
    //         flag = nl;
    //         break;
    //       case 'Oaxaca':
    //         flag = oax;
    //         break;
    //       case 'Puebla':
    //         flag = pue;
    //         break;
    //       case 'Querétaro':
    //         flag = qro;
    //         break;
    //       case 'Quintana Roo':
    //         flag = qroo;
    //         break;
    //       case 'San Luis Potosí':
    //         flag = slp;
    //         break;
    //       case 'Sinaloa':
    //         flag = sin;
    //         break;
    //       case 'Sonora':
    //         flag = son;
    //         break;
    //       case 'Tabasco':
    //         flag = tab;
    //         break;
    //       case 'Tamaulipas':
    //         flag = tamps;
    //         break;
    //       case 'Tlaxcala':
    //         flag = tlax;
    //         break;
    //       case 'Veracruz':
    //         flag = ver;
    //         break;
    //       case 'Yucatán':
    //         flag = yuc;
    //         break;
    //       case 'Zacatecas':
    //         flag = zac;
    //         break;
    //     }

    //     // tslint:disable-next-line: prefer-for-of
    //     for (let i = 0; i < bc.features.length; i++) {
    //       // tslint:disable-next-line: prefer-for-of
    //       for (let y = 0; y < this.codigo.length; y++) {
    //         if (bc.features[i].properties.d_cp === this.codigo[y].codigo.toString()) {
    //           this.arrayRegion.features.push(bc.features[i]);
    //         }
    //       }
    //     }
    //     this.geoJson = L.geoJson(this.arrayRegion, {
    //       style: this.style,
    //       onEachFeature: this.onEachFeature
    //     }).addTo(this.mymap);
    //   }
    // }, (e: any) => {
    //   console.log(e);
    // });
  }

  getColonia(id) {
    this.coloniaS.consultaCoInicio(id).subscribe( (resp: Colonia[]) => {
      this.colonia = [];
      if (resp) {
        this.colonia = resp;
      }
    }, (e: any) => {
      console.log(e);
    });
  }

  // METODOS PARA EL MAPA
  // metodo para asignar cada accion a cada metodo en el mapa
  onEachFeature = (feature, layer) => {
    layer.on('click', this.zoomToFeature);
    layer.on('mouseover', this.highlightFeature);
    layer.on('mouseout', this.resetHighlight);
  }

  // metodo para cambiar diseño al pasar el cursor sobre zona seleccionada
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

  // metodo para cambiar diseño al quitar el cursor de la zona seleccionada
  resetHighlight = (e) => {
    this.geoJson.resetStyle(e.target);
  }

  // metodo para ajustar zoom al seleccionar una zona
  zoomToFeature = (e) => {
    const layer = e.target;
    this.mymap.fitBounds(e.target.getBounds());
    this.info.update(layer.feature.properties);
  }

  // metodo para asignar estilo a la zona
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
          datos.reset();
         }
         else {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error inesperado, intente mas tarde',
            icon: 'error',
            });
         }
       }, (e: any) => {
        console.log(e);
      });
    }
  }

  // METODO PARA VER LAS POLITICAS DE PRIVACIDAD
  politicas() {
    Swal.fire({
      title: 'Aviso de privacidad',
      html:
      `<textarea rows="20" class="form-control" style="resize: none; text-align: justify;" readonly>Desarrollo de sistemas TJ S.A de C.V, con domicilio convencional para oír y recibir notificaciones en Calle San Renovato #13020 Colonia Montebello C.P 22480, Tijuana, Baja California, únicamente para temas de privacidad y de protección de datos personales (el “Responsable”), del tratamiento legítimo, controlado e informado de los datos personales (los “Datos Personales”), de sus -Prospectos y clientes- (el “Titular”), y en congruencia con su política de privacidad, conforme a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la “LFPDPPP”) y demás normatividad secundaria vigente aplicable, así como estándares nacionales e internacionales en materia de protección de datos personales, con el propósito de garantizar la privacidad y el derecho a la autodeterminación informativa y protección de los Datos Personales, que el Responsable podrá recabar a través de los siguientes medios: (i) de manera personal, cuando el Titular los proporciona de manera física en nuestras instalaciones, (ii) de manera directa, cuando el Titular los ingresa a través del sitio web www.solucionestj.com.mx (el “Sitio Web”),(iii) de manera directa, cuando el Titular los proporciona vía telefónica, (iv) de manera indirecta, cuando otras empresas nos los transfieren, y (v) de manera indirecta,cuando se obtienen a través de fuentes de acceso público permitidas por la LFPDPPP; pone a disposición del Titular el presente aviso de privacidad integral (el "Aviso de Privacidad") -previo a la obtención de los Datos Personales- en estricto apego a los -principios de información, licitud, consentimiento, calidad, finalidad, lealtad, proporcionalidad y responsabilidad- contempladosen la LFPDPPP.</textarea>`,
      width: '80%',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#268108'
    });
  }
}
