import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.page.html',
  styleUrls: ['./mosaic.page.scss'],
})
export class MosaicPage implements OnInit {
  sourceImageDataURL: string;
  croppedImageDataURL: string;
  targetWidth = 48;
  targetHeight = 48;

  get ratio(): number {
    return this.targetWidth / this.targetHeight;
  }

  constructor() {}

  ngOnInit() {}
  loadImageFromDevice(event) {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.sourceImageDataURL = reader.result as string;
    };
  }

  startOver() {
    this.sourceImageDataURL = null;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageDataURL = event.base64;
  }
}
