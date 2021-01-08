import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebApp';
  url = 'http://192.168.1.105/solucionestj-api/api/MicroondasAPI/';
  url2 = 'http://localhost:3000/formulario';

  // url = 'http://localhost:55791/api/MicroondasAPI/';
  // url2 = 'http://localhost:3000/formulario';

  constructor() {}
}
