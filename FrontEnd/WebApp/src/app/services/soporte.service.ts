import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Soporte } from '../models/soporte.model';

@Injectable({
  providedIn: 'root'
})
export class SoporteService {

  constructor(private http: HttpClient) { }
  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaSoporte(soporte: Soporte) {
    return this.http.post( this.url + 'agregarSoporte', soporte );
  }

  bajaSoporte(id: string) {
    return this.http.put( this.url + 'eliminarSoporte', { params: { id } } );
  }

  modificarSoporte(soporte: Soporte){
    return this.http.put( this.url + 'modificarSoporte', soporte );
  }

  consultaSoporte(){
    return this.http.get( this.url + 'consultaSoporte' );
  }

  consultaUnicaSopU(id: string){
    return this.http.get( this.url + 'consultaUnicaSopU', { params: { id } } );
  }

  verSoporte(id: string) {
    return this.http.get( this.url + 'verSoporte', { params: { id } } );
  }

  agregarSoporteCli(soporte: Soporte) {
    return this.http.post( this.url + 'agregarSoporteCli', soporte );
  }
}
