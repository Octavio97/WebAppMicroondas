import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import Swal from 'sweetalert2';
import { Rol } from 'src/app/models/rol.model';
import { Estatus } from '../../models/estatus.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Estado } from 'src/app/models/estado.model';
import { Ciudad } from '../../models/ciudad.model';

@Component({
  selector: 'app-elemento',
  templateUrl: './elemento.component.html'
})
export class ElementoComponent implements OnInit {
  id;
  rol = new Rol();
  estatus = new Estatus();
  estado = new Estado();
  ciudad = new Ciudad();

  constructor(private rolS: RolService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // definimos los valores de los checkbox en la platilla ya que es nulo y evitamos errores
    this.rol.activo = false;

    this.id = this.route.snapshot.paramMap.get('id');

    
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





    if (this.rol.idRol) {
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
}
