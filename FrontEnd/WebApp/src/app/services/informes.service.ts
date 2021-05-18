import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { Informes } from '../models/informes.model';

@Injectable({
  providedIn: 'root'
})
export class InformesService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaInformes(informes: Informes) {
    return this.http.post( this.url + 'agregarInformes', informes );
  }

  bajaInformes(id: string){
    return this.http.delete( this.url + 'eliminarInformes', { params: { id } } );
  }

  consultaInformes() {
    return this.http.get( this.url + 'consultaInformes' );
  }

  modificarInformes(informes: Informes, i?) {
    if (i === true) {
      informes.activo = false;
    }
    else if (i === false) {
      informes.activo = true;
    }
    return this.http.put( this.url + 'modificarInformes', informes );
  }

  verInformes(id: string) {
    return this.http.get( this.url + 'verInformes', { params: { id } } );
  }

  buscarInformes(key: string) {
    return this.http.get( this.url + 'buscarInformes', { params: { key } } );
  }
}
