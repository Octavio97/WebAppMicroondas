import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { SlideImg } from '../models/slideImg.model';

@Injectable({
  providedIn: 'root'
})
export class SlideImgService {
  public readonly url;

  constructor(private http: HttpClient) {
    const url: AppComponent = new AppComponent();

    this.url = url.url;
  }

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

  buscarSlideImg(key: string) {
    return this.http.get( this.url + 'buscarSlideImg', { params: { key } } );
  }
}
