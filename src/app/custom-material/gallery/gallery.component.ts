import { Component, OnInit } from '@angular/core';
import { GalleryResponse } from '@app/_models';
import { GalleryService } from '@app/_services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryResponse: GalleryResponse;

  constructor(private galleryService: GalleryService) { }

  ngOnInit(): void {
    this.galleryService.getPhotos().subscribe(response => {
      this.galleryResponse = response;
    }, error => {
      console.log(error);
    });
  }

  onImageClick(message : string){
    alert(message);
  }
}
