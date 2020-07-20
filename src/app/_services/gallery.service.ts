import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryResponse } from '@app/_models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  galleryUrl = 'http://localhost:3000/gallery';

  constructor(private http: HttpClient) { }
  
  getPhotos(): Observable<GalleryResponse> {
    return this.http.get<GalleryResponse>(this.galleryUrl);
  }
}