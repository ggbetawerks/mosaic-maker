import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Observable } from 'rxjs';
import { LegoColor } from '../models/color';
import { ColorListService } from '../services/color-list.service';
import { ColorUtilitiesService } from '../services/color-utilities.service';

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

  colorList$: Observable<LegoColor[]>;

  get ratio(): number {
    return this.targetWidth / this.targetHeight;
  }

  constructor(
    private colorUtil: ColorUtilitiesService,
    private colorList: ColorListService
  ) {
    this.colorList$ = colorList.getColorList();
  }

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
