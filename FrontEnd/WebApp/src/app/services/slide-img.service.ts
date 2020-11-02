import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SlideImg } from '../models/slideImg.model';

@Injectable({
  providedIn: 'root'
})
export class SlideImgService {

  constructor(private http: HttpClient) { }

  public readonly url = 'http://localhost:55791/api/MicroondasAPI/';

  altaSlideImg(slideImg: SlideImg) {
    return this.http.post( this.url + 'agregarSlideImg', slideImg );
  }

  bajaSlideImg(id: string) {
    return this.http.delete( this.url + 'eliminarSlideImg', { params: { id } } );
  }

  consultaSlideImg() {
    return this.http.get( this.url + 'consultaSlideImg' );
  }

  modificarSlideImg(slideImg: SlideImg) {
    return this.http.put( this.url + 'modificarSlideImg', slideImg );
  }

  verSlideImg(id: string) {
    return this.http.get( this.url + 'verSlideImg', { params: { id } } );
  }
}
