import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colonia } from '../models/colonia.model';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class ColoniaService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

  altaColonia(colonia: Colonia) {
    return this.http.post( this.url + 'agregarColonia', colonia );
  }

  bajaColonia(id: string) {
    return this.http.delete( this.url + 'eliminarColonia', { params: { id } } );
  }

  consultaColonia() {
    return this.http.get( this.url + 'consultaColonia' );
  }

  modificarColonia(colonia: Colonia, i?) {
    if (i === true) {
      colonia.activo = false;
    }
    else if (i === false) {
      colonia.activo = true;
    }
    return this.http.put( this.url + 'modificarColonia', colonia );
  }

  consultaUnica(id: string) {
    return this.http.get( this.url + 'consultaUnicaCo', { params: { id } } );
  }

  verColonia(id: string) {
    return this.http.get( this.url + 'verColonia', { params: { id } } );
  }

  consultaCoInicio(id: string) {
    return this.http.get( this.url + 'consultaCoInicio', { params: { id } } );
  }

  buscarColonia(key: string) {
    return this.http.get( this.url + 'buscarColonia', { params: { key } } );
  }
}
