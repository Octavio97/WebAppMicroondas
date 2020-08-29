import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  constructor() { }
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  ngOnInit(): void {
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

}
